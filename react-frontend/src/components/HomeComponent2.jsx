import React, { Component} from 'react'
import DatabaseService from '../services/DatabaseService'
import MetricService from '../services/MetricService'
import QueryService from '../services/QueryService'
import HomeService from '../services/HomeService'
import { BsPlus, BsList , BsDownload,BsUpload, BsEye } from 'react-icons/bs';
import ShowMore from '../components/ShowMore'
import BulkImportForm from '../components/BulkImportForm'
import { Card, Col, Row, Avatar, Progress, Space} from 'antd';
import {
  DatabaseOutlined,
  BarChartOutlined,
  MonitorOutlined,
} from '@ant-design/icons';


class HomeComponent2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
        }
        this.downloadYaml = this.downloadYaml.bind(this);

    }

    componentDidMount(){
        HomeService.homeView(localStorage.getItem('token')).then((res) => {
            this.setState({data: res.data});
            console.log("Data in react ");
            console.log(this.state.data);
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
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
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
    render() {
        const { Meta } = Card;
        return (
        <div>
              <Row gutter={16}>
                <Col span={8}>
                  <Card bordered={false} extra={<DatabaseOutlined/>} title="Databases">
                    <span> DBs by user: {this.state.data.userDBs}</span>
                    <span> DBs : {this.state.data.allDBs}</span>
                      <Space wrap>
                        <Progress type="circle" percent={30} size={80} />
                        <Progress type="circle" percent={70} size={80} />
                        <Progress type="circle" percent={100} size={80} />
                      </Space>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Metrics" bordered={false} extra={<BarChartOutlined/>}>
                    <span> Metrics by user: {this.state.data.userMetrics}</span>
                    <span> Metrics : {this.state.data.allMetrics}</span>
                      <Space wrap>
                        <Progress type="circle" percent={30} size={80} />
                        <Progress type="circle" percent={70} size={80} />
                        <Progress type="circle" percent={100} size={80} />
                      </Space>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Queries" bordered={false} extra={<MonitorOutlined/>}>
                    <span> Queries by user: {this.state.data.userQueries}</span>
                    <span> Queries : {this.state.data.allQueries}</span>
                      <Space wrap>
                        <Progress type="circle" percent={30} size={80} />
                        <Progress type="circle" percent={70} size={80} />
                        <Progress type="circle" percent={100} size={80} />
                      </Space>
                  </Card>
                </Col>
              </Row>
                     <div>
                        <BulkImportForm />
                     </div>
        </div>
        )
    }
}

export default HomeComponent2
