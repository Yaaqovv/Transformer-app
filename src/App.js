import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';

import './App.css';

import Transformers from './components/transformers';
import Add from './components/add';
import DetailsPage from './components/detailsPage';
import NotFound from './components/notFound';



class App extends Component {
  state = {
    transformers: []
  }

  async componentDidMount() {
    const transformers = await (await fetch('http://localhost:3001/transformers')).json();

    this.setState({ transformers });
  }

  render() {
    return (
      
        
          
          
        <BrowserRouter>
          <div className="App">
            <div className="logo-container"><img src={require("./optimus.png")} alt={"Transformer app logo"} /> <h3>Transformer app</h3></div>
            <ul>
              <NavLink exact activeClassName="active-link" to="/">Home</NavLink>
              <NavLink activeClassName="active-link" to="/add">Add</NavLink>
              <NavLink activeClassName="active-link" to="/details">Details</NavLink>
            </ul>
              
            <Switch>            
              <Route exact path="/" component={Transformers} />
              <Route path="/add" component={Add} />
              <Route path="/details" render={props => <DetailsPage {...props} />} />
              <Route component={NotFound} />
            </Switch>
            
          
        
          </div>
        </BrowserRouter>
        
      
    );
  }
}

export default App;
