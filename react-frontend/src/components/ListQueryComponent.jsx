import React, { Component } from 'react'
import QueryService from '../services/QueryService'
import { BsEye, BsTrash, BsPencil } from 'react-icons/bs';
import ShowMore from '../components/ShowMore'

class ListQueryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                queries: []
        }
        this.addQuery = this.addQuery.bind(this);
        this.editQuery = this.editQuery.bind(this);
        this.deleteQuery = this.deleteQuery.bind(this);
        this.viewQuery = this.viewQuery.bind(this);
    }

    deleteQuery(id){
        QueryService.deleteQuery(id,localStorage.getItem('token')).then( res => {
            this.setState({queries: this.state.queries.filter(query => query.id !== id)});
        });
    }
    viewQuery(id){
        this.props.history.push(`/view-query/${id}`);
    }
    editQuery(id){
        this.props.history.push(`/add-query/${id}`);
    }

    componentDidMount(){
        QueryService.getQueries(localStorage.getItem('token')).then((res) => {
            this.setState({ queries: res.data});
        });
    }

    addQuery(){
        this.props.history.push('/add-query/_add');
    }
    render() {
        return (
            <div>
                 <h2 className="text-center">Queries List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addQuery}> Add Query</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name</th>
                                    <th> Interval</th>
                                    <th> Timeout</th>
                                    <th> Database</th>
                                    <th> Metric </th>
                                    <th> SQL </th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.queries.map(
                                        query =>
                                        <tr key = {query.id}>
                                             <td> <ShowMore text={query.name} maxLength={10}/> </td>
                                             <td> {query.interval}</td>
                                             <td> {query.timeout}</td>
                                             <td> {query.databases}</td>
                                             <td> {query.metrics}</td>
                                             <td> <ShowMore text={query.sql} maxLength={10} /></td>
                                             <td>
                                                 <button onClick={ () => this.editQuery(query.id)} className="btn btn-info"><BsPencil /> </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteQuery(query.id)} className="btn btn-danger"><BsTrash /> </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewQuery(query.id)} className="btn btn-info"><BsEye /> </button>
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

export default ListQueryComponent
