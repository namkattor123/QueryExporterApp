import React, { Component } from 'react'
import MetricService from '../services/MetricService'
import { BsEye, BsTrash, BsPencil } from 'react-icons/bs';
import ShowMore from '../components/ShowMore'

class ListMetricComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                metrics: []
        }
        this.addMetric = this.addMetric.bind(this);
        this.editMetric = this.editMetric.bind(this);
        this.deleteMetric = this.deleteMetric.bind(this);
        this.addMetric = this.addMetric.bind(this);
    }

    deleteMetric(id){
        MetricService.deleteMetric(id,localStorage.getItem('token')).then( res => {
            this.setState({metrics: this.state.metrics.filter(metric => metric.id !== id)});
        });
    }
    viewMetric(id){
        this.props.history.push(`/view-metric/${id}`);
    }
    editMetric(id){
        this.props.history.push(`/add-metric/${id}`);
    }

    componentDidMount(){
        MetricService.getMetrics(localStorage.getItem('token')).then((res) => {
            this.setState({ metrics: res.data});
        });
    }

    addMetric(){
        this.props.history.push('/add-metric/_add');
    }
    render() {
        return (
            <div>
                 <h2 className="text-center">Metrics List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addMetric}> Add Metric</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name</th>
                                    <th> Type</th>
                                    <th> Description</th>
                                    <th> Labels </th>
                                    <th> Buckets</th>
                                    <th> States</th>
                                    <th> Expiration</th>
                                    <th> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.metrics.map(
                                        metric =>
                                        <tr key = {metric.id}>
                                             <td> {metric.name} </td>
                                             <td> {metric.type}</td>
                                             <td> {metric.description}</td>
                                             <td> <ShowMore text={metric.labels} maxLength={5} /></td>
                                             <td> {metric.buckets}</td>
                                             <td> {metric.states}</td>
                                             <td> {metric.expiration}</td>
                                             <td>
                                                 <button onClick={ () => this.editMetric(metric.id)} className="btn btn-info"><BsPencil /> </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteMetric(metric.id)} className="btn btn-danger"><BsTrash /> </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewMetric(metric.id)} className="btn btn-info"><BsEye /> </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListMetricComponent
