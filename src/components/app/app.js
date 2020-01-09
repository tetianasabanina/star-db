import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import ErrorBoundry from '../error-boundry';
import ItemDetails, { Record } from '../item-details/item-details';
import { 
  PersonList,
  PlanetList,
  StarshipList,
  PersonDetails,
  PlanetDetails,
  StarshipDetails
} from '../sw-components';
import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';


export default class App extends Component {

  swapiService = new SwapiService(); 

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
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
    
    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    const {getPerson, getStarship, getPersonImage, getStarshipImage, getAllPeople, getAllPlanets} = this.swapiService;
    
    const personDetails = (
      <ItemDetails
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage} >
          <Record field='gender' label='Gender' />
          <Record field='eyeColor' label='Eye Color' />
      </ItemDetails>
    ); 

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}>
          <Record field='model' label='Model' />
          <Record field='length' label='Length' />
          <Record field='costInCredits' label='Cost' />
        </ItemDetails>
    ); 
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value = {this.swapiService}>
          <div className="stardb-app">
            <Header />

            <PersonDetails itemId={11} />

            <PlanetDetails itemId={5} />

            <StarshipDetails itemId={9} />

            <PersonList />

            <PlanetList />

            <StarshipList />

          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}