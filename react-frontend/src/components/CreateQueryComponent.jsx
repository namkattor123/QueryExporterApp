import React, { Component } from 'react'
import QueryService from '../services/QueryService';
import DatabaseService from '../services/DatabaseService';
import MetricService from '../services/MetricService';
import Select from 'react-select';
class CreateQueryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            interval: null,
            timeout: null,
            databases: null,
            metrics:null,
            sql:null,
            schedule:null,
            parameters:null,
            searchDBs:[],
            searchMetrics:[],
            test:'',
            testMetric:''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeIntervalHandler = this.changeIntervalHandler.bind(this);
        this.changeTimeoutHandler = this.changeTimeoutHandler.bind(this);
        this.changeDatabaseHandler = this.changeDatabaseHandler.bind(this);
        this.changeMetricHandler = this.changeMetricHandler.bind(this);
        this.changeSqlHandler = this.changeSqlHandler.bind(this);
        this.changeParametersHandler = this.changeParametersHandler.bind(this);
        this.changeScheduleHandler = this.changeScheduleHandler.bind(this);
        this.changeTestHandler = this.changeTestHandler.bind(this);
        this.saveOrUpdateQuery = this.saveOrUpdateQuery.bind(this);
    }

    // step 3
    componentDidMount(){
        DatabaseService.getDatabases(localStorage.getItem('token')).then(res =>{
            this.setState({searchDBs: res.data})
        });
        MetricService.getMetrics(localStorage.getItem('token')).then(res =>{
            this.setState({searchMetrics: res.data})
        });
        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            QueryService.getQueryById(this.state.id,localStorage.getItem('token')).then( (res) =>{
                let query = res.data;
                this.setState({name: query.name,
                    interval: query.interval,
                    timeout : query.timeout,
                    databases : query.databases,
                    metrics : query.metrics,
                    sql : query.sql,
                    schedule: query.schedule,
                    parameters: query.parameters
                });
            });
        }
    }
    saveOrUpdateQuery = (e) => {
        e.preventDefault();
        var form = document.getElementById('myForm');
        const sqlKeywords = ['INSERT', 'UPDATE', 'DELETE', 'COMMIT'];
        var sqlInput = form.elements['sql'];
        let query = {name: this.state.name, interval: this.state.interval, timeout: this.state.timeout,
        databases: this.state.testMetric, metrics: this.state.test, sql: this.state.sql,
        schedule: this.state.schedule, parameters: this.state.parameters
        };
        console.log('query => ' + JSON.stringify(query));
        const endsWithSemicolon = sqlInput.value.trim().endsWith(';');
        const containsSqlKeywords = sqlKeywords.some(keyword => sqlInput.value.toUpperCase().includes(keyword));
        // step 5
        if (!sqlInput.value) {
          document.getElementById('sqlError').innerText = 'SQL is required!';
          return;
        }
        if (containsSqlKeywords) {
           document.getElementById('sqlError').innerText = 'SQL must not contain INSERT, UPDATE, DELETE, COMMIT!';
        return;
        }
        if (!endsWithSemicolon) {
           document.getElementById('sqlError').innerText = 'SQL must have semicolor at the end';
        return;
        }
        if(this.state.id === '_add' && sqlInput.value){
            QueryService.createQuery(query,localStorage.getItem('token')).then(res =>{
                this.props.history.push('/queries');
            })
            .catch(error => {
               alert(`Duplicate name of Query: ${error.response.data}`);
               console.error('Error:', error);
            });
        }else{
            QueryService.updateQuery(query, this.state.id,localStorage.getItem('token')).then( res => {
                this.props.history.push('/queries');
            })
            .catch(error => {
               alert(`Duplicate name of Query: ${error.response.data}`);
               console.error('Error:', error);
            });
        }
    }
    searchDatabaseHandler= (e) => {
        e.preventDefault();
        DatabaseService.getDatabases(localStorage.getItem('token')).then(res =>{
            this.setState({searchDB: res.data})
        });

    }
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeIntervalHandler= (event) => {
        this.setState({interval: event.target.value});
    }

    changeTimeoutHandler= (event) => {
        this.setState({timeout: event.target.value});
    }
    changeDatabaseHandler= (event) => {
        this.setState({databases: event.target.value});
    }
    changeMetricHandler= (event) => {
        this.setState({metrics: event.target.value});
    }
    changeSqlHandler= (event) => {
        this.setState({sql: event.target.value});
    }
    changeScheduleHandler= (event) => {
        this.setState({schedule: event.target.value});
    }
    changeParametersHandler= (event) => {
        this.setState({parameters: event.target.value});
    }
    changeTestHandler= (test) => {
        this.setState({test:test});
    }
    changeTestMetricHandler= (testMetric) => {
        this.setState({testMetric:testMetric});
    }
    cancel(){
        this.props.history.push('/queries');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Query</h3>
        }else{
            return <h3 className="text-center">Update Query</h3>
        }
    }
    render() {
        const { databases, searchDBs } = this.state;
        const { metrics, searchMetrics } = this.state;
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
                                    <form id='myForm'>
                                        <div className = "form-group">
                                            <label class="required-label"> Name: </label>
                                            <input placeholder="Name" name="name" className="form-control"
                                                value={this.state.name} onChange={this.changeNameHandler} required/>
                                        </div>
                                        <div className = "form-group">
                                            <databases> Interval: </databases>
                                            <input placeholder="Interval" name="interval" className="form-control"
                                                value={this.state.interval} onChange={this.changeIntervalHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <databases> Timeout: </databases>
                                            <input placeholder="Timeout" name="timeout" className="form-control"
                                                value={this.state.timeout} onChange={this.changeTimeoutHandler}/>
                                        </div>
{/*                                         <div className = "form-group"> */}
{/*                                             <databases> Database: </databases> */}
{/*                                               <select value={this.state.databases} onChange={this.changeDatabaseHandler}> */}
{/*                                                 <option value="" disabled> */}
{/*                                                   Chọn giá trị */}
{/*                                                 </option> */}
{/*                                                 {this.state.searchDBs.map((searchDB) => ( */}
{/*                                                   <option key={searchDB.id} value={searchDB.name}> */}
{/*                                                     {searchDB.name} */}
{/*                                                   </option> */}
{/*                                                 ))} */}
{/*                                               </select> */}
{/*                                               <p>Đã chọn: {this.state.databases}</p> */}
{/*                                         </div> */}

{/*                                         <div className = "form-group"> */}
{/*                                             <databases> Metric: </databases> */}
{/*                                               <select value={this.state.metrics} onChange={this.changeMetricHandler}> */}
{/*                                                 <option value="" disabled> */}
{/*                                                   Chọn giá trị */}
{/*                                                 </option> */}
{/*                                                 {this.state.searchMetrics.map((searchMetric) => ( */}
{/*                                                   <option key={searchMetric.id} value={searchMetric.name}> */}
{/*                                                     {searchMetric.name} */}
{/*                                                   </option> */}
{/*                                                 ))} */}
{/*                                               </select> */}
{/*                                               <p>Đã chọn: {this.state.metrics}</p> */}
{/*                                        </div> */}
                                        <div className = "form-group">
                                            <label class="required-label"> Metric: </label>
                                          <Select
                                            isMulti
                                            value={this.state.test}
                                            onChange={this.changeTestHandler}
                                            options={searchMetrics}
                                            getOptionLabel={(searchMetric) => searchMetric.name} // Đặt trường hiển thị trong dropdown
                                            getOptionValue={(searchMetric) => searchMetric.name} // Đặt giá trị duy nhất của tùy chọn
                                          />
                                        </div>
                                        <div className = "form-group">
                                            <label class="required-label"> Database: </label>
                                          <Select
                                            isMulti
                                            value={this.state.testMetric}
                                            onChange={this.changeTestMetricHandler}
                                            options={searchDBs}
                                            getOptionLabel={(searchDB) => searchDB.name} // Đặt trường hiển thị trong dropdown
                                            getOptionValue={(searchDB) => searchDB.name} // Đặt giá trị duy nhất của tùy chọn
                                          />
                                       </div>
                                        <div className = "form-group">
                                            <label class="required-label"> Sql: </label>
                                            <input placeholder="Sql" name="sql" className="form-control" id="sql"
                                                value={this.state.sql} onChange={this.changeSqlHandler} required/>
                                        </div>
                                        <div id="sqlError" class="error-message"></div>
                                        <div className = "form-group">
                                            <databases> Parameters: </databases>
                                            <input placeholder="Parameters" name="parameters" className="form-control"
                                                value={this.state.parameters} onChange={this.changeParametersHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <databases> Schedule: </databases>
                                            <input placeholder="Schedule" name="schedule" className="form-control"
                                                value={this.state.schedule} onChange={this.changeScheduleHandler}/>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateQuery}>Save</button>
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

export default CreateQueryComponent
