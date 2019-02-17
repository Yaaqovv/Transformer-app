import React, { Component } from 'react';
import ReactModal from 'react-modal';


export default class UpdateDetails extends Component {

    constructor(props) {
        super(props);

        this.statuses = ['OK', 'INJURED', 'MIA'];

        this.models = {};

        this.state = {
            id: '',
            name: '',
            nameError: '',
            vehicleGroup: this.props.vehicleGroup,
            currentVehicleGroup: [],
            vehicleType: this.props.vehicleType,
            vehicleModel: this.props.vehicleModel,
            gear: [],
            status: '',
            showModal: false,
            modalText: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleSubmit(event) {
      event.preventDefault();
      if ( this.name.value.length >= 2 && this.state.vehicleGroup && this.state.vehicleType && this.state.vehicleModel && this.state.gear && this.state.status) {
        fetch('http://localhost:3001/transformers/'+this.state.id, {
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
        .then(this.setState({ 
                            modalText: 'Transformer has been updated.',
                            showModal: !this.state.showModal
                          }))
        this.props.getTransformers();
      } else {
        this.setState({ modalText: 'Transformer has not been updated. Make sure all fields are filled in.',
                        showModal: !this.state.showModal
                      })
  
        } 
    }

    componentDidMount() {
      this.props.getTransformers();
    }

    handleInputChange (event) {
      const target = event.target;
      const value = target.type === 'select' ? target.selected : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });

  }

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    }, () => this.validateName());
  }


  validateName = () => {
    this.setState({
      nameError: this.name.value.length >= 2 ? null : 'Name must be longer than 1 character.'
    });
  }

  modalToggle = () => {
    this.setState({ showModal: !this.state.showModal })
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
        
        return (
          <div className="update-details">
            <div className="line"></div>
            <div className="hline"></div>
            <form onSubmit={this.handleSubmit} key={this.props.id}>
            <div><label htmlFor="id" className="left-tab">ID: </label><input type="text" name="id" className="right-tab" value={this.state.id} readOnly/></div>
            <div><label htmlFor="name" className="left-tab">Name: </label><input type="text" name="name" className="right-tab" defaultValue={this.state.name || ''} ref={input => this.name = input} onChange={this.handleNameChange}/></div>
            <div>{this.state.nameError}</div>
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
            <ReactModal
              isOpen={this.state.showModal}
              style={{content: contentStyle}}
              closeTimeoutMS={200}
              contentLabel="sadssaddsads"
              parentSelector={() => document.querySelector('.update-details')}
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