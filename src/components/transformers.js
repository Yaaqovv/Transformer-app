import React, { Component } from 'react'

export default class Transformers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }
  componentDidMount() {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json"
    });
      fetch('http://localhost:3000/transformers', {
        headers: myHeaders,
      })
      .then(response => response.json())
      .then(json => {
        this.setState({
          items: json,
          isLoaded: true
        })
        console.log(this.state.items);
      });
  }

  render() {
    const transformers = this.state.items.map(transformer => (
      <div key={ transformer.id }>
        <h3>{ transformer.name }</h3>
      </div>  
    ));
    return (
      <div>
        <h1>Transformer app</h1>
        { transformers }
      </div>
    )
  }
}
