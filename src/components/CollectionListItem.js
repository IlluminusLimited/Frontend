import React, { Component } from "react";
import Image from "./Image";

class CollectionListItem extends Component {
  resolveClick = () => {
    this.props.history.push(`/collection/${this.props.collectionData.id}`);
  };

  render() {
    const {
      // id,
      name,
      // year,
      // description,
      // tags,
      // created_at,
      // updated_at,
      images
      // url
    } = { ...this.props.collectionData };
    return (
      <React.Fragment>
        <div
          className="pin-list-item pin-stack"
          data-count={images.length}
          onClick={this.resolveClick}
        >
          {images.map((image, index) =>
            index <= 3 ? (
              <Image key={index} imageData={image} imageClass="pin-list-img" />
            ) : null
          )}
          <div className="pin-list-title">{name}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default CollectionListItem;
