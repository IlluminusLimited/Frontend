import React, { Component } from "react";

class SvgAdd extends Component {
  render() {
    return (
      <svg
        className={"svg-add " + this.props.classType}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 28.791 28.791"
      >
        <g transform="translate(-311.25 -621.286)">
          <g transform="translate(312 622.036)">
            <path
              className="outer"
              d="M13.645 0A13.645 13.645 0 1 1 0 13.645 13.645 13.645 0 0 1 13.645 0z"
            />
          </g>
          <g transform="translate(318 627.567)">
            <path
              className="plus"
              d="M0 0h16.152v1.568H0z"
              transform="translate(0 7.183)"
            />
            <path
              className="plus"
              transform="rotate(-89.92 11.72 4.438)"
              d="M0 0h16.152v1.597H0z"
            />
          </g>
        </g>
      </svg>
    );
  }
}

export default SvgAdd;
