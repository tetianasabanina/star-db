import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import ErrorBoundry from '../error-boundry';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import { SwapiServiceProvider } from '../swapi-service-context';
import { StarshipDetails } from '../sw-components';

import './app.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class App extends Component {

  state = {
    hasError: false,
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ? 
                        DummySwapiService : SwapiService;
      console.log('switched to' , Service.name);
      return {
        swapiService: new Service()
      };
   });
  };

  componentDidCatch() {
    console.log("error");
    this.setState({
      hasError: true
    })
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }
    
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value = {this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              
              <RandomPlanet />

              <Route path="/" exact 
                render={() => <h2>Welcome to StarDB</h2>} />
              <Route path="/people/:id?" component={PeoplePage} />
              <Route path="/planets" component={PlanetsPage} />
              <Route path="/starships" exact component={StarshipsPage} />
              <Route path="/starships/:id" 
                render={({ match, location, history }) => {
                  const { id } = match.params;
                  return <StarshipDetails itemId={id} />
                  } 
                } />

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}