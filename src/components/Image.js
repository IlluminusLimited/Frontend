import React, { Component } from "react";

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.imageData };
  }

  fallbackSource = () => {
    return this.state.thumbnailable === true
      ? `${this.state.storage_location_uri}_600x600`
      : this.state.storage_location_uri;
  };

  noSrcSetNeeded = () => {
    return this.state.thumbnailable === false && !this.props.large;
  };

  buildSrcSet = () => {
    if (this.noSrcSetNeeded()) {
      return null;
    }

    var srcset = this.state.storage_location_uri + "_600x600 400w, ";
    srcset = srcset + this.state.storage_location_uri + "_800x800 600w, ";
    srcset = srcset + this.state.storage_location_uri + "_1000x1000 800w, ";
    srcset = srcset + this.state.storage_location_uri + "_1800x1800";

    return srcset;
  };

  buildSizes = () => {
    if (this.noSrcSetNeeded()) {
      return null;
    }

    var sizes = "(min-width: 1440px) 800px, ";
    sizes = sizes + "(min-width: 1100px) 600px,";
    sizes = sizes + "400px";

    return sizes;
  };

  render() {
    return (
      <img
        className={this.props.imageClass}
        src={this.fallbackSource()}
        alt={this.state.description}
        srcSet={this.buildSrcSet()}
        sizes={this.buildSizes()}
      />
    );
  }
}

export default Image;
