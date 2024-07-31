import React, { useEffect, useState } from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Flex, Modal } from 'antd';
import { useHistory } from "react-router-dom";
import TableComponent from '../table';
import UserModal from './modal';
import RenderTextInTable from '../table/RenderTextInTable';
import RendertTagInTable from '../table/RenderTagInTable';
import RenderActionInTable from '../table/RenderActionInTable';
import { deleteUser, getUsers } from '../../services/UserService';

const ListUserComponent = () => {
    const { confirm } = Modal;
    const history = useHistory();   
    const [state, setState] = useState({
        users: [],
        selectedRows: [],
        refresh: false,
        isOpenConfirmModal: false,
        isUserModalOpen: false,
        editable: false,
        userSelected: null
    })

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            width: 120,
            showSorterTooltip: {
              target: 'full-header',
            },
            sorter: (a, b) => a.username.length - b.username.length,
            render: (_, record) => <RenderTextInTable data={record.username}/>
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
            width: 150,
            showSorterTooltip: {
              target: 'full-header',
            },
            sorter: (a, b) => a.fullName.length - b.fullName.length,
            render: (_, record) => <RenderTextInTable data={record.fullName}/>
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber',
            width: 130,
            render: (_, record) => <RenderTextInTable data={record.phoneNumber}/>
        },
        {
            title: 'Address',
            dataIndex: 'address',
            elellipsis: true,
            render: (_, record) => <RenderTextInTable data={record.address}/>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (_, record) => <RenderTextInTable data={record.email}/>
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            render: (_, { roles }) => <RendertTagInTable data={roles}/>
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

    const showDeleteConfirm = (id) => {
        confirm({
          open: state.isOpenConfirmModal,
          title: 'Are you sure delete this account?',
          icon: <ExclamationCircleFilled />,
          okText: 'Confirm',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            handleDeleteUser(id);
          },
          onCancel() {
            setState({...state, isOpenConfirmModal: false});
          },
        });
    };

    const handleClickDelete = (id) => {
        setState({...state, isOpenConfirmModal: true});
        showDeleteConfirm(id);
    }

    
    const handleClickAddAndEdit = (id) => {
        setState({
            ...state,
            isUserModalOpen: true,
            userSelected: id,
            editable: true
        })
    }

    const handleClickView = (id) => {
        setState({
            ...state,
            isUserModalOpen: true,
            userSelected: id,
            editable: false
        })
    }
    
    const handleDeleteUser = async (id) => {
        const promiseArr = new Array();
        if (id) {
            await deleteUser(id, localStorage.getItem('token'));
        } else {
            for (let i = 0; i < state.selectedRows.length; i++) {
                promiseArr.push(deleteUser(state.selectedRows[i] ,localStorage.getItem('token')));
            }
            await Promise.all(promiseArr);
        }
        setState({
            ...state, 
            refresh: !state.refresh,
            selectedRows: []
        });
    }

    useEffect(() => {
        getUsers(localStorage.getItem('token')).then((res) => {
            setState({ ...state, users: res.data});
        }).catch(error => {
            if (error.response.status === 403) {
                history.push("/not-authorized");
            }
        });
    }, [state.refresh])

    return (
        <div>
            <UserModal 
                usersState={state}
                setUsersState={setState}
            />
            <Flex justify='space-between' align='center'>
                <button className="btn btn-primary mb-2" onClick={() => handleClickAddAndEdit()}> Add User</button>
                {state.selectedRows.length > 0 &&
                    <Button danger className="mb-2" onClick={() => handleClickDelete()}>
                        Delete
                    </Button>
                }
            </Flex>
            <TableComponent 
                columns={columns}
                data={state.users}
                state={state}
                setState={setState}
            />
        </div>
    )
}

export default ListUserComponent;
