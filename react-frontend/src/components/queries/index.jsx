import React, { useEffect, useState } from 'react'
import QueryService from '../../services/QueryService'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import QueryModal from './modal';
import DatabaseService from '../../services/DatabaseService';
import MetricService from '../../services/MetricService';
import TableComponent from '../table';
import RenderTextInTable from '../table/RenderTextInTable';
import RenderActionInTable from '../table/RenderActionInTable';
import CustomAddAndDeleteButton from '../button/CustomAddAndDeleteBtn';

const ListQueryComponent = () => {
    const { confirm } = Modal;
    const [state, setState] = useState({
        queries: [],
        // selectedRows: [],
        refresh: false,
        isOpenConfirmModal: false,
        isQueryModalOpen: false,
        editable: false,
        querySelected: null
    })
    const [databaseList, setDatabaseList] = useState([]);
    const [metricList, setMetricList] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: 120,
            showSorterTooltip: {
              target: 'full-header',
            },
            sorter: (a, b) => a.name.length - b.name.length,
            render: (_, record) => <RenderTextInTable data={record.name}/>
        },
        {
            title: 'Interval',
            dataIndex: 'interval',
            render: (_, record) => <RenderTextInTable data={record.interval}/>
        },
        {
            title: 'Timeout',
            dataIndex: 'timeout',
            render: (_, record) => <RenderTextInTable data={record.timeout}/>
        },
        {
            title: 'Databases',
            dataIndex: 'databases',
            render: (_, record) => <RenderTextInTable data={record.databases}/>
        },
        {
            title: 'Metrics',
            dataIndex: 'metrics',
            render: (_, record) => <RenderTextInTable data={record.metrics}/>
        },
        {
            title: 'Expiration',
            dataIndex: 'expiration',
            width: 100,
            render: (_, record) => <RenderTextInTable data={record.expiration}/>
        },
        {
            title: "Action",
            dataIndex: "action",
            width: 120,
            render: (_, record) => 
                <RenderActionInTable
                    data={record}
                    handleClickDelete={handleClickDelete}
                    handleClickAddAndEdit={handleClickAddAndEdit}
                    handleClickView={handleClickView}
                />
        }
    ]

    const deleteQuery = async (id) => {
        const promiseArr = new Array();
        if (id) {
            await QueryService.deleteQuery(id, localStorage.getItem('token'));
        } else {
            for (let i = 0; i < selectedRows.length; i++) {
                promiseArr.push(QueryService.deleteQuery(selectedRows[i] ,localStorage.getItem('token')));
            }
            await Promise.all(promiseArr);
        }
        setState({
            ...state, 
            refresh: !state.refresh,
        });
    }
    const handleClickView = (id) => {
        setState({
            ...state,
            isQueryModalOpen: true,
            querySelected: id,
            editable: false
        })
    }

    const handleClickAddAndEdit = (id) =>{
        setState({
            ...state,
            isQueryModalOpen: true,
            querySelected: id,
            editable: true
        })
    }

    const handleClickDelete = (id) => {
        setState({...state, isOpenConfirmModal: true});
        showDeleteConfirm(id);
    }

    const showDeleteConfirm = (id) => {
        confirm({
          open: state.isOpenConfirmModal,
          title: 'Are you sure delete this query?',
          icon: <ExclamationCircleFilled />,
          okText: 'Confirm',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteQuery(id);
          },
          onCancel() {
            setState({...state, isOpenConfirmModal: false});
          },
        });
    };

    useEffect(() => {
        DatabaseService.getDatabases(localStorage.getItem('token')).then((res) => {
            setDatabaseList(res.data);
        });
        MetricService.getMetrics(localStorage.getItem('token')).then((res) => {
            setMetricList(res.data);
        });
    }, [])

    useEffect(() => {
        QueryService.getQueries(localStorage.getItem('token')).then((res) => {
            setState({ ...state ,queries: res.data});
        });
        setSelectedRows([]);
    }, [state.refresh])

    return (
        <>
            <QueryModal 
                queriesState={state}
                setQueriesState={setState}
                databaseList={databaseList}
                metricList={metricList}
            />
            <CustomAddAndDeleteButton 
                handleClickAddAndEdit={handleClickAddAndEdit}
                handleClickDelete={handleClickDelete}
                addType="Query"
                selectedRows={selectedRows}
            />
            <TableComponent 
                columns={columns}
                data={state.queries}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
            />
        </>
    )
}

export default ListQueryComponent
