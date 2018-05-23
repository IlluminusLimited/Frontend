import React, { Component } from 'react';
import SvgMinus from './svg/SvgMinus';
import SvgPlus from './svg/SvgPlus';

class Loader extends Component {
    render() {
        return (
            <React.Fragment>
                <button className="btn-small-round">
                    <span className="sr-only">remove</span>
                    <SvgMinus color="grey" />
                </button>

                <button className="btn-small-round">
                    <span className="sr-only">add</span>
                    <SvgPlus color="grey" />
                </button>
            </React.Fragment>
        );
    }
}

export default Loader;
