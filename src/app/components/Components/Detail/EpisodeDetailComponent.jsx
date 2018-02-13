import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom"

/* ------------------------------------------------ */
/* Detail Component */
/* ------------------------------------------------ */

export default class EpisodeDetailComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: props.match.params.id,
            episode: {}
        };

        console.log(this.state.id);
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
                var oldEp = this.state.episode;
                this.setState({ episode: datas });

                if (datas.id == oldEp.id) {
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error(error);
            });
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
                            <Link className="btn btn-primary btn-third margin-10" to="/">Retour</Link>
                        </div>
                    </div>

                    <div className="post-content">
                        <div className="divSize-80 div-center">
                            <form method="POST">

                                <legend>Informations</legend>

                                <div>Code : {this.state.episode.code}</div>
                                <div>Note : {this.state.episode.note}</div>
                            </form>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}