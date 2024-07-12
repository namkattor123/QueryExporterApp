import React, { Component } from 'react'
import DatabaseService from '../services/DatabaseService';

class UpdateDatabaseComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            link: '',
            serviceCode: '',
            label: ''
        }
        this.changeLinkHandler = this.changeLinkHandler.bind(this);
        this.changeServiceCodeHandler = this.changeServiceCodeHandler.bind(this);
        this.changeLabelHandler = this.changeLabelHandler.bind(this);
        this.saveOrUpdateDatabase = this.saveOrUpdateDatabase.bind(this);
    }

    componentDidMount(){
        DatabaseService.getDatabaseById(this.state.id,localStorage.getItem('token')).then( (res) =>{
           let database = res.data;
           this.setState({link: database.link,
           serviceCode: database.serviceCode,
           label : database.label
           });
        });
    }

    updateDatabase = (e) => {
        e.preventDefault();
        let database = {link: this.state.link, serviceCode: this.state.serviceCode, label: this.state.label};
        console.log('database => ' + JSON.stringify(database));
        console.log('id => ' + JSON.stringify(this.state.id));
        DatabaseService.updateDatabase(database, this.state.id,localStorage.getItem('token')).then( res => {
            this.props.history.push('/databases');
        });
    }
    
    changeLinkHandler= (event) => {
        this.setState({link: event.target.value});
    }
    changeLabelHandler= (event) => {
        this.setState({label: event.target.value});
    }
    changeServiceCodeHandler= (event) => {
            this.setState({serviceCode: event.target.value});
    }

    cancel(){
        this.props.history.push('/databases');
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
                                    <form>
                                        <div className = "form-group">
                                            <label> Link: </label>
                                            <input placeholder="Link" name="link" className="form-control"
                                                value={this.state.link} onChange={this.changeLinkHandler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> ServiceCode: </label>
                                            <input placeholder="ServiceCode" name="serviceCode" className="form-control"
                                                value={this.state.serviceCode} onChange={this.changeServiceCodeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Label: </label>
                                            <input placeholder="Label a,b,c,..." name="label" className="form-control"
                                                value={this.state.label} onChange={this.changeLabelHandler}/>
                                        </div>
                                        <button className="btn btn-success" onClick={this.UpdateDatabase}>Save</button>
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

export default UpdateDatabaseComponent
