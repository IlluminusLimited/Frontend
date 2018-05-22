import React, {Component} from 'react';
import SvgAngleLeft from "./svg/SvgAngleLeft";
import SvgEllipse from "./svg/SvgEllipse";

class HeaderNav extends Component {
    render() {
        return (
            <header className="container">
                <div className="header-nav-wrapper full-bleed container">
                    <div className="header-nav">
                        <a className="header-nav-back" onClick={this.props.history.goBack}>
                            <span className="sr-only">back</span>
                            <SvgAngleLeft color={'white'}/>
                        </a>

                        <span>{this.props.label}</span>

                        <button className="header-nav-modal-toggle modal-toggle" data-modal="form-modal-nav">
                            <SvgEllipse color={'white'}/>
                        </button>
                    </div>
                </div>
            </header>
        )

    }

}

export default HeaderNav;
