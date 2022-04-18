import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { languages } from '../../utils';
import { FormattedMessage } from 'react-intl'

import { roleUser } from '../../utils/constant'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: '',
            menu: ''
        }
    }
    componentDidMount() {
        if (this.props.userInfo && this.props.userInfo.roleId === roleUser.ADMIN) {
            this.setState({
                menu: adminMenu
            })
        }
        if (this.props.userInfo && this.props.userInfo.roleId === roleUser.DOCTOR) {
            this.setState({
                menu: doctorMenu
            })
        }
    }


    handleChangeLang = (language) => {
        this.props.changeLanguages(language)
    }

    render() {

        const { processLogout, language, userInfo } = this.props;
        // console.log(userInfo);
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={userInfo && userInfo.roleId === roleUser.ADMIN ? adminMenu : doctorMenu} />
                </div>

                <div className="language">
                    <div className="welcome-user"><FormattedMessage id={"menu.welcome"} />, {userInfo && userInfo.firstName} !</div>
                    <span className={language === languages.VI ? 'active' : ''} onClick={() => { this.handleChangeLang(languages.VI) }} >VI</span>
                    <div className="line"></div>
                    <span className={language === languages.EN ? 'active' : ''} onClick={() => { this.handleChangeLang(languages.EN) }}>EN</span>
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

                {/* nút logout */}

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfoExeptionImage,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguages: (language) => { dispatch(actions.changeLanguages(language)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
