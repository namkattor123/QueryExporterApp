import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import HomeComponent from './HomeComponent';
import HomeComponent2 from '../export';
import ListDatabaseComponent from '../databases';
import ListMetricComponent from '../metrics';
import ListQueryComponent from '../queries';
import SideBar from './SideBar';
import PrivateRoute from '../../routers/PrivateRoute';
import ListUserComponent from '../accounts';
import NotAuthorized from '../error403';
import CustomHeader from './CustomHeader';

const { Sider, Content } = Layout;

const DashBoard = () => {
    const [collapsed, setCollapsed] = useState(false);
    
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    
    return (
      <Layout>
        <Layout style={{height: '100vh'}}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <SideBar />
          </Sider>
          <Layout>
            <CustomHeader 
              collapsed={collapsed} 
              setCollapsed={setCollapsed}
              colorBgContainer={colorBgContainer}  
            />
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <PrivateRoute path="/home" component={HomeComponent2} />
              <PrivateRoute path="/export" component={HomeComponent} />
              <PrivateRoute path="/user" component={ListUserComponent} />
              <PrivateRoute path="/metrics" component={ListMetricComponent} />
              <PrivateRoute path = "/queries" component = {ListQueryComponent} />
              <PrivateRoute path = "/databases" component = {ListDatabaseComponent}/>
              <PrivateRoute path = "/users" component = {ListUserComponent}/>
              <PrivateRoute path="/not-authorized" component={NotAuthorized} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
}

export default DashBoard;