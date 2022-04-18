import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss'

import { getUsers, createUser, updateUser, deleteUser } from '../../services/userServices'

import Modal from './Modal';
import { result } from 'lodash';

class UserManage extends Component {

    state = {
        users: [],
        idUser: '',
        isShowModal: false,
        isModalEdit: false,
        currentUser: ''
    }

    async componentDidMount() {
        await this.getDataUsers()
    }
    getDataUsers = async () => {
        let user = await getUsers('ALL')
        // console.log(user);
        this.setState({
            users: user.data.user,
        })
    }

    handleEditUser = async (user) => {
        let result = await updateUser(user)
        if (result.data.errCode !== 0) {
            alert(result.data.message)
        } else {
            this.handleToggleModalEdit()
            await this.getDataUsers()
        }


    }
    handleToggleModalCreate = () => {
        this.setState({
            isShowModal: !this.state.isShowModal,
            // isModalEdit: !this.state.isModalEdit
        })
    }
    handleToggleModalEdit = () => {
        this.setState({
            isModalEdit: !this.state.isModalEdit
        })
    }
    handleCreateUser = async (dataUser) => {
        let result = await createUser(dataUser)
        if (result.data.errCode !== 0) {
            alert(result.data.message)
        } else {
            this.handleToggleModalCreate()
            await this.getDataUsers()
        }
    }
    handleShowModalPayloadEdit = (item) => {
        this.setState({
            currentUser: item
        })
        this.handleToggleModalEdit()
    }
    handleDeleteUser = async (user) => {
        let result = await deleteUser(user)
        if (result.data.errCode !== 0) {
            alert(result.data.message)
        } else {
            await this.getDataUsers()
        }
    }
    render() {
        // console.log(this.state.currentUser);
        let { users, errMess, errCode } = this.state
        return (
            <div className="container-page">
                <h1 className='text-center p-5'>Magage users</h1>
                <button onClick={() => { this.handleToggleModalCreate() }} className='btn btn-primary px-2'>Create user</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Email</th>
                            <th scope="col">Full name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phonenumber</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Role</th>
                            <th scope="col">Created date</th>
                            <th scope="col">Update date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 &&
                            this.state.users.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.email}</td>
                                        <td>{item.firstName + ' ' + item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.gender == '1' ? 'Male' : item.gender == '0' ? 'Female' : 'Null'}</td>
                                        <td>{item.roleId == '1' ? 'Admin' : item.roleId == '2' ? 'Doctor' : item.roleId == '3' ? 'Patient' : 'Null'}</td>
                                        <td>{item.createdAt}</td>
                                        <td>{item.updatedAt}</td>
                                        <td className="button">
                                            <button type='button' onClick={() => { this.handleShowModalPayloadEdit(item) }} className='button btn-edit'>Edit</button>
                                            <button type='button' onClick={() => this.handleDeleteUser(item)} className='button btn-delete'>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {this.state.isShowModal && <Modal
                    dataEdit={{ currentUser: this.state.currentUser, isModalEdit: this.state.isModalEdit }}
                    handleCreateUser={this.handleCreateUser}
                    handleToggleModal={this.handleToggleModalCreate}
                />}
                {this.state.isModalEdit && <Modal
                    dataEdit={{ currentUser: this.state.currentUser, isModalEdit: this.state.isModalEdit }}
                    handleEditUser={this.handleEditUser}
                    handleToggleModal={this.handleToggleModalEdit}
                />}

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
