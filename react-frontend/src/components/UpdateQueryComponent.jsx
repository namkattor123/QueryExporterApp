import React, { Component } from 'react'
import QueryService from '../services/QueryService';
import DatabaseService from '../services/DatabaseService';
import MetricService from '../services/MetricService';
import Select from 'react-select';

class UpdateQueryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            interval: '',
            timeout: '',
            databases: '',
            metrics:'',
            sql:'',
            schedule:'',
            parameters:'',
            searchDBs:[],
            searchMetrics:[],
            test:[],
            testMetric:[]
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeIntervalHandler = this.changeIntervalHandler.bind(this);
        this.changeTimeoutHandler = this.changeTimeoutHandler.bind(this);
        this.changeDatabaseHandler = this.changeDatabaseHandler.bind(this);
        this.changeMetricHandler = this.changeMetricHandler.bind(this);
        this.changeSqlHandler = this.changeSqlHandler.bind(this);
        this.changeParametersHandler = this.changeParametersHandler.bind(this);
        this.changeScheduleHandler = this.changeScheduleHandler.bind(this);

        this.updateQuery = this.updateQuery.bind(this);

    }

    componentDidMount(){
        QueryService.getQueryById(this.state.id,localStorage.getItem('token')).then( (res) =>{
             let query = res.data;
                 this.setState({name: query.name,
                     type: query.type,
                     description : query.description,
                     labels : query.labels,
                     buckets: query.buckets,
                     states: query.states,
                     expiration: query.expiration,
                     increment: query.increment
           });
        });
        DatabaseService.getDatabases(localStorage.getItem('token')).then(res =>{
            this.setState({searchDBs: res.data})
        });
        MetricService.getMetrics(localStorage.getItem('token')).then(res =>{
            this.setState({searchMetrics: res.data})
        });
    }

    updateQuery = (e) => {
        e.preventDefault();
        let query = {name: this.state.name, interval: this.state.interval, timeout: this.state.timeout,
        databases: this.state.testMetric, metrics: this.state.test, sql: this.state.sql,
        schedule: this.state.schedule, parameters: this.state.parameters
        };
        console.log('query => ' + JSON.stringify(query));
        console.log('id => ' + JSON.stringify(this.state.id));
        QueryService.updateQuery(query,this.state.id,localStorage.getItem('token')).then( res => {
            this.props.history.push('/queries');
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
            this.setState({test:null});

    }
    changeTestMetricHandler= (testMetric) => {
        if(testMetric === ""){
            this.setState({testMetric:null});
        }else{
            this.setState({testMetric:testMetric});

        }
    }
    cancel(){
        this.props.history.push('/queries');
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
                                    <form>
                                        <div className = "form-group">
                                            <databases> Name: </databases>
                                            <input placeholder="Name" name="name" className="form-control"
                                                value={this.state.name} onChange={this.changeNameHandler}/>
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
                                        <div className = "form-group">
                                            <databases> Database: </databases>
                                              <select value={this.state.databases} onChange={this.changeDatabaseHandler}>
                                                <option value="" disabled>
                                                  Chọn giá trị
                                                </option>
                                                {this.state.searchDBs.map((searchDB) => (
                                                  <option key={searchDB.id} value={searchDB.name}>
                                                    {searchDB.name}
                                                  </option>
                                                ))}
                                              </select>
                                              <p>Đã chọn: {this.state.databases}</p>
                                        </div>
                                        <div className = "form-group">
                                            <databases> Metric: </databases>
                                              <select value={this.state.metrics} onChange={this.changeMetricHandler}>
                                                <option value="" disabled>
                                                  Chọn giá trị
                                                </option>
                                                {this.state.searchMetrics.map((searchMetric) => (
                                                  <option key={searchMetric.id} value={searchMetric.name}>
                                                    {searchMetric.name}
                                                  </option>
                                                ))}
                                              </select>
                                              <p>Đã chọn: {this.state.metrics}</p>
                                       </div>
                                        <div className = "form-group">
                                            <databases> Metric: </databases>
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
                                            <databases> Database: </databases>
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
                                            <databases> Sql: </databases>
                                            <input placeholder="Sql" name="sql" className="form-control"
                                                value={this.state.sql} onChange={this.changeSqlHandler}/>
                                        </div>
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
                                        <button className="btn btn-success" onClick={this.updateQuery}>Save</button>
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

export default UpdateQueryComponent
