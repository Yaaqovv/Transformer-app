import React, { Component } from 'react'

export default class Delete extends Component {

  constructor(props) {
    super(props);
    this.deleteTransformer = this.deleteTransformer.bind(this);
  }

  deleteTransformer () {
      console.log(this.props.id);
    fetch('http://localhost:3000/transformers/'+this.props.id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
        // body: JSON.stringify({id: this.props.id}) 
    }).then(res => res.text())
      .then(res => console.log(res))
      window.location.reload();
  }


  render() {
    
    return (
      <button onClick={this.deleteTransformer}>Delete</button>
    );
  }

}
