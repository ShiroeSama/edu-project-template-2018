import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom"
import EpisodeDeleteComponent from './EpisodeDeleteComponent';

/* ------------------------------------------------ */
/* List Component */
/* ------------------------------------------------ */

export default class EpisodeItemComponent extends Component {

    constructor(props) { super(props); }

    render() {
        return(
            <section>
                <div>
                    <div className="divInline divSize-30">{this.props.episode.name}</div>
                    <div className="divInline divSize-20">{this.props.episode.code}</div>
                    <div className="divInline divSize-20">{this.props.episode.note}</div>

                    <div className="divInline">
                        <Link className="btn btn-primary margin-10" to={`/${this.props.episode.id}`}>Détail</Link>
                        <EpisodeDeleteComponent episodeId={this.props.episode.id}/>
                    </div>
                </div>

                <hr className="style-orange" />
            </section>
        );
    }
}