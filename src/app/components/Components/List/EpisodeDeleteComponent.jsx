import React, { Component, PropTypes } from 'react';

/* ------------------------------------------------ */
/* List Component */
/* ------------------------------------------------ */

export default class EpisodeDeleteComponent extends Component {

    constructor(props) { super(props); }

    deleteAction(){
        fetch("/api/episodes/" + this.props.episodeId, {
            method: "DELETE"
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                } else {
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error(error);
                window.location.reload();
            });
    }

    render(){
        return(
            <button type="button" className="btn btn-danger margin-10" onClick={() => this.deleteAction()}>
                <span className="text-bold">X</span>
            </button>
        );
    }
}