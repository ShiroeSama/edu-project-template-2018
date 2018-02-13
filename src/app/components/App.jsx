import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from './store';

// My Component
import EpisodeListComponent from './Components/List/EpisodeListComponent';
import EpisodeFormComponent from './Components/Form/EpisodeFormComponent';
import EpisodeDetailComponent from './Components/Detail/EpisodeDetailComponent';

const store = configure();


/* ------------------------------------------------ */
/* Main Component */
/* ------------------------------------------------ */

class EpisodeComponent extends Component {

    constructor(props){
        super(props);
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

                <div className="container">

                    <section className="item divInline divLeft divSize-70">
                        <EpisodeListComponent/>
                    </section>

                    <section className="item divInline divRight divSize-30">
                        <EpisodeFormComponent/>
                    </section>

                </div>
            </div>
        );
    }

}



/* ------------------------------------------------ */
/* Route */
/* ------------------------------------------------ */

export default class App extends Component {
    render(){
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Route exact={true} path="/" component={EpisodeComponent} />
                        <Route path="/:id" component={EpisodeDetailComponent} />
                    </div>
                </Router>
            </Provider>
        );
    }
};