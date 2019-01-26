import React, { Component } from 'react';

import Transformer from './transformer';


export default class Transformers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      search: ''
    }
    
    this.getTransformers = this.getTransformers.bind(this);
    this.deleteTransformer = this.deleteTransformer.bind(this);
    this.filterItems = this.filterItems.bind(this);
  }
  componentWillMount() {
    this.getTransformers();
  }

  getTransformers () {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
      fetch('http://localhost:3001/transformers', {
        headers: myHeaders,
      })
      .then(response => response.json())
      .then(json => {
        this.setState({
          items: json
        })
        console.log(this.state.items);
      });
  }

  deleteTransformer (id) {
      fetch('http://localhost:3001/transformers/'+id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'} 
    }).then(res => res.text())

    const transformers = this.state.items;

    const filteredTransformers = transformers.filter(transformer => {
      return transformer.id !== id;
    });

    this.setState({
      items: filteredTransformers
    });
  }

  filterItems (event) {
    this.setState({
      search: event.target.value
    })
  }

  render() {

    // const {search, items} = this.state;
    const filteredItems = this.state.items.filter( item => {
      return item.name.toLowerCase().indexOf( this.state.search.toLowerCase() ) !== -1
    })

    return (
      <div className="transformers">
        

        <div>
          <input className="search" type="text" placeholder="Search" value={this.state.search} onChange={this.filterItems} />
        </div>
        <hr />
        {
          filteredItems.map((item, index) => {
              if(!(index + 1 === filteredItems.length)) {
                return  <div key={item.id}><Transformer
                        {...item}
                        deleteTransformer={this.deleteTransformer}
                      /><hr /></div> 
              } else {
                return <div key={item.id}>
                <Transformer
                {...item}
                deleteTransformer={this.deleteTransformer}/>
                </div> 
              }
          })
        }        
      </div>
    )
  }
}
