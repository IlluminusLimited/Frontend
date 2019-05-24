import React, { Component } from "react";
import GlobalSearch from "./GlobalSearch";
import CollectableListItem from "./CollectableListItem";
import LoadMoreButton from "./LoadMoreButton";
import Loader from "./Loader";
import { Link } from "react-router-dom";

class Unpublished extends Component {
  state = {
    loaded: false,
    pins: [],
    pageLink: ""
  };

  fetchResults = query => {
    this.setState({
      loaded: false,
      pins: []
    });
    const { getAccessToken } = this.props.auth;
    const urlType = query === "" ? "pins" : "search";
    let url = new URL(`${process.env.REACT_APP_API_URL}/v1/${urlType}?published=false`);
    const params = { query: query };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    fetch(url, {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
        "content-type": "application/json"
      }
    })
      .then(
        results => {
          return results.json();
        },
        error => {
          console.error(error);
        }
      )
      .then(response => {
        // Display the pins
        if (response.data[0] && response.data[0].searchable_type) {
          let allPromises = response.data.map(searchable => {
            return fetch(searchable.url)
              .then(
                results => {
                  return results.json();
                },
                error => {
                  console.error(error);
                }
              )
              .then(innerResponse => {
                // Display the searchable
                this.setState(prevState => {
                  return {
                    pins: [...prevState.pins, innerResponse]
                  };
                });
              });
          });
          Promise.all(allPromises).then(() => {
            this.setState({
              loaded: true
            });
          });
        } else {
          this.setState({
            loaded: true,
            pins: response.data,
            pageLink: response.links.next ? response.links.next : ""
          });
        }
      });
  };

  fetchMorePins = () => {
    fetch(this.state.pageLink)
      .then(
        results => {
          return results.json();
        },
        error => {
          console.error(error);
        }
      )
      .then(response => {
        // Display the pins
        this.setState(prevState => {
          return {
            pins: [...prevState.pins, ...response.data],
            pageLink: response.links.next ? response.links.next : ""
          };
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <GlobalSearch fetchResults={this.fetchResults} />
        <main className="container">
          {this.state.loaded ? (
            this.state.pins.length !== 0 ? (
              <div className="pin-collection">
                {Object.keys(this.state.pins).map(key => (
                  <Link key={key} to={`/pins/${this.state.pins[key].id}/edit`}>
                    <CollectableListItem
                      uid={key}
                      collectableData={this.state.pins[key]}
                      collectableType="pin"
                      history={this.props.history}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <p>Your search query returned no results. Try something else.</p>
            )
          ) : (
            <Loader />
          )}
          <LoadMoreButton pageLink={this.state.pageLink} fetchMoreItems={this.fetchMorePins} />
        </main>
      </React.Fragment>
    );
  }
}

export default Unpublished;
