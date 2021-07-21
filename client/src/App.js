import React, { Component } from 'react';
import AddItem from './components/AddItem.js';
import ItemCollection from './components/ItemCollection.js';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});


class App extends Component {
  render() {
    return (
        <ApolloProvider client = {client} >
          <Router>
          <div className="App">
            <h1> Food Inventory </h1>


<AddItem />
<Route exact path="/" component={ItemCollection} />

          </div>   
          </Router>
        </ApolloProvider>
    );
  }
}


export default App;