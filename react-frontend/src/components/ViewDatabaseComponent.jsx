import React, { Component } from 'react'
import DatabaseService from '../services/DatabaseService'

class ViewDatabaseComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            database: {}
        }
    }

    componentDidMount(){
        DatabaseService.getDatabaseById(this.state.id,localStorage.getItem('token')).then( res => {
            this.setState({database: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Database Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Name: </label>
                            <div> { this.state.database.name }</div>
                        </div>
                        <div className = "row">
                            <label> Dsn: </label>
                            <div> { this.state.database.dsn }</div>
                        </div>
                        <div className = "row">
                            <label> HostName: </label>
                            <div> { this.state.database.label }</div>
                        </div>
                        <div className = "row">
                            <label> HostName: </label>
                            <div> { this.state.database.hostname }</div>
                        </div>
                        <div className = "row">
                            <label> ServiceCode: </label>
                            <div> { this.state.database.serviceCode }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewDatabaseComponent
