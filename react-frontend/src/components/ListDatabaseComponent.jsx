import React, { Component } from 'react'
import DatabaseService from '../services/DatabaseService'
import { BsEye, BsTrash, BsPencil } from 'react-icons/bs';
import ShowMore from '../components/ShowMore';
import { Button, Result } from 'antd';
class ListDatabaseComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                databases: []
        }
        this.addDatabase = this.addDatabase.bind(this);
    }

    deleteDatabase(id){
        DatabaseService.deleteDatabase(id,localStorage.getItem('token')).then( res => {
            this.setState({databases: this.state.databases.filter(database => database.id !== id)});
        });
    }
    viewDatabase(id){
        this.props.history.push(`/view-database/${id}`);
    }
    editDatabase(id){
        this.props.history.push(`/add-database/${id}`);
    }
    addDatabase(){
         this.props.history.push('/add-database/_add');
    }

    componentDidMount(){
        DatabaseService.getDatabases(localStorage.getItem('token')).then((res) => {
            this.setState({ databases: res.data});
        }).catch(error => {
            alert(`Duplicate name of DB: ${error.response.data}`);
            console.error('Error:', error);
            return (
              <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary">Back Home</Button>}
              />
            )
        });
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Databases List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addDatabase}> Add Database</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name</th>
                                    <th> Dsn</th>
                                    <th> HostName</th>
                                    <th> Service Code</th>
                                    <th> Label</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.databases.map(
                                        database =>
                                        <tr key = {database.id}>
                                             <td> {database.name} </td>
                                             <td> <ShowMore text={database.dsn} maxLength={10} /></td>
                                             <td> {database.hostName}</td>
                                             <td> {database.serviceCode}</td>
                                             <td> {database.label}</td>

                                             <td>
                                                 <button onClick={ () => this.editDatabase(database.id)} className="btn btn-info"><BsPencil /> </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteDatabase(database.id)} className="btn btn-danger"><BsTrash /> </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewDatabase(database.id)} className="btn btn-info"><BsEye /> </button>
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

export default ListDatabaseComponent
