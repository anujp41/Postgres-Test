import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import ChooseOptions from './ChooseOptions';
import {updateCase} from './utils';

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
    const keyType = updateCase(name);
    if (this.state[keyType] === value) {
      this.setState({[keyType]: null});
      return;
    }
    this.setState({[keyType]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {selectedOwner, selectedPet} = this.state;
    if (!selectedOwner || !selectedPet) return alert('You have not selected both!');
    const submission = {owner: selectedOwner, pet: selectedPet};
    axios.post('http://localhost:5000/api', submission)
    .then((data) => console.log('submitted', data));
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api')
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
          <div>
            <div className='dropdown'>
            {stateKeys.map((item, idx) => <ChooseOptions key={idx} type={item} data={this.state[item]} cb={this.handleClick} selected={[selectedOwner, selectedPet]}/>)}
            </div>
            <button className='submitBtn' onClick={this.handleSubmit}>Submit</button>
          </div>
          )
        }
      </div>
    );
  }
}

export default App;
