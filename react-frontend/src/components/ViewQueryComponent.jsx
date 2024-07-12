import React, { Component } from 'react'
import QueryService from '../services/QueryService'

class ViewQueryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            query: {}
        }
        this.viewQuery = this.viewQuery.bind(this);
    }

    componentDidMount(){
        QueryService.getQueryById(this.state.id,localStorage.getItem('token')).then( res => {
            this.setState({query: res.data});
        })
    }

    viewQuery(){
        this.props.history.push('/queries');
    }
    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Query Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Name: </label>
                            <div> { this.state.query.name }</div>
                        </div>
                        <div className = "row">
                            <label> Timeout: </label>
                            <div> { this.state.query.timeout }</div>
                        </div>
                        <div className = "row">
                            <label> Parameters: </label>
                            <div> { this.state.query.parameter }</div>
                        </div>
                        <div className = "row">
                            <label> Schedule: </label>
                            <div> { this.state.query.schedule }</div>
                        </div>
                        <div className = "row">
                            <label> Interval: </label>
                            <div> { this.state.query.interval }</div>
                        </div>
                        <div className = "row">
                            <label> Databases: </label>
                            <div> { this.state.query.databases }</div>
                        </div>
                        <div className = "row">
                            <label> Schedule: </label>
                            <div> { this.state.query.metrics }</div>
                        </div>
                        <div className = "row">
                            <label> Interval: </label>
                            <div> { this.state.query.sql }</div>
                        </div>
                    </div>
                    <button className="btn btn-primary mt-3"><a href = "" onClick={this.viewQuery}>Back to Queries List</a> </button>
                </div>
            </div>
        )
    }
}

export default ViewQueryComponent
