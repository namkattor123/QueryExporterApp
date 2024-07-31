import React, { Component} from 'react'
import DatabaseService from '../../services/DatabaseService'
import MetricService from '../../services/MetricService'
import QueryService from '../../services/QueryService'
import { BsDownload } from 'react-icons/bs';
import ShowMore from '../ShowMore'
import BulkImportForm from '../home/BulkImportForm'
const yaml = require('js-yaml');

class ExportPages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            databases : [],
            metrics: [],
            queries: [],
            yaml:''
        }
        this.addDatabase = this.addDatabase.bind(this);
        this.addQuery = this.addQuery.bind(this);
        this.addMetric = this.addMetric.bind(this);
        this.downloadYaml = this.downloadYaml.bind(this);
        this.viewDatabase = this.viewDatabase.bind(this);
        this.viewMetric = this.viewMetric.bind(this);
        this.viewQuery = this.viewQuery.bind(this);
    }

    componentDidMount(){
        QueryService.getQueries(localStorage.getItem('token')).then((res) => {
            this.setState({queries:res.data});
        });
        DatabaseService.getDatabases(localStorage.getItem('token')).then((res) => {
            this.setState({databases:res.data});
        });
        MetricService.getMetrics(localStorage.getItem('token')).then((res) => {
            this.setState({metrics:res.data});
        });
    }
    downloadYaml = (e) =>  {
      e.preventDefault();
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
      const token = localStorage.getItem('token');
      fetch(apiBaseUrl+'/home/downloadYaml', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          // Add any other headers as needed
        },
      }) // Replace with your API endpoint
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.blob();
        })
        .then(blob => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.yaml'); // Set the filename
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
    uploadYaml = (e) =>  {
      e.preventDefault();
      return (
        <div>
        <h1>Your React App</h1>
        <BulkImportForm />
        </div>
      );
    }
//     viewYaml = (e) =>  {
//       e.preventDefault();
//       const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
//       const token = localStorage.getItem('token');
//       fetch(apiBaseUrl+'/home/viewYaml', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           // Add any other headers as needed
//         },
//       }) // Replace with your API endpoint
//         .then(response => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           console.log(response.data);
//           const handleChange = ({ json, text }) => {
//             console.log(text);
//             // "foo: bar"
//           };
//           return <YamlEditor text={response} onChange={handleChange} />;
//         })
//         .catch(error => {
//           console.error('There was a problem with the fetch operation:', error);
//         });
//     }
    addQuery(){
        this.props.history.push('/add-query/_add');
    }
    addMetric(){
        this.props.history.push('/add-metric/_add');
    }
    addDatabase(){
        this.props.history.push('/add-database/_add');
    }
    viewDatabase(){
        this.props.history.push('/databases');
    }
    viewMetric(){
        this.props.history.push('/metrics');
    }
    viewQuery(){
        this.props.history.push('/queries');
    }
    render() {
        return (
            <div class="row">
              <div class="col-sm-4">
                <h2 className="text-center">Databases List</h2>
                    <table className = "table table-striped table-bordered">
                        <thead>
                           <tr>
                              <th> Name</th>
                              <th> HostName</th>
                              <th> Service Code</th>
                           </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.databases.map(
                                    database =>
                                    <tr key = {database.id}>
                                        <td> {database.name} </td>
                                        <td> {database.hostName}</td>
                                        <td> <ShowMore text={database.serviceCode} maxLength={5} /></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
              </div>

              <div class="col-sm-4">
                <h2 className="text-center">Metrics List</h2>
                <table className = "table table-striped table-bordered">
                    <thead>
                       <tr>
                          <th> Name</th>
                          <th> Type</th>
                          <th> Label</th>
                       </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.metrics.map(
                                metric =>
                                <tr key = {metric.id}>
                                    <td> <ShowMore text={metric.name} maxLength={11} /> </td>
                                    <td> {metric.type}</td>
                                    <td> {metric.label}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
              </div>
              <div class="col-sm-4">
                <h2 className="text-center">Queries List</h2>
                <table className = "table table-striped table-bordered">
                    <thead>
                       <tr>
                          <th> Name</th>
                          <th> Database</th>
                          <th> Metric</th>
                       </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.queries.map(
                                query =>
                                <tr key = {query.id}>
                                    <td> <ShowMore text={query.name} maxLength={11} /> </td>
                                    <td> {query.databases}</td>
                                    <td> <ShowMore text={query.metrics} maxLength={11} /> </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
              </div>
                     <div>
                        <button className="btn btn-success" onClick={this.downloadYaml}><BsDownload /></button>
                     </div>
            </div>
        )
    }
}

export default ExportPages;
