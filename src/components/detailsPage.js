import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import UpdateDetails from './updateDetails';
import NotFound from './notFound';
import types from '../modules/types'

export default class DetailsPage extends Component {

    constructor(props) {
        super(props);

        this.models = {}

        this.state = {
            items: []
        };

        this.getTransformers = this.getTransformers.bind(this);
    }

    getTransformers() {

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

        this.setState({ items: this.props.transformers });
    }

    componentDidMount() {
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

                    return <UpdateDetails {...transformer} types={types} models={this.models} getTransformer={this.props.getTransformers} />
                }
            } />
          </div>
        );
    }
}