import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Dropdown from './Dropdown';

class App extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      owners: null,
      pets: null
    }
  }

  handleChange(event) {
    const {target: {name, value}} = event;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {user, pet} = this.state;
    console.log(`${user} has selected ${pet}!`);
  }

  componentDidMount() {
    axios.get('/api',)
    .then(res => this.setState({...res.data}))
  }

  render() {
    console.log('state ', this.state);
    return (
      <div className="App">
        <header className="App-header">
          <h3>Select your pet!</h3>
        </header>
        <div className='dropdown'>
          <Dropdown data={[1, 2, 3, 4]}/>
        </div>
      </div>
    );
  }
}

export default App;
