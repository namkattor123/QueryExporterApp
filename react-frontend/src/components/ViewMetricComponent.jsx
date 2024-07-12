import React, { Component } from 'react'
import MetricService from '../services/MetricService'

class ViewMetricComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            metric: {}
        }
    }

    componentDidMount(){
        MetricService.getMetricById(this.state.id,localStorage.getItem('token')).then( res => {
            this.setState({metric: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Metric Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Name: </label>
                            <div> { this.state.metric.name }</div>
                        </div>
                        <div className = "row">
                            <label> Type: </label>
                            <div> { this.state.metric.type }</div>
                        </div>
                        <div className = "row">
                            <label> Labels: </label>
                            <div> { this.state.metric.labels }</div>
                        </div>
                        <div className = "row">
                            <label> Description: </label>
                            <div> { this.state.metric.description }</div>
                        </div>
                        <div className = "row">
                            <label> Buckets: </label>
                            <div> { this.state.metric.buckets }</div>
                        </div>
                        <div className = "row">
                            <label> States: </label>
                            <div> { this.state.metric.states }</div>
                        </div>
                        <div className = "row">
                            <label> Expiration: </label>
                            <div> { this.state.metric.expiration }</div>
                        </div>
                        <div className = "row">
                            <label> Increment: </label>
                            <div> { this.state.metric.increment }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewMetricComponent
