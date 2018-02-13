import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom";

import EpisodeUpdateButtonComponent from './EpisodeUpdateButtonComponent';

/* ------------------------------------------------ */
/* Edit Component */
/* ------------------------------------------------ */

export default class EpisodeEditComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: props.match.params.id,
            episode: {}
        };

        this.validationForm = this.validationForm.bind(this);
    }

    componentDidMount() {
        fetch('/api/episodes/' + this.state.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then((datas) => {
                this.setState({ episode: datas });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    validationForm(event) {
        var target = event.target;
        var fieldValue = target.value;

        var newEpisode = {
            id: this.state.episode.id,
            name: this.state.episode.name,
            code: this.state.episode.code,
            note: fieldValue
        };

        this.setState({episode: newEpisode});
    }

    render(){
        return(
            <div>
                <style dangerouslySetInnerHTML={{__html: `
                        body { overflow-y: scroll !important; }

                        .container {
                            box-sizing: content-box;
                            width: 100%;
                        }

                        .item {
                            vertical-align: top;
                            box-sizing: border-box;
                            width: 100%;
                        }
                    `}} />

                <link type="text/css" rel="stylesheet" href="https://backoffice.shiros.fr/public/Css/Alert.css"/>
                <link type="text/css" rel="stylesheet" href="https://backoffice.shiros.fr/public/Css/Button.css"/>
                <link type="text/css" rel="stylesheet" href="https://backoffice.shiros.fr/public/Css/Container.css"/>
                <link type="text/css" rel="stylesheet" href="https://backoffice.shiros.fr/public/Css/ErrorPage.css"/>
                <link type="text/css" rel="stylesheet" href="https://backoffice.shiros.fr/public/Css/Font.css"/>
                <link type="text/css" rel="stylesheet" href="https://backoffice.shiros.fr/public/Css/Form.css"/>
                <link type="text/css" rel="stylesheet" href="https://backoffice.shiros.fr/public/Css/Glyphicon.css"/>
                <link type="text/css" rel="stylesheet" href="https://backoffice.shiros.fr/public/Css/Image.css"/>
                <link type="text/css" rel="stylesheet" href="https://backoffice.shiros.fr/public/Css/Layout.css"/>
                <link type="text/css" rel="stylesheet" href="https://backoffice.shiros.fr/public/Css/Menu.css"/>

                <section className="post margin-20">
                    <div className="post-Title">
                        <a className="post-TitleName">{this.state.episode.name}</a>

                        <div method="post" className="div-right marginRight-20">
                            <Link className="btn btn-third margin-10" to={`/${this.state.episode.id}`}>Retour</Link>
                        </div>
                    </div>

                    <div className="post-content">
                        <div className="divSize-80 div-center">
                            <form method="POST">

                                <legend>Informations</legend>

                                <div>Code : {this.state.episode.code}</div>

                                <div>
                                    <input type="number" name="note" placeholder="Note de l'episode" value={this.state.episode.note} onChange={this.validationForm} />
                                </div>

                                <EpisodeUpdateButtonComponent episode={this.state.episode}/>
                            </form>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}
