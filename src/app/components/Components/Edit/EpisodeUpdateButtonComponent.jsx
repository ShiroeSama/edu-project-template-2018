import React, { Component, PropTypes } from 'react';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

/* ------------------------------------------------ */
/* Edit Component */
/* ------------------------------------------------ */

export default class EpisodeUpdateButtonComponent extends Component {

    constructor(props) {
        super(props);
    }

    update(){
        fetch('/api/episodes/' + this.props.episode.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.props.episode)
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                } else {
                    window.location = `/${this.props.episode.id}`;
                }
            })
            .catch((error) => {
                console.error(error);
                window.location.reload();
            });
    }

    render(){
        return(
            <div className="divInline-center marginTop-20">
                <button type="button" className="btn btn-primary" onClick={() => this.update()}>Edit</button>
            </div>
        );
    }
}