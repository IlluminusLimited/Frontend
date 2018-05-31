import React, { Component } from 'react';
import SvgAngleLeft from './svg/SvgAngleLeft';
import SvgEllipse from './svg/SvgEllipse';

class HeaderNav extends Component {
    goToCreatePin = () => {
        this.props.history.push('/pins/new');
    };

    getModalButton(modal) {
        if (modal && sessionStorage.getItem('pinster-user-role') <= 2) {
            return (
                <button
                    className="header-nav-modal-toggle modal-toggle"
                    data-modal="form-modal-nav"
                    onClick={this.goToCreatePin}
                >
                    <SvgEllipse color={'white'} />
                </button>
            );
        }
        return <div className="header-nav-spacer" />;
    }

    render() {
        return (
            <header className="container with-fixed-header">
                <div className="header-nav-wrapper full-bleed container">
                    <div className="header-nav">
                        <a className="header-nav-back" onClick={this.props.history.goBack}>
                            <span className="sr-only">back</span>
                            <SvgAngleLeft color={'white'} />
                        </a>
                        <span>{this.props.label}</span>
                        {this.getModalButton(this.props.modal)}
                    </div>
                </div>
            </header>
        );
    }
}

export default HeaderNav;
