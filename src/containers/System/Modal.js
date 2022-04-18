import React from "react";
import './modal.scss'
class Modal extends React.Component {
    state = {
        isShowModal: true,
        infoUser: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: ''
        }
    }
    handleOnChangeInput = (e, id) => {
        this.setState({
            infoUser: {
                ...this.state.infoUser, [id]: e.target.value
            }
        })
    }

    handleCreateNewUser = () => {
        let checkValidate = this.handleValidateFE()
        if (checkValidate.length !== 0) {
            alert('Missing some inputs: ' + checkValidate)
        } else {
            this.props.handleCreateUser(this.state.infoUser)
            this.setState({
                infoUser: {
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    phoneNumber: '',
                    gender: '',
                    roleId: ''
                }
            })
        }
    }
    handleEditUser = () => {
        let checkValidate = this.handleValidateFE()
        // console.log(checkValidate);
        checkValidate.splice(checkValidate.indexOf('password'), 1)
        checkValidate.splice(checkValidate.indexOf('email'), 1)

        if (checkValidate.length !== 0) {
            alert('Missing some inputs: ' + checkValidate)
        } else {
            this.props.handleEditUser({ ...this.state.infoUser, email: this.props.dataEdit.currentUser.email })
        }
    }
    handleValidateFE = () => {
        let inputFields = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'roleId']
        let missingInputFields = []
        for (let i = 0; i < inputFields.length; ++i) {
            if (!this.state.infoUser[inputFields[i]]) {
                missingInputFields.push(inputFields[i])
            }
        }
        // console.log(missingInputFields);
        if (missingInputFields) {
            return missingInputFields
        }
    }

    render() {

        // console.log(this.state.infoUser);


        return (
            <div className="container-modal" onClick={() => { this.props.handleToggleModal() }} >
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2 className="title-modal justify-content-center">{this.props.dataEdit.isModalEdit ? "Edit user's info" : 'Create new user'}</h2>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input type="email"
                                    readOnly={this.props.dataEdit.isModalEdit}
                                    value={!this.props.dataEdit.isModalEdit ? this.state.infoUser.email : this.props.dataEdit.currentUser.email}
                                    onChange={(e) => { this.handleOnChangeInput(e, 'email') }}
                                    className="form-control"
                                    placeholder="Email"
                                />
                            </div>
                            <div hidden={this.props.dataEdit.isModalEdit} className="form-group col-md-6">
                                <label>Password</label>
                                <input type="password" value={this.state.infoUser.password} onChange={(e) => { this.handleOnChangeInput(e, 'password') }} className="form-control" placeholder="Password" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>First name</label>
                                <input type="text" value={this.state.infoUser.firstName} onChange={(e) => { this.handleOnChangeInput(e, 'firstName') }} className="form-control" placeholder="First name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Last name</label>
                                <input type="text" value={this.state.infoUser.lastName} onChange={(e) => { this.handleOnChangeInput(e, 'lastName') }} className="form-control" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress">Address</label>
                            <input type="text" value={this.state.infoUser.address} onChange={(e) => { this.handleOnChangeInput(e, 'address') }} className="form-control" id="inputAddress" placeholder="1234 Main St" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="inputAddress">Phone</label>
                                <input type="text" value={this.state.infoUser.phoneNumber} onChange={(e) => { this.handleOnChangeInput(e, 'phoneNumber') }} className="form-control" id="inputAddress" placeholder="Phone number" />
                            </div>
                            <div className="form-group col-md-4">
                                <label>Gender</label>
                                <select onChange={(e) => { this.handleOnChangeInput(e, 'gender') }} className="form-control">
                                    <option selected={true}>---Gender---</option>
                                    <option value="1" >Male</option>
                                    <option value="0">Female</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label>Role</label>
                                <select onChange={(e) => { this.handleOnChangeInput(e, 'roleId') }} className="form-control">
                                    <option selected={true}>---Role---</option>
                                    <option value="1" >Admin</option>
                                    <option value="3">Patient</option>
                                    <option value="2">Doctor</option>
                                </select>
                            </div>
                        </div>
                        <button type="button"
                            onClick={() => { this.props.dataEdit.isModalEdit ? this.handleEditUser() : this.handleCreateNewUser() }}
                            className="btn btn-primary px-4">
                            {this.props.dataEdit.isModalEdit ? "Update" : 'Sign in'}
                        </button>
                        <button onClick={() => this.props.handleToggleModal()} type="button" className="btn btn-warning px-4 mx-5">Turn back</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Modal