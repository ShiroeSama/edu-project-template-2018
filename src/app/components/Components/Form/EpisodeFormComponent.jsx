import React, { Component, PropTypes } from 'react';
import EpisodeButtonComponent from './EpisodeButtonComponent';

/* ------------------------------------------------ */
/* Form Component */
/* ------------------------------------------------ */

export default class EpisodeFormComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            code: '',
            note: 0
        };

        this.validationForm = this.validationForm.bind(this);
    }

    validationForm(event) {
        const target = event.target;

        const fieldName = target.name;
        const fieldValue = target.value;

        this.setState({
            [fieldName]: fieldValue
        });
    }

    render() {
        return(
            <section className="post margin-20">
                <div className="post-Title"><a>Ajout d'une Serie</a></div>

                <div className="post-content">
                    <div className="divSize-80 div-center">
                        <form method="POST">

                            <legend>Informations</legend>

                            <div>
                                <input type="text" name="name" placeholder="Nom de la Série" value={this.state.name} onChange={this.validationForm} />
                            </div>

                            <div>
                                <input type="text" name="code" placeholder="Nom de l'épisode" value={this.state.code} onChange={this.validationForm} />
                            </div>

                            <div>
                                <input type="number" name="note" placeholder="Note de l'episode" value={this.state.note} onChange={this.validationForm} />
                            </div>

                            <EpisodeButtonComponent episode={this.state}/>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}
