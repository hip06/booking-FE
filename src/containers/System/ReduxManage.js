import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './reduxManage.scss'
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import swal from 'sweetalert';
import GetBase64 from '../../utils/getBase64'
class ReduxManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genders: [],
            positions: [],
            roles: [],
            previewAvatar: '',
            isEdit: false,
            infoUser: {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                roleId: '',
                positionId: '',
                gender: '',
                image: ''
            },
            toggleRe_Render: false,
            errMessage: '',
            isEdieAvatar: false

        }
    }

    async componentDidMount() {
        await this.props.getGenders()
        await this.props.getPositions()
        await this.props.getRoles()
        await this.props.readAllUser()
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.positions !== prevProps.positions) {
            this.setState({
                ...this.state,
                positions: this.props.positions,
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                ...this.state,
                genders: this.props.genders
            })
        }
        if (this.props.roles !== prevProps.roles) {
            this.setState({
                ...this.state,
                roles: this.props.roles
            })
        }
        if (this.state.positions.length > 0 && this.state.infoUser.positionId === '') {
            // console.log(this.state.positions[this.state.positions.length - 1]);
            this.setState({
                infoUser: {
                    ...this.state.infoUser,
                    positionId: this.state.positions[this.state.positions.length - 1].keyMap
                }
            })
        }
        if (this.state.genders.length > 0 && this.state.infoUser.gender === '') {
            this.setState({
                infoUser: {
                    ...this.state.infoUser,
                    gender: this.state.genders[this.state.genders.length - 1].keyMap
                }
            })
        }
        if (this.state.roles.length > 0 && this.state.infoUser.roleId === '') {
            this.setState({
                infoUser: {
                    ...this.state.infoUser,
                    roleId: this.state.roles[this.state.roles.length - 1].keyMap
                }
            })
        }
        if (prevProps.allUsers !== this.props.allUsers) {
            this.setState({
                toggleRe_Render: !this.state.toggleRe_Render
            })
        }
        if (prevProps.errMessage !== this.props.errMessage) {
            this.setState({
                errMessage: this.props.errMessage,
            })
            if (this.state.errMessage === '') {
                this.setState({
                    infoUser: {
                        email: '',
                        password: '',
                        firstName: '',
                        lastName: '',
                        address: '',
                        phoneNumber: '',
                        roleId: '',
                        positionId: '',
                        gender: '',
                        image: ''
                    }
                })
            }
        }
        // if (prevState.genders)
    }
    handleLoadingFiles = async (event) => {
        let linkFiles = URL.createObjectURL(event.target.files[0])
        let imgBase64 = await GetBase64.toBase64(event.target.files[0]) // convert file to base64 - sever side: convert base64 to BLOB


        this.setState({
            isEdieAvatar: true,
            previewAvatar: linkFiles,
            infoUser: {
                ...this.state.infoUser,
                image: imgBase64
            }
        })
        linkFiles = []
    }
    handleDeleteAvatar = () => {
        this.setState({
            previewAvatar: '',
            infoUser: {
                ...this.state.infoUser,
                image: ''
            }
        })

    }
    handleCreateNewUser = async () => {
        let check = this.validateInput()
        // console.log(check);
        //call dispatch redux
        if (check.isValidated) {
            // console.log('dsdsdssd', this.state.infoUser);
            await this.props.createNewUser(this.state.infoUser)
            // this.handleErrMessage()
            if (this.state.errMessage === '') {
                await this.props.readAllUser()
                swal('Done!', 'Creat new user OK', 'success')

                this.setState({
                    previewAvatar: '',
                    infoUser: {
                        email: '',
                        password: '',
                        firstName: '',
                        lastName: '',
                        address: '',
                        phoneNumber: '',
                        roleId: '',
                        positionId: '',
                        gender: '',
                        image: ''
                    }
                })
            }
        } else {
            if (check.fieldInvalid === '') {
                swal('Error!', 'Email not right!', 'error')
            } else {
                swal('Ops!', check.fieldInvalid + ' missing', 'warning')

            }
        }

    }
    handleOnChangeInput = (event, id) => {
        this.setState({
            errMessage: '',
            infoUser: {
                ...this.state.infoUser,
                [id]: event.target.value,
                // image: this.state.previewAvatar
            }
        })
    }
    validateInput = () => {
        let isValidated = true
        let checkEmail
        let fieldInvalid = ''
        let checkFields = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber']
        let infoUserSubmited = this.state.infoUser
        for (let i = 0; i < checkFields.length; i++) {
            if (infoUserSubmited[checkFields[i]] === '') {
                fieldInvalid = checkFields[i]
                isValidated = false
                break
            }
        }
        // if (isValidated) {
        //     let checkSelect = ['gender', 'positionId', 'roleId']
        //     for (let i = 0; i < checkSelect.length; i++) {
        //         if (infoUserSubmited[checkSelect[i]] === 'R0' || 'C' || 'P5') {
        //             fieldInvalid = 'Select'
        //             isValidated = false
        //             break
        //         }
        //     }
        // }

        if (isValidated) {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            checkEmail = re.test(infoUserSubmited['email'])
            isValidated = checkEmail ? true : false
        }
        return { isValidated, fieldInvalid, checkEmail }

    }
    handleDeleteUser = async (email) => {
        await this.props.deleteUser(email)
        // this.handleErrMessage()
        if (this.state.errMessage === '') {
            swal('Done!', 'Delete user OK!', 'success')
        }
    }
    handleShowInfoEditedUser = async (dataUser) => {
        // console.log('item', dataUser, 'state', this.state);
        let { genders, positions, roles } = this.state
        let editedGender = genders.filter((item) => item.keyMap === dataUser.gender)
        let editedPositon = positions.filter((item) => item.keyMap === dataUser.positionId)
        let editedRole = roles.filter((item) => item.keyMap === dataUser.roleId)
        // console.log(editedGender);
        let base64ToImg = ''
        //typeof dataUser.image: BLOB
        if (dataUser.image) {
            base64ToImg = new Buffer(dataUser.image, 'base64').toString('binary') //convert BLOB to base64
        }

        this.setState({
            genders: editedGender,
            positions: editedPositon,
            roles: editedRole,
            errMessage: '',
            isEdit: true,
            previewAvatar: base64ToImg,
            infoUser: {
                email: dataUser.email,
                password: dataUser.password,
                firstName: dataUser.firstName,
                lastName: dataUser.lastName,
                address: dataUser.address,
                phoneNumber: dataUser.phoneNumber,
                positionId: editedPositon[0].keyMap,
                gender: editedGender[0].keyMap,
                roleId: editedRole[0].keyMap,
                image: base64ToImg
            }
        })

    }
    handleEdit = async () => {
        // console.log('from handleedit', this.state.infoUser);
        await this.props.editUser(this.state.infoUser)
        if (this.state.errMessage === '') {
            this.setState({
                genders: this.props.genders,
                positions: this.props.positions,
                roles: this.props.roles,
                isEdit: false,
                previewAvatar: '',
                infoUser: {
                    email: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    phoneNumber: '',
                    roleId: '',
                    positionId: '',
                    gender: '',
                    image: ''
                }
            })
            swal('Done!', 'Update user OK!', 'success')
        } else {
            swal('Error!', this.props.errMessage, 'error')
        }

        // this.handleErrMessage()

    }
    handleBackEdit = () => {
        this.setState({
            genders: this.props.genders,
            positions: this.props.positions,
            roles: this.props.roles,
            errMessage: '',
            isEdit: false,
            previewAvatar: '',
            infoUser: {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                roleId: '',
                positionId: '',
                gender: '',
                image: ''
            }
        })
    }
    handleErrMessage = () => {
        this.setState({
            errMessage: this.props.errMessage
        })
    }
    handleBackSelect = () => {
        let { genders, positions, roles } = this.props
        let gender = this.state.genders
        let position = this.state.positions
        let role = this.state.roles
        let editedGender = genders.filter((item) => item.keyMap !== gender[0].keyMap)
        let editedPositon = positions.filter((item) => item.keyMap !== position[0].keyMap)
        let editedRole = roles.filter((item) => item.keyMap !== role[0].keyMap)
        // console.log(gender);
        this.setState({
            genders: [...gender, ...editedGender].length > genders.length ? this.state.genders : [...gender, ...editedGender],
            positions: [...position, ...editedPositon].length > positions.length ? this.state.positions : [...position, ...editedPositon],
            roles: [...role, ...editedRole].length > genders.length ? this.state.roles : [...role, ...editedRole]
        })
    }
    render() {
        // console.log(this.state.infoUser);
        let { genders, positions, roles, previewAvatar, errMessage } = this.state
        let { allUsers } = this.props
        // console.log(this.props.data);
        // console.log(allUsers);
        // console.log(this.state);
        return (
            <div className="container-redux-manage" >
                <h1>User Manage with REDUX</h1>
                <form className='wrap-form'>
                    <div className="row">
                        <div className="form-group col-6">
                            <label htmlFor="">Email</label>
                            <input type="email" readOnly={this.state.isEdit} value={this.state.infoUser.email} onChange={event => this.handleOnChangeInput(event, 'email')} className='form-control' />
                        </div>
                        <div className="form-group col-6" hidden={this.state.isEdit}>
                            <label htmlFor="">Mật khẩu</label>
                            <input type="password" value={this.state.infoUser.password} onChange={event => this.handleOnChangeInput(event, 'password')} className='form-control' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <label htmlFor="">Họ</label>
                            <input type="text" value={this.state.infoUser.firstName} onChange={event => this.handleOnChangeInput(event, 'firstName')} className='form-control' />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="">Tên</label>
                            <input type="text" value={this.state.infoUser.lastName} onChange={event => this.handleOnChangeInput(event, 'lastName')} className='form-control' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="">Address</label>
                            <input type="text" value={this.state.infoUser.address} onChange={event => this.handleOnChangeInput(event, 'address')} className='form-control' />
                        </div>
                        <div className="col-6">
                            <label htmlFor="">Phone</label>
                            <input type="text" value={this.state.infoUser.phoneNumber} onChange={event => this.handleOnChangeInput(event, 'phoneNumber')} className='form-control' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="">Giới tính</label>
                            <select className='form-select' value={this.state.infoUser.gender} onFocus={() => { this.handleBackSelect() }} onChange={event => this.handleOnChangeInput(event, 'gender')} >
                                {genders && genders.length > 0 && genders.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap} >{item.valueVI}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Chức danh</label>
                            <select className='form-select' value={this.state.infoUser.positionId} onFocus={() => { this.handleBackSelect() }} onChange={event => this.handleOnChangeInput(event, 'positionId')} >
                                {positions && positions.length > 0 && positions.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap} >{item.valueVI}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Vai trò</label>
                            <select className='form-select' value={this.state.infoUser.roleId} onFocus={() => { this.handleBackSelect() }} onChange={event => this.handleOnChangeInput(event, 'roleId')} >
                                {roles && roles.length > 0 && roles.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap} >{item.valueVI}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Avatar</label>
                            <div className="input-file">
                                <label htmlFor="avatar" className='btn-loadfile'>Browser</label>
                                <div hidden={!previewAvatar} className="preview-avatar">
                                    <a target='_blank' href={previewAvatar}><img src={previewAvatar} alt="" /></a>
                                    <button type='button' onClick={() => { this.handleDeleteAvatar() }} className='btn btn-danger'>Delete</button>
                                </div>
                                <input type="file" id="avatar" hidden onChange={(event) => { this.handleLoadingFiles(event) }} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3"><button type='button' onClick={() => { this.state.isEdit ? this.handleEdit() : this.handleCreateNewUser() }} className='btn btn-primary px-3'>{this.state.isEdit ? 'Update' : 'Create new'}</button></div>
                    </div>
                    {!(errMessage === '') && <div className="row error-message px-2">{`Error: ${errMessage}`}</div>}
                </form>
                <div className="wrap-table mx-5">
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
                                <th scope="col">Position</th>
                                <th scope="col">Created date</th>
                                <th scope="col">Update date</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers && allUsers.length > 0 &&
                                allUsers.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.email}</td>
                                            <td>{item.firstName + ' ' + item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.gender == 'M' ? 'Male' : item.gender == 'F' ? 'Female' : 'Other'}</td>
                                            <td>{item.roleId == 'R1' ? 'Admin' : item.roleId == 'R2' ? 'Doctor' : item.roleId == 'R3' ? 'Patient' : 'Null'}</td>
                                            <td>{item.positionId == 'P0' ? 'None' : item.positionId == 'P1' ? 'Master' : item.positionId == 'P2' ? 'Doctor' : item.positionId == 'P3' ? 'Ass Professor' : 'Professor'}</td>
                                            <td>{item.createdAt}</td>
                                            <td>{item.updatedAt}</td>
                                            <td className="button">
                                                <button type='button' onClick={() => { this.state.isEdit ? this.handleBackEdit() : this.handleShowInfoEditedUser(item) }} className='btn btn-success mx-3 px-3'>{this.state.isEdit ? 'Turnback' : 'Edit'}</button>
                                                <button type='button' onClick={() => { this.handleDeleteUser(item.email) }} className='btn btn-danger mx-3 px-3'>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        genders: state.admin.genders,
        positions: state.admin.positions,
        roles: state.admin.roles,
        errMessage: state.admin.errMessage,
        allUsers: state.admin.data.user,
        data: state.admin.data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.getGendersStart()),
        getPositions: () => dispatch(actions.getPositionsStart()),
        getRoles: () => dispatch(actions.getRolesStart()),
        createNewUser: infoUser => dispatch(actions.createNewUserStart(infoUser)),
        readAllUser: () => dispatch(actions.readAllUserStart()),
        deleteUser: (email) => dispatch(actions.deleteUserStart(email)),
        editUser: (dataEditedUser) => dispatch(actions.editUserStart(dataEditedUser))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxManage);
