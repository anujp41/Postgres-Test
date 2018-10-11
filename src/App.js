import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import ChooseOptions from './ChooseOptions';
import Message from './Message';
import AdoptedPets from './AdoptedPets';
import {updateCase} from './utils';

class App extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
    this.removePet = this.removePet.bind(this);
    this.state = {
      owners: null,
      adoptedPets: null,
      availablePets: null,
      selectedOwner: null,
      selectedPet: null,
      message: null,
      seletedOwnerPets: null
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
    if (keyType === 'selectedOwner') {
      const owner = this.state.owners.filter(owner => owner.name === value).map(item => item.id)[0];
      const seletedOwnerPets = this.state.adoptedPets.filter(pet => pet.parentId === owner);
      this.setState({seletedOwnerPets});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const {selectedOwner, selectedPet} = this.state;
    if (!selectedOwner || !selectedPet) return alert('You have not selected both!');
    const submission = {owner: selectedOwner, pet: selectedPet};
    axios.post('http://localhost:5000/api', submission)
    .then(response => {
      this.setState({message: response.data});
      setTimeout(() => {
        this.setState({selectedOwner: null, selectedPet: null, message: null});
        this.getData();
      }, 1000);
    });
  }

  removePet(owner, petName) {
    axios.delete(`http://localhost:5000/api/${petName}/${owner}`)
    .then(response => {
      this.setState({message: response.data});
      setTimeout(() => {
        this.setState({selectedOwner: null, selectedPet: null, message: null, seletedOwnerPets: null});
        this.getData();
      }, 1000);
    })
  }

  getData() {
    axios.get('http://localhost:5000/api')
    .then(res => this.setState({...res.data}))
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const stateKeys = ['owners', 'availablePets'];
    const {selectedOwner, selectedPet, message, seletedOwnerPets} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h3>Select your pet!</h3>
        </header>
        {this.state.availablePets === null
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
        {message === null ? null : <Message message={message}/>}
        {seletedOwnerPets !== null && seletedOwnerPets.length > 0? <AdoptedPets owner={selectedOwner} adoptedPets={seletedOwnerPets} removePet={this.removePet}/> : null}
      </div>
    );
  }
}

export default App;
