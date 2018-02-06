import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from './store';

const store = configure();

class EpisodeItemComponent extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            episodes: []
        };
    }

    componentDidMount(){
        fetch('/api/episodes', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
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

    render(){
        const episodes = this.state.episodes;
        return (
            <ul>
                {episodes.map(episode => <li key={episode.id}>{episode.id} {episode.name} {episode.code} {episode.note}</li>)}
            </ul>
        );
    }
}

export default class App extends Component {
    render(){
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Route path="/" component={EpisodeItemComponent}>
                        </Route>
                    </div>
                </Router>
            </Provider>
        );
    }
};