import React, { useEffect, useState } from 'react'
import MetricService from '../../services/MetricService'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Flex, Modal } from 'antd';
import MetricModal from './modal';
import { metricFilterType } from '../../const';
import TableComponent from '../table';
import RenderTextInTable from '../table/RenderTextInTable';
import RenderActionInTable from '../table/RenderActionInTable';
import CustomAddAndDeleteButton from '../button/CustomAddAndDeleteBtn';

const ListMetricComponent = () => {
    const { confirm } = Modal;
    const [state, setState] = useState({
        metrics: [],
        // selectedRows: [],
        refresh: false,
        isOpenConfirmModal: false,
        isMetricModalOpen: false,
        editable: false,
        metricSelected: null
    })
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
            title: 'Type',
            dataIndex: 'type',
            width: 100,
            filters: metricFilterType,
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.labels.includes(value),
            render: (_, record) => <RenderTextInTable data={record.type}/>
        },
        {
            title: 'Description',
            dataIndex: 'description',
            ellipsis: true,
            render: (_, record) => <RenderTextInTable data={record.description}/>
        },
        {
            title: 'Labels',
            dataIndex: 'labels',
        },
        {
            title: 'Buckets',
            dataIndex: 'buckets',
            render: (_, record) => <RenderTextInTable data={record.buckets}/>
        },
        {
            title: 'States',
            dataIndex: 'states',
            render: (_, record) => <RenderTextInTable data={record.states}/>
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

    const deleteMetric = async (id) => {
        const promiseArr = new Array();
        if (id) {
            await MetricService.deleteMetric(id, localStorage.getItem('token'));
        } else {
            for (let i = 0; i < selectedRows.length; i++) {
                promiseArr.push(MetricService.deleteMetric(selectedRows[i] ,localStorage.getItem('token')));
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
            isMetricModalOpen: true,
            metricSelected: id,
            editable: false
        })
    }

    const handleClickAddAndEdit = (id) =>{
        setState({
            ...state,
            isMetricModalOpen: true,
            metricSelected: id,
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
          title: 'Are you sure delete this metric?',
          icon: <ExclamationCircleFilled />,
          okText: 'Confirm',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteMetric(id);
          },
          onCancel() {
            setState({...state, isOpenConfirmModal: false});
          },
        });
    };

    useEffect(() => {
        MetricService.getMetrics(localStorage.getItem('token')).then((res) => {
            setState({ ...state ,metrics: res.data});
        });
        setSelectedRows([]);
    }, [state.refresh])

    return (
        <>
            <MetricModal 
                metricsState={state}
                setMetricsState={setState}
            />
            <CustomAddAndDeleteButton 
                handleClickAddAndEdit={handleClickAddAndEdit}
                handleClickDelete={handleClickDelete}
                addType="Metric"
                selectedRows={selectedRows}
            />
            <TableComponent 
                columns={columns}
                data={state.metrics}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
            />
        </>
    )
}

export default ListMetricComponent
