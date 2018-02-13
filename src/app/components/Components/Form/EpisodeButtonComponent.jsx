import React, { Component, PropTypes } from 'react';

/* ------------------------------------------------ */
/* Form Component */
/* ------------------------------------------------ */

export default class EpisodeButtonComponent extends Component {

    constructor(props){
        super(props);
    }

    submit(){
        fetch('/api/episodes', {
            method: 'POST',
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
            <div className="divInline-center marginTop-20">
                <button type="button" className="btn btn-primary" onClick={() => this.submit()}>Sauvegarder</button>
            </div>
        );
    }
}