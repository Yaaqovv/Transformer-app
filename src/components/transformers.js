import React, { Component } from 'react';

import Transformer from './transformer';


export default class Transformers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
    

    this.deleteTransformer = this.deleteTransformer.bind(this);
    this.filterItems = this.filterItems.bind(this);
  }
  

  deleteTransformer (id) {
      fetch('http://localhost:3001/transformers/'+id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'} 
    }).then(res => res.text())

    this.props.getTransformers();
  }

  filterItems (event) {
    this.setState({
      search: event.target.value
    })
  }

  render() {

    const filteredItems = this.props.transformers.filter( item => {
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
