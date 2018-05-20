import React, { Component } from 'react';

class SettingsForm extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        var input = event.target;
        if(input.value != ''){
            input.parentnode.classlist.add('active');
        } else {
            input.parentnode.classlist.remove('active');
        }
    }

    handleSubmit(event) {
    }

    // TODO: conditionally add active class to form groups where value is prepopulated
    // TODO: handleChange to toggle active class on .form-group
    // TODO: handle submit
    render() {
        return (
            <form className="my-settings">
                <div className="form-group">
                    <label htmlFor="display_name">display name</label>
                    <input type="text" id="display_name" />
                </div>
                <div className="form-group">
                    <label htmlFor="bio">bio</label>
                    <textarea id="bio" rows="8"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="email">email</label>
                    <input type="email" id="email" />
                </div>
                <div className="form-group form-action">
                    <input type="submit" id="submit" name="submit" value="save changes" />
                    <input type="reset"  id="cancel" name="cancel" value="cancel" />
                </div>
            </form>
        );
    }
}

export default SettingsForm;
