import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom'
import HomeComponent from './components/HomeComponent';
import HomeComponent2 from './components/HomeComponent2';
import ListMetricComponent from './components/ListMetricComponent';
import ListDatabaseComponent from './components/ListDatabaseComponent';
import ListQueryComponent from './components/ListQueryComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateQueryComponent from './components/CreateQueryComponent';
import CreateDatabaseComponent from './components/CreateDatabaseComponent';
import UpdateDatabaseComponent from './components/UpdateDatabaseComponent';
import UpdateMetricComponent from './components/UpdateMetricComponent';
import UpdateQueryComponent from './components/UpdateQueryComponent';
import ViewDatabaseComponent from './components/ViewDatabaseComponent';
import CreateMetricComponent from './components/CreateMetricComponent';
import ViewMetricComponent from './components/ViewMetricComponent';
import ViewQueryComponent from './components/ViewQueryComponent';
import RegistrationForm from './components/RegistrationForm';
import ListUserComponent from './components/ListUserComponent';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
import { useAuth } from '../src/AuthContext';
import { Layout, Menu, Button, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  MonitorOutlined,
  HomeOutlined,
  ExportOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
const { Header, Sider, Content } = Layout;
//function App() {
//  return (
//    <div>
//        <Router>
//              <HeaderComponent />
//                <div className="container">
//                    <Switch>
//                          <Route path="/login" component={Login} />
//                          <PrivateRoute path="/home" component={HomeComponent} />
//                          <PrivateRoute path="/metrics" component={ListMetricComponent} />
//                          <PrivateRoute path = "/queries" component = {ListQueryComponent} />
//                          <PrivateRoute path = "/" exact component = {HomeComponent}/>
//                          <PrivateRoute path = "/add-metric/:id" component = {CreateMetricComponent}/>
//                          <PrivateRoute path = "/databases" component = {ListDatabaseComponent}/>
//                          <PrivateRoute path = "/view-database/:id" component = {ViewDatabaseComponent}/>
//                          <PrivateRoute path = "/view-metric/:id" component = {ViewMetricComponent}/>
//                          <PrivateRoute path = "/view-query/:id" component = {ViewQueryComponent}/>
//                          <PrivateRoute path = "/add-database/:id" component = {CreateDatabaseComponent}/>
//                          <PrivateRoute path = "/add-query/:id" component = {CreateQueryComponent}/>
//                          <PrivateRoute path = "/update-database/:id" component = {UpdateDatabaseComponent}/>
//                          <PrivateRoute path = "/update-metric/:id" component = {UpdateMetricComponent}/>
//                          <PrivateRoute path = "/update-query/:id" component = {UpdateQueryComponent}/>
//                          <Route path = "/register" component = {RegistrationForm}/>
//                          <Redirect from="/" to="/login" />
//                          {/* <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}
//                    </Switch>
//                </div>
//        </Router>
//    </div>
//
//  );
//}
const onLogout = () => {
    console.log("on change")
    localStorage.removeItem('token');
    window.location.reload();
}
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
//  <Router>
    <Layout>
    <Router>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
            <button className="btn btn-outline-primary top-right-button" onClick={onLogout}>
               Logout <LogoutOutlined />
            </button>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
                    <Switch>
                          <Route path="/login" component={Login} />
                          <PrivateRoute path="/home" component={HomeComponent2} />
                          <PrivateRoute path="/export" component={HomeComponent} />
                          <PrivateRoute path="/user" component={ListUserComponent} />
                          <PrivateRoute path="/metrics" component={ListMetricComponent} />
                          <PrivateRoute path = "/queries" component = {ListQueryComponent} />
                          <PrivateRoute path = "/" exact component = {HomeComponent}/>
                          <PrivateRoute path = "/add-metric/:id" component = {CreateMetricComponent}/>
                          <PrivateRoute path = "/databases" component = {ListDatabaseComponent}/>
                          <PrivateRoute path = "/view-database/:id" component = {ViewDatabaseComponent}/>
                          <PrivateRoute path = "/view-metric/:id" component = {ViewMetricComponent}/>
                          <PrivateRoute path = "/view-query/:id" component = {ViewQueryComponent}/>
                          <PrivateRoute path = "/add-database/:id" component = {CreateDatabaseComponent}/>
                          <PrivateRoute path = "/add-query/:id" component = {CreateQueryComponent}/>
                          <PrivateRoute path = "/update-database/:id" component = {UpdateDatabaseComponent}/>
                          <PrivateRoute path = "/update-metric/:id" component = {UpdateMetricComponent}/>
                          <PrivateRoute path = "/update-query/:id" component = {UpdateQueryComponent}/>
                          <Route path = "/register" component = {RegistrationForm}/>
                          <Redirect from="/" to="/login" />
                          {/* <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}
                    </Switch>
        </Content>
      </Layout>
    </Router>
    </Layout>
//  </Router>
  );
};
export default App;
