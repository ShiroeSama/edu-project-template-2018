import React, { Component, PropTypes } from 'react';
import EpisodeItemComponent from './EpisodeItemComponent';

/* ------------------------------------------------ */
/* List Component */
/* ------------------------------------------------ */

export default class EpisodeListComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            episodes: []
        };
    }

    componentDidMount() {
        fetch('/api/episodes', {
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
                this.setState({ episodes: datas });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        let episodes = this.state.episodes;
        return(
            <section className="post margin-20">
                <div className="post-Title"><a>Series</a></div>

                <div className="post-content">
                    <div className="marginLeft-20 marginRight-20">
                        <div className="divInline divSize-30">Nom</div>
                        <div className="divInline divSize-20">Code</div>
                        <div className="divInline divSize-20">Note</div>
                    </div>

                    <hr className="style-blue" />

                    <div className="list-400 scrollVertical">
                        {episodes.map(episode =>
                            <EpisodeItemComponent episode={episode}/>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}