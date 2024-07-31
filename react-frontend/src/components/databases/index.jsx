import React, { useEffect, useState } from 'react'
import DatabaseService from '../../services/DatabaseService'
import { Modal, Switch } from 'antd';
import { ExclamationCircleFilled} from '@ant-design/icons';
import DatabaseModal from './modal';
import TableComponent from '../table';
import RenderTextInTable from '../table/RenderTextInTable';
import RenderActionInTable from '../table/RenderActionInTable';
import CustomAddAndDeleteButton from '../button/CustomAddAndDeleteBtn';

const ListDatabaseComponent = () => {
    const { confirm } = Modal;
    const [state, setState] = useState({
        databases: [],
        // selectedRows: [],
        refresh: false,
        isOpenConfirmModal: false,
        isDatabaseModalOpen: false,
        editable: false,
        databaseSelected: null
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
            title: 'Link',
            dataIndex: 'link',
            ellipsis: true,
            render: (_, record) => <RenderTextInTable data={record.link}/>
        },
        {
            title: 'Hostname',
            dataIndex: 'hostName',
            width: 100,
            render: (_, record) => <RenderTextInTable data={record.hostName}/>
        },
        {
            title: 'Service code',
            dataIndex: 'serviceCode',
            width: 170,
            render: (_, record) => <RenderTextInTable data={record.serviceCode}/>
        },
        {
            title: 'Labels',
            dataIndex: 'label',
            width: 180,
            render: (_, record) => {
                return record?.label?.split('\\n').map((line, index) => (
                    <div key={index}>{line}</div>
                ))
            }
        },
        {
            title: 'Keep connect', 
            dataIndex: 'keepConnect',
            width: 90,
            render: (_, record) => {
                return (
                    <Switch 
                        checkedChildren="ON" 
                        unCheckedChildren="OFF" 
                        value={record?.keepConnect === "true" ? true : false}
                        onClick={() => {
                            const value = {...record, keepConnect: record.keepConnect === "true" ? false : true}
                            handleUpdateDatabase(value, record.id);
                        }}
                    />
                )
            }
        },
        {
            title: 'Auto Commit',
            dataIndex: 'autoCommit',
            width: 90,
            render: (_, record) => {
                return (
                    <Switch 
                        checkedChildren="ON" 
                        unCheckedChildren="OFF" 
                        value={record?.autoCommit === "true" ? true : false}
                        onClick={() => {
                            const value = {...record, autoCommit: record.autoCommit === "true" ? false : true}
                            handleUpdateDatabase(value, record.id);
                        }}
                    />
                )
            }
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

    const handleUpdateDatabase = async (value, databaseId) => {
        await DatabaseService.updateDatabase(value, databaseId, localStorage.getItem('token'))
        setState({
            ...state, 
            refresh: !state.refresh,
        });
    }

    const deleteDatabase = async (id) => {
        const promiseArr = new Array();
        if (id) {
            await DatabaseService.deleteDatabase(id,localStorage.getItem('token'));
        } else {
            for (let i = 0; i < selectedRows.length; i++) {
                promiseArr.push(DatabaseService.deleteDatabase(selectedRows[i] ,localStorage.getItem('token')));
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
            isDatabaseModalOpen: true,
            databaseSelected: id,
            editable: false
        });
    }

    const handleClickAddAndEdit = (id) => {
        setState({
            ...state,
            isDatabaseModalOpen: true,
            databaseSelected: id,
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
          title: 'Are you sure delete this databases?',
          icon: <ExclamationCircleFilled />,
          okText: 'Confirm',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteDatabase(id);
          },
          onCancel() {
            setState({...state, isOpenConfirmModal: false});
          },
        });
    };

    useEffect(() => {
        DatabaseService.getDatabases(localStorage.getItem('token')).then((res) => {
            setState({...state, databases: res.data});
        })
        setSelectedRows([]);
    }, [state.refresh])

    return (
        <>
            <DatabaseModal 
                databasesState={state}
                setDatabasesState={setState}
            />
            <CustomAddAndDeleteButton 
                handleClickAddAndEdit={handleClickAddAndEdit}
                handleClickDelete={handleClickDelete}
                addType="Database"
                selectedRows={selectedRows}
            />
            <TableComponent 
                columns={columns}
                data={state.databases}
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
            />
        </>
    )
}

export default ListDatabaseComponent;
