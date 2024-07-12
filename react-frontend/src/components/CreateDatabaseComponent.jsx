import React, { Component } from 'react'
import DatabaseService from '../services/DatabaseService';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
class CreateDatabaseComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            link: '',
            serviceCode:'',
            connectSql: '',
            keepConnect:null,
            autoCommit:null,
            label: null,

        }
        this.changeLinkHandler = this.changeLinkHandler.bind(this);
        this.changeConnectSQLHandler = this.changeConnectSQLHandler.bind(this);
        this.changeLabelHandler = this.changeLabelHandler.bind(this);
        this.changeKeepConnectHandler = this.changeKeepConnectHandler.bind(this);
        this.changeAutoCommitHandler = this.changeAutoCommitHandler.bind(this);
        this.changeServiceCodeHandler = this.changeServiceCodeHandler.bind(this);
        this.saveOrUpdateDatabase = this.saveOrUpdateDatabase.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            DatabaseService.getDatabaseById(this.state.id,localStorage.getItem('token')).then( (res) =>{
                let database = res.data;
                this.setState({link: database.link,
                    connectSql: database.connectSql,
                    serviceCode: database.serviceCode,
                    keepConnect:database.keepConnect,
                    autoCommit:database.autoCommit,
                    label : database.label
                });
            });
        }

    }
    saveOrUpdateDatabase = (e) => {
        e.preventDefault();
        var form = document.getElementById('myForm');
        var linkInput = form.elements['link'];
        var serviceCodeInput = form.elements['serviceCode'];
        const demSlash = (linkInput.value.match(/\//g) || []).length;
        const demAt = (linkInput.value.match(/@/g) || []).length;
        let database = {link: this.state.link,
                    connectSql: this.state.connectSql,
                    serviceCode: this.state.serviceCode,
                    keepConnect:this.state.keepConnect,
                    autoCommit:this.state.autoCommit,
                    label: this.state.label};
        console.log(demSlash);
        console.log(demAt);
        if (!linkInput.value) {
          document.getElementById('linkError').innerText = 'Link is required!';
          return;
        }
        if(demSlash > 3 || demAt > 1){
          document.getElementById('linkError').innerText = 'Error format type of Link: pymysql://user:pass@host:port/db_name!';
          return;
        }

        if (!serviceCodeInput.value) {
          document.getElementById('serviceCodeError').innerText = 'ServiceCode is required!';
          return;
        }
        // step 5
        if(this.state.id === '_add' && linkInput.value && serviceCodeInput.value){
            DatabaseService.createDatabase(database,localStorage.getItem('token')).then(res =>{
                this.props.history.push('/databases');
            })
            .catch(error => {
               alert(`Duplicate name of DB: ${error.response.data}`);
               console.error('Error:', error);
            });
        }else{

            DatabaseService.updateDatabase(database, this.state
            .id,localStorage.getItem('token')).then( res => {
                this.props.history.push('/databases');
            })
            .catch(error => {
               alert(`Duplicate name of DB: ${error.response.data}`);
               console.error('Error:', error);
            });
        }
    }
    
    changeLinkHandler= (event) => {
        this.setState({link: event.target.value});
    }
    changeLabelHandler= (event) => {
        this.setState({label: event.target.value});
    }
    changeConnectSQLHandler= (event) => {
        this.setState({connectSql: event.target.value});
    }
    changeKeepConnectHandler= (event) => {
        this.setState({keepConnect: event.target.value});
    }
    changeAutoCommitHandler= (event: RadioChangeEvent) => {
        this.setState({autoCommit: event.target.value});
    }
    changeServiceCodeHandler= (event) => {
        this.setState({serviceCode: event.target.value});
    }

    cancel(){
        this.props.history.push('/databases');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Database</h3>
        }else{
            return <h3 className="text-center">Update Database</h3>
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
                                            <label class="required-label"> Link: </label>
                                            <input placeholder="Link" type="link" name="link" className="form-control" id="link"
                                                value={this.state.link} onChange={this.changeLinkHandler} required />
                                            <div id="linkError" class="error-message"></div>
                                        </div>

                                        <div className = "form-group">
                                            <label> ConnectSQL: </label>
                                            <input placeholder="ConnectSQL" name="connectSQL" className="form-control"
                                                value={this.state.connectSQL} onChange={this.changeConnectSQLHandler} />
                                        </div>
                                        <div className = "form-group">
                                            <label class="required-label"> ServiceCode: </label>
                                            <input placeholder="ServiceCode" type="serviceCode"  name="serviceCode" className="form-control"
                                                value={this.state.serviceCode} onChange={this.changeServiceCodeHandler} required/>
                                            <div id="serviceCodeError" class="error-message"></div>
                                        </div>
                                        <div className = "form-group">
                                            <label> Label: </label>
                                            <input placeholder="Label a,b,c,..." name="label" className="form-control"
                                                value={this.state.label} onChange={this.changeLabelHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> KeepConnect:</label>
{/*                                             <input placeholder="KeepConnect" name="keepConnect" className="form-control" */}
{/*                                                 value={this.state.keepConnect} onChange={this.changeKeepConnectHandler}/>                                        </div> */}
                                            <Radio.Group onChange={this.changeKeepConnectHandler} value={this.state.keepConnect}>
                                              <Radio value={true}>TRUE</Radio>
                                              <Radio value={false}>FALSE</Radio>
                                            </Radio.Group>
                                        </div>
                                        <div className = "form-group">
                                            <label> Autocommit:</label>
                                            <Radio.Group onChange={this.changeAutoCommitHandler} value={this.state.autoCommit}>
                                              <Radio value={true}>TRUE</Radio>
                                              <Radio value={false}>FALSE</Radio>
                                            </Radio.Group>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateDatabase}>Save</button>
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

export default CreateDatabaseComponent
