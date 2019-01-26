import React, { Component } from 'react'

export default class Transformer extends Component {

  constructor(props) {
    super(props);
    this.statuses = ['OK', 'INJURED', 'MIA'];

    this.deleteTransformer = this.deleteTransformer.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  deleteTransformer () {
    this.props.deleteTransformer(this.props.id);
  }

  updateStatus (id, event) {
    const target = event.target;
    const value = target.type === 'select' ? target.selected : target.value;
    
    fetch('http://localhost:3000/transformers/'+id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:this.props.name,
          status: value,
          vehicleGroup: this.props.vehicleGroup,
          vehicleType: this.props.vehicleType,
          vehicleModel: this.props.vehicleModel,
          gear: this.props.gear,
        })
    })
  }

  render() {
    return (
      <div className="transformer">
          
          <div className="transformer-status">
            <h3>{ this.props.name }</h3>
            <p>Current status: {this.props.status}</p>
            <select name="status" id="status" className="form-control" onChange={event => this.updateStatus(this.props.id, event)}>
              {this.statuses.map((status, index) => { 
                  if (this.props.status === status ) {
                        return <option selected key={ index } value={ status }>{ status }</option>;
                  } else {
                    return <option key={ index } value={ status }>{ status }</option>;
                  }
                })}
            </select>
          </div>
          <button onClick={this.deleteTransformer} className="delete-icon"><span></span><i></i></button>
        
      </div>
    );
  }

}
