import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import UpdateDetails from './updateDetails';
import NotFound from './notFound';


export default class DetailsPage extends Component {

    constructor(props) {
        super(props);

        this.models = {}

        this.types = {
            Air:  ['Helicopter', 'Plane'],
            Sea:  ['Boat', 'Submarine'],
            Land: ['Car', 'Truck']
        };

        this.state = {
            items: []
        };

        this.getTransformers = this.getTransformers.bind(this);
    }

    getTransformers() {
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
            console.log(this.props.match);
            console.log(json);
        });

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
            console.log(this.models);
        });
    }

    componentWillMount() {
        this.getTransformers();
    }

    render() {
        const transformers = this.state.items;
        return (
          <div className="details">
            <div className="list">
            {
                this.state.items.map(item => {
                    return (<div key={item.id}>
                        <NavLink activeClassName="active-transformer" to={`${this.props.match.url}/${item.id}`}>{item.name}</NavLink>
                    </div>);
                })   
            }
            </div>
            
            <Route path={`${this.props.match.url}/:itemId`} render={
                ({match}) => { 
                    const transformer = transformers.find(transformer => transformer.id === Number(match.params.itemId));
                    if (!transformer) {
                        return <NotFound />
                    }

                    return <UpdateDetails {...transformer} types={this.types} models={this.models} getTransformer={this.getTransformers} />
                }
            } />
          </div>
        );
    }
}