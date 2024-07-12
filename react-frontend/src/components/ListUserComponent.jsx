import React, { Component } from 'react'
import UserService from '../services/UserService'
import { BsEye, BsTrash, BsPencil } from 'react-icons/bs';
import ShowMore from '../components/ShowMore';
import { Button, Result } from 'antd';
class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                users: []
        }
    }

    deleteUser(id){
        UserService.deleteUser(id,localStorage.getItem('token')).then( res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        });
    }
    editUser(id){
        this.props.history.push(`/add-user/${id}`);
    }


    componentDidMount(){
        UserService.getUsers(localStorage.getItem('token')).then((res) => {
            this.setState({ users: res.data});
        }).catch(error => {
            return(
              <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary">Back Home</Button>}
              />
            )
        });
        ;
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Users List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addUser}> Add User</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map(
                                        user =>
                                        <tr key = {user.id}>
                                             <td> {user.name} </td>

                                             <td>
                                                 <button onClick={ () => this.editUser(user.id)} className="btn btn-info"><BsPencil /> </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(user.id)} className="btn btn-danger"><BsTrash /> </button>
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

export default ListUserComponent
