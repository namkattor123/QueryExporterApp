import React, { Component } from 'react'
import MetricService from '../services/MetricService';

class CreateMetricComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            type: '',
            description: '',
            labels: null,
            buckets: null,
            states: null,
            expiration: null,
            increment: null
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeLabelHandler = this.changeLabelHandler.bind(this);
        this.changeBucketsHandler = this.changeBucketsHandler.bind(this);
        this.changeStatesHandler = this.changeStatesHandler.bind(this);
        this.changeExpirationHandler = this.changeExpirationHandler.bind(this);
        this.changeIncrementHandler= this.changeIncrementHandler.bind(this);

        this.saveOrUpdateMetric = this.saveOrUpdateMetric.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            MetricService.getMetricById(this.state.id,localStorage.getItem('token')).then( (res) =>{
                let metric = res.data;
                this.setState({name: metric.name,
                    type: metric.type,
                    description : metric.description,
                    labels : metric.labels,
                    buckets: metric.buckets,
                    states: metric.states,
                    expiration: metric.expiration,
                    increment: metric.increment
                });
            });
        }        
    }
    saveOrUpdateMetric = (e) => {
        var form = document.getElementById('myForm');
        var nameInput = form.elements['name'];

        e.preventDefault();
        let metric = {name: this.state.name, type: this.state.type, description: this.state.description,
                      labels: this.state.labels, buckets: this.state.buckets, states: this.state.states,
                      expiration: this.state.expiration,  increment: this.state.increment
        };
        console.log('metric => ' + JSON.stringify(metric));
         if (!nameInput.value) {
           document.getElementById('nameError').innerText = 'Name is required!';
         }

        // step 5
        if(this.state.id === '_add'){
            MetricService.createMetric(metric,localStorage.getItem('token')).then(res =>{
                this.props.history.push('/metrics');
            })
            .catch(error => {
               alert(`Duplicate name of Metric: ${error.response.data}`);
               console.error('Error:', error);
            });
        }else{
            MetricService.updateMetric(metric, this.state.id,localStorage.getItem('token')).then( res => {
                this.props.history.push('/metrics');
            })
            .catch(error => {
               alert(`Duplicate name of Metric: ${error.response.data}`);
               console.error('Error:', error);
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeTypeHandler= (event) => {
        this.setState({type: event.target.value});
    }

    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }
    changeLabelHandler= (event) => {
        this.setState({labels: event.target.value});
    }
    changeBucketsHandler= (event) => {
        this.setState({buckets: event.target.value});
    }

    changeStatesHandler= (event) => {
        this.setState({states: event.target.value});
    }

    changeExpirationHandler= (event) => {
        this.setState({expiration: event.target.value});
    }
    changeIncrementHandler= (event) => {
        this.setState({increment: event.target.value});
    }
    cancel(){
        this.props.history.push('/metrics');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Metric</h3>
        }else{
            return <h3 className="text-center">Update Metric</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form id="myForm">
                                        <div className = "form-group">
                                            <label class="required-label"> Name: </label>
                                            <input placeholder="Name" type="name" name="name" className="form-control"
                                                value={this.state.name} onChange={this.changeNameHandler} required/>
                                            <div id="nameError" class="error-message"></div>
                                        </div>
                                        <div className = "form-group">
                                          <label class="required-label">
                                            Type:
                                            <select value={this.state.type} onChange={this.changeTypeHandler} type="type" >
                                              <option value="">Select...</option>
                                              <option value="counter">counter</option>
                                              <option value="enum">enum</option>
                                              <option value="gauge">gauge</option>
                                              <option value="histogram">histogram</option>
                                              <option value="summary">summary</option>
                                            </select>
                                          </label>
                                        </div>
                                        <div className = "form-group">
                                            <labels> Description: </labels>
                                            <input placeholder="Description" name="description" className="form-control"
                                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <labels> Labels: </labels>
                                            <input placeholder="Labels a,b,c,..." name="labels" className="form-control"
                                                value={this.state.labels} onChange={this.changeLabelHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <labels> Bucket: </labels>
                                            <input placeholder="Bucket" name="buckets" className="form-control"
                                                value={this.state.buckets} onChange={this.changeBucketsHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <labels> States: </labels>
                                            <input placeholder="States" name="states" className="form-control"
                                                value={this.state.states} onChange={this.changeStatesHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <labels> Expiration: </labels>
                                            <input placeholder="Expiration" name="expiration" className="form-control"
                                                value={this.state.expiration} onChange={this.changeExpirationHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <labels> Increment: </labels>
                                            <input placeholder="Increment" name="increment" className="form-control"
                                                value={this.state.increment} onChange={this.changeIncrementHandler}/>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateMetric}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateMetricComponent
