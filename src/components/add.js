import React, { Component } from 'react'

import ReactModal from 'react-modal'
import types from '../modules/types'

ReactModal.setAppElement('#root');

export default class Add extends Component {

  constructor(props) {
    super(props);
    this.models = {}
    
    this.statuses = ['OK', 'INJURED', 'MIA'];
    this.state = {
      name: '',
      nameError: '',
      vehicleGroup: '',
      currentVehicleGroup: [],
      vehicleType: '',
      currentModelGroup: [],
      vehicleModel: '',
      gear: '',
      status: '',
      showModal: false,
      modalText: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount () {
    fetch("http://localhost:3001/vehicleTypes")
    .then(response => response.json())
    .then(json => {
      json.map((object, group, model, type) => {
        if(!(this.models.hasOwnProperty(object.type))){
          this.models[object.type] = [object.model]
        } else if(this.models.hasOwnProperty(object.type) && !this.models[object.type].includes(object.model)) {
          this.models[object.type].push(object.model);
        }
        return null;
     });
     
    });
    console.log(this.models);
  }

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    }, () => this.validateName());
  }

  handleInputChange (event) {
      const target = event.target;
      const value = target.type === 'select' ? target.selected : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });

      if (name === 'name') {
        this.validateName();
      } else if (name === 'vehicleGroup') {
        this.setState({
          currentVehicleGroup: types[value]
        });
      } else if (name === 'vehicleType') {
        this.setState({
          currentModelGroup: this.models[value]
        });
      }
      
  }
  submitForm (event) {
    event.preventDefault();
    if ( this.state.name && this.state.vehicleGroup && this.state.vehicleType && this.state.vehicleModel && this.state.gear && this.state.status) {
      fetch('http://localhost:3001/transformers', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          vehicleGroup: this.state.vehicleGroup,
          vehicleType: this.state.vehicleType,
          vehicleModel: this.state.vehicleModel,
          gear: this.state.gear.split(", "),
          status: this.state.status
        })
      })
      .then(response => console.log(response.json()))
      .then(this.setState({ name: '',
                            gearItem: '',
                            modalText: 'Transformer has been added.',
                            showModal: !this.state.showModal
                          }))
    } else {
      this.setState({ modalText: 'Transformer has not been added. Make sure all fields are filled in.',
                      showModal: !this.state.showModal
                    })

    }
    
  }

  validateName = () => {
    this.setState({
      nameError: this.state.name.length >= 2 ? null : 'Name must be longer than 2 characters.'
    });
  }

  modalToggle = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    const contentStyle = {
      position: 'absolute',
      left: '7vw',
      right: '7vw',
      width: '30vw',
      margin: '0 auto',
      border: 'none',
      background: 'moccasin',
      overflow: 'auto',
      borderRadius: '4px',
      bottom: 'unset',
      outline: 'none',
      padding: '35px',
    }
    const vGroup = ['Air', 'Sea', 'Land'];
    return (
      <div className="add-transformer">
        <form onSubmit={this.submitForm}>
            <input type="text" id="name" placeholder="Name" className="form-control" value={this.state.name} name="name" onChange={this.handleNameChange} required/>
            <div>{this.state.nameError}</div>
            <select name="vehicleGroup" className="form-control" onChange={this.handleInputChange} required>
                <option selected disabled>Please select group</option>
                
                {vGroup.map((group, index) => (
                    <option key={index} value={group}>{group}</option>
                ))}
            </select> 
            <select name="vehicleType" className="form-control" onChange={this.handleInputChange} required>
                <option selected disabled>Please select type</option>
                {this.state.currentVehicleGroup.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                ))}
            </select>
            <select name="vehicleModel" className="form-control" onChange={this.handleInputChange} required>
                <option selected disabled>Please select model</option>
                {this.state.currentModelGroup.map((model, index) => (
                    <option key={index} value={model}>{model}</option>
                ))}
            </select>
              <input type="text" id="gear" placeholder="Gear" className="form-control" value={this.state.gear} name="gear" onChange={this.handleInputChange} required/>
            <select name="status" id="status" className="form-control" onChange={this.handleInputChange} required>
              <option selected disabled>Please select status</option>
              {this.statuses.map((status, index) => (
                  <option key={index} value={status}>{status}</option>
              ))}
            </select>
            <input type="submit" id="submit" className="btn btn-outline-primary" value="Submit"/>
        </form>
        <ReactModal
          isOpen={this.state.showModal}
          style={{content: contentStyle}}
          closeTimeoutMS={200}
          contentLabel="sadssaddsads"
          parentSelector={() => document.querySelector('.add-transformer')}
        >
          <div>{this.state.modalText}</div>
          <button className="btn btn-outline-primary" onClick={this.modalToggle}>
            Ok
          </button>
        </ReactModal>
      </div>
    );
     
  }
}
