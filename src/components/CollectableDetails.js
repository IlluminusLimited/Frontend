import React, { Component } from "react";
import { Link } from "react-router-dom";
import Tag from "./Tag";
import Image from "./Image";
import CollectableListItem from "./CollectableListItem";
import CollectionSelectList from "./CollectionSelectList";

class CollectableDetails extends Component {
  state = {
    collections: {}
  };

  detailsType = () => {
    if (this.props.collectableType.toLowerCase() === "assortment") {
      return (
        <div className="assortment-pin-list">
          {this.props.collectableData.pins.map((pin, index) => {
            return (
              <CollectableListItem
                key={index}
                uid={index}
                collectableData={pin}
                uiType="pin-modal-toggle pin-modal-list"
                collectableType="pin"
              />
            );
          })}
        </div>
      );
    }

    return;
  };

  componentDidMount() {
    // swap viewer images
    document.querySelectorAll(".pin-thumb").forEach(thumb => {
      thumb.addEventListener("click", () => {
        var viewer = thumb.closest(".pin-page").querySelector(".pin-viewer");
        viewer.querySelector("img").remove();
        viewer.append(thumb.querySelector("img").cloneNode());

        thumb.parentNode.querySelectorAll(".pin-thumb").forEach(elem => {
          elem.classList.remove("active");
        });
        thumb.classList.add("active");
      });
    });
  }

  render() {
    const {
      id,
      name,
      year,
      description,
      tags,
      // created_at,
      // updated_at,
      images,
      url
    } = { ...this.props.collectableData };
    return (
      <React.Fragment>
        <div className={this.props.classType + "-viewer"}>
          {images ? (
            <Image
              imageData={images[0]}
              imageClass={this.props.classType + "-img"}
              large={true}
            />
          ) : null}
        </div>
        <div className={this.props.classType + "-content"}>
          <h1 id={"title-" + id} onClick={this.props.closeModal}>
            { this.props.titleLink ? (
            <Link className="copy-dark" to={`/pin/${id}`}>
              {name}
            </Link>
            ) : <React.Fragment>{name}</React.Fragment>}
          </h1>
          <p>{description}</p>
          <p>{year || 2018}</p>
          <div className={this.props.classType + "-tags"}>
            {Object.keys(tags).map(key => (
              <Tag key={key} tagKey={key} tagName={tags[key]} />
            ))}
          </div>
          {sessionStorage.getItem("pinster-user-id") &&
          this.props.modalIsOpen ? (
            <CollectionSelectList
              auth={this.props.auth}
              collectableId={id}
              collectableType={this.props.collectableType}
              collectableUrl={url}
            />
          ) : null}
          <br />
          <div className={this.props.classType + "-thumbs"}>
            {images.map((image, index) => {
              if (index === 0) {
                return (
                  <div
                    key={index}
                    className={this.props.classType + "-thumb active"}
                  >
                    <Image
                      key={index}
                      imageData={image}
                      imageClass={this.props.classType + "-img"}
                    />
                  </div>
                );
              }
              return (
                <div key={index} className={this.props.classType + "-thumb"}>
                  <Image
                    key={index}
                    imageData={image}
                    imageClass={this.props.classType + "-img"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CollectableDetails;
