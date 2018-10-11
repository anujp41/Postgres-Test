import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import ChooseOptions from './ChooseOptions';
import {updateCase} from './utils/index.js';

class App extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      owners: null,
      pets: null,
      selectedOwner: null,
      selectedPet: null
    }
  }

  handleClick(event) {
    const {target: {name, value}} = event;
    this.setState({[updateCase(name)]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  componentWillMount() {
    axios.get('/api')
    .then(res => this.setState({...res.data}))
  }

  render() {
    const stateKeys = ['owners', 'pets'];
    const {selectedOwner, selectedPet} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h3>Select your pet!</h3>
        </header>
        {this.state.pets === null
        ? <h1>Loading!</h1>
        : (
          <div className='dropdown'>
          {stateKeys.map((item, idx) => <ChooseOptions key={idx} type={item} data={this.state[item]} cb={this.handleClick} selected={[selectedOwner, selectedPet]}/>)}
          </div>
          )
        }
      </div>
    );
  }
}

export default App;
