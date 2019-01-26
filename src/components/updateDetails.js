import React, { Component } from 'react';


export default class UpdateDetails extends Component {

    constructor(props) {
        super(props);

        this.statuses = ['OK', 'INJURED', 'MIA'];

        this.models = {};

        this.state = {
            id: '',
            name: '',
            vehicleGroup: this.props.vehicleGroup,
            currentVehicleGroup: [],
            vehicleType: this.props.vehicleType,
            vehicleModel: this.props.vehicleModel,
            gear: [],
            status: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleSubmit(event) {
      event.preventDefault();
      console.log({
        "name": this.name.value,
        "vehicleGroup": this.vGroup.value,
        "vehicleType": this.vType.value,
        "vehicleModel": this.model.value,
        "gear": this.gear.value,
        "status": this.status.value
      });
      fetch('http://localhost:3000/transformers/'+this.state.id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.id,
          name: this.name.value,
          vehicleGroup: this.vGroup.value,
          vehicleType: this.vType.value,
          vehicleModel: this.model.value,
          gear: this.gear.value.split(", "),
          status: this.status.value
        })
      })
      this.props.getTransformer();
    }

    handleInputChange (event) {
      const target = event.target;
      const value = target.type === 'select' ? target.selected : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });

  }

    static getDerivedStateFromProps(nextProps, prevState) {
        return { name: nextProps.name,
                 id: nextProps.id,
                 status: nextProps.status,
                 currentVehicleGroup: nextProps.types[nextProps.vehicleGroup],
                 gear: nextProps.gear
                };
   
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.name !== this.props.name) {
        this.setState({
          name: this.props.name,
          id: this.props.id,
          status: this.props.status,
          vehicleGroup: this.props.vehicleGroup,
          vehicleType: this.props.vehicleType,
          currentVehicleGroup: this.props.types[this.props.vehicleGroup],
          vehicleModel: this.props.vehicleModel,
          gear: this.props.gear
        })
       } else if (prevState.vehicleGroup !== this.vGroup.value) {
        this.setState({
          vehicleType: this.vType.value
        })
      }
    }

    render() {
        const vGroup = ['Air', 'Sea', 'Land'];
        
        return (
          <div className="update-details">
            <div className="line"></div>
            <div className="hline"></div>
            <form onSubmit={this.handleSubmit} key={this.props.id}>
            <div><label htmlFor="id" className="left-tab">ID: </label><input type="text" name="id" className="right-tab" value={this.state.id} readOnly/></div>
            <div><label htmlFor="name" className="left-tab">Name: </label><input type="text" name="name" className="right-tab" defaultValue={this.state.name || ''} ref={input => this.name = input} onChange={this.handleInputChange}/></div>
  
            <div>
              <label htmlFor="vehicleGroup" className="left-tab">Vehicle group: </label>
              <select name="vehicleGroup" className="right-tab" ref={input => this.vGroup = input} onChange={this.handleInputChange}>
                {vGroup.map((group, index) => {
                  if (group === this.state.vehicleGroup) {
                    return <option key={index} value={group} selected>{group}</option>
                  } else {
                    return <option key={index} value={group}>{group}</option>
                  }
                })}
              </select>
            </div>

            <div>
              <label htmlFor="vehicleType" className="left-tab">Vehicle type: </label>
              <select name="vehicleType" className="right-tab" ref={input => this.vType = input} onChange={this.handleInputChange}>
                {this.props.types[this.state.vehicleGroup].map((type, index) => {
                  if (type === this.state.vehicleType) {
                    return <option key={index} value={type} selected>{type}</option>
                  } else { 
                    return <option key={index} value={type}>{type}</option>
                  }
                  
                })}
              </select>
            </div>

            <div>
              <label htmlFor="vehicleModel" className="left-tab">Vehicle model: </label>
              <select name="vehicleModel" className="right-tab" ref={input => this.model = input}>
                {this.props.models[this.state.vehicleType].map((model, index) => {
                  if (model === this.state.vehicleModel) {
                    return <option key={index} value={model} selected>{model}</option>
                  } else {
                    return <option key={index} value={model}>{model}</option>
                  }
                })}
              </select>
            </div>

            <div>
              <label htmlFor="gear" className="left-tab">Gear: {this.state.gear.join(', ')}</label>
              <input type="text" name="gear" className="right-tab" defaultValue={this.state.gear.join(', ') || ''} ref={input => this.gear = input}/>
            </div>

            <div>
              <label htmlFor="status" className="left-tab">Status: </label>
              <select name="status" id="status" className="right-tab form-control" ref={input => this.status = input}>
              {this.statuses.map((status, index) => {
                if (status === this.state.status) {
                  return <option key={index} value={status} selected>{status}</option>
                } else {
                  return <option key={index} value={status}>{status}</option>
                }
              })}
              </select>
            </div>

            <button className="btn btn-outline-primary" type="submit">Update</button>
            </form>
          </div>
        );
    }
}