import React, { Component } from "react";
import CollectableModal from "./CollectableModal";
import Image from "./Image";

class CollectableListItem extends Component {
  state = {
    collectableData: {}
  };

  listItemType = () => {
    if (this.props.uiType === "pin-modal-toggle") {
      return (
        <CollectableModal
          key={this.props.uid}
          collectableData={this.props.collectableData}
          collectableType={this.props.collectableType}
          history={this.props.history}
        />
      );
    }
    return null;
  };

  resolveClick = () => {
    if (this.props.uiType === "pin-page-toggle") {
      this.props.history.push(`/pin/${this.props.collectableData.id}`);
    }
  };

  render() {
    return (
      <React.Fragment>
        <React.Fragment>
          <div
            className={"pin-list-item " + this.props.uiType}
            data-modal={"pin-" + this.props.collectableData.id}
            onClick={this.resolveClick}
          >
            <Image
              imageData={this.props.collectableData.images[0]}
              imageClass="pin-list-img"
            />
            <div className="pin-list-title">
              {this.props.collectableData.name}
            </div>
          </div>
          {this.listItemType()}
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default CollectableListItem;
