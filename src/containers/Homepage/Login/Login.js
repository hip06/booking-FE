import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../../store/actions";
import './login.scss';
import { FormattedMessage } from 'react-intl';
import { checkLogin } from '../../../services/userServices'
import { roleUser } from '../../../utils';




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isHiddenPassword: true
        }
    }

    handleChangeUsername = (newState) => {
        this.setState({
            email: newState
        })
    }
    handleChangePassword = (newState) => {
        this.setState({
            password: newState
        })
    }
    handleHiddenPass = () => {
        this.setState({
            isHiddenPassword: !this.state.isHiddenPassword
        })
    }
    handleLogin = async () => {
        let { email, password } = this.state
        let result = await checkLogin({ email, password })
        if (result && result.data.errCode === 0) {
            // console.log('check login', result.data.user);
            this.props.userLoginSuccess(result.data.user)
            if (result.data.user.roleId === roleUser.ADMIN) {
                this.redirectToSystemPage('/system/user-manage')
            }
            if (result.data.user.roleId === roleUser.DOCTOR) {
                this.redirectToSystemPage('/system/manage-schedule-doctor')
            } else {
                this.redirectToSystemPage('/homepage')
            }
        } else {
            this.props.userLoginFail()
        }
    }
    redirectToSystemPage = (redirectPath) => {
        const { navigate } = this.props;
        navigate(`${redirectPath}`);
    }
    render() {
        // console.log(this.props.isLoggedIn);

        return (
            <>
                <div className="login-wrapper">
                    <div className="login-content">
                        <form>
                            <h1 className='text-center'>Login</h1>
                            <div className="form-group mt-3">
                                <label htmlFor="">Email:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={(e) => { this.handleChangeUsername(e.target.value) }}
                                />
                            </div>
                            <div className="form-group mt-3 password">
                                <label htmlFor="">Password:</label>
                                <input
                                    type={this.state.isHiddenPassword ? 'password' : 'text'}
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={(e) => { this.handleChangePassword(e.target.value) }}
                                />
                                <span onClick={() => { this.handleHiddenPass() }}><i className={this.state.isHiddenPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i></span>
                            </div>
                            <button className='btn-login mt-4' type='button' onClick={() => { this.handleLogin() }} >Login</button>
                            <div className='forgot-pass mt-3'>Forgot your password?</div>
                            <div className="other-login text-center mt-3">Or sign in with:</div>
                            <div className="icon-society text-center">
                                <i className="icon-social fb fab fa-facebook-f"></i>
                                <i className="icon-social gg fab fa-google-plus-g"></i>
                            </div>
                            <div onClick={() => this.props.navigate('/homepage')} className='pass-login'>Bỏ qua đăng nhập</div>
                        </form>

                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
