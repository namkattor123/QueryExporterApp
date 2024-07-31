import { Col, Form, Input, Modal, Radio, Row, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { userRole } from "../../../const";
import { convertToSelectValue } from "../../../utils";
import { getUserById, registerUser, updateUser } from "../../../services/UserService";

const UserModal = (props) => { // usersState, setUsersState
    const [form] = Form.useForm();
    const [user, setUser] = useState();

    const {editable, userSelected, isUserModalOpen, refresh} = props?.usersState;
    const {usersState, setUsersState} = props;

    const handleOk = async (value) => {
        if (userSelected) {
            await updateUser(value, user?.id, localStorage.getItem('token'));
        } else {
            await registerUser(value, localStorage.getItem('token'));
        }
    }

    const handleClose = () => {
        setUsersState({
            ...usersState, 
            refresh: !refresh,
            userSelected: null,
            isUserModalOpen: false,
        })
        form.resetFields();
    }

    useEffect(() => {
        if (userSelected) {
            getUserById(userSelected, localStorage.getItem('token')).then( res => {
                setUser({...res.data});
                form.setFieldsValue({
                    username: res.data?.username,
                    password: res.data?.password,
                    fullName: res.data?.fullName,
                    phoneNumber: res.data?.phoneNumber,
                    address: res.data?.address,
                    email: res.data?.email,
                    roles: convertToSelectValue(res.data?.roles)
                })
            })
        }
    }, [userSelected])
    
    return (
        <Modal 
            title={editable
                ? userSelected ? "Edit User" : "Register New User"
                : "View User"}
            open={isUserModalOpen} 
            onOk={() => {
                form.validateFields()
                  .then(async (value) => {
                    await handleOk(value);
                    handleClose();
                });
            }} 
            onCancel={handleClose}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Row gutter={[16,0]}>
                    <Col span={12}>
                        <Form.Item 
                            label="User name:"
                            name="username"
                            rules={[
                                {
                                required: true,
                                message: "User name is required!",
                                }
                            ]}
                        >
                            <Input value={user?.username} disabled={!editable}/>
                        </Form.Item>
                    </Col>
                    {!userSelected &&  
                        <Col span={12}>
                            <Form.Item 
                                label="Password:"
                                name="password"
                                rules={[
                                    {
                                    required: true,
                                    message: "Password is required!",
                                    }
                                ]}
                            >
                                <Input value={user?.password}/>
                            </Form.Item>
                        </Col>
                    }
                    {userSelected &&  
                        <>
                            <Col span={12}>
                                <Form.Item 
                                    label="Email:"
                                    name="email"
                                    rules={[
                                        {
                                        required: true,
                                        message: "Email name is required!",
                                        }
                                    ]}
                                >
                                    <Input value={user?.email} disabled={!editable}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item 
                                    label="Full name:"
                                    name="fullName"
                                    rules={[
                                        {
                                        required: true,
                                        message: "Full name name is required!",
                                        }
                                    ]}
                                >
                                    <Input value={user?.fullName} disabled={!editable}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item 
                                    label="Phone number:"
                                    name="phoneNumber"
                                >
                                    <Input value={user?.phoneNumber} disabled={!editable}/>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item 
                                    label="Address:"
                                    name="address"
                                >
                                    <Input value={user?.address} disabled={!editable}/>
                                </Form.Item>
                            </Col>
                        </>
                    }
                    <Col span={24}>
                        <Form.Item 
                            label="Roles:"
                            name="roles"
                            rules={[
                                {
                                required: true,
                                message: "Roles is required!",
                                }
                            ]}
                        >
                            <Select 
                                onChange={(e) => setUser({...user, roles: e})}
                                placeholder="Roles"
                                value={user?.roles}
                                options={userRole}
                                disabled={!editable}
                                mode="multiple"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default UserModal;