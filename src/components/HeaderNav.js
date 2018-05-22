import React, {Component} from 'react';
import SvgAngleLeft from "./svg/SvgAngleLeft";
import SvgEllipse from "./svg/SvgEllipse";

class HeaderNav extends Component {
    render() {
        return (
            <div className="header-nav-wrapper full-bleed container">
                <div className="header-nav">
                    <a className="header-nav-back" href="#back">
                        <span className="sr-only">back</span>
                        <SvgAngleLeft color={'white'}/>
                    </a>

                    <span>You Are Here</span>

                    <button className="header-nav-modal-toggle modal-toggle" data-modal="form-modal-nav">
                        <SvgEllipse color={'white'}/>
                    </button>
                </div>
            </div>
        )
    }

}

export default HeaderNav;
