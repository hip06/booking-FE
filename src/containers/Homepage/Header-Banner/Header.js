import React from "react";
import './headertop.scss'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { languages } from "../../../utils";
import * as actions from '../../../store/actions'
import { push } from "connected-react-router";


class Headertop extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isDoctor: false,
            infoDoctor: null
        }
    }

    componentDidMount() {
        if (JSON.parse(JSON.parse(localStorage.getItem('persist:user')).userInfoExeptionImage)) {
            this.setState({
                infoDoctor: JSON.parse(JSON.parse(localStorage.getItem('persist:user')).userInfoExeptionImage)
            })
        }

    }
    handleChangeLang = (language) => {
        this.props.changeLanguages(language)

    }
    handleRedictLogin = () => {
        this.props.negative('/login')
    }

    render() {
        const { language } = this.props;

        return (
            <div className="headertop-container">
                <div className="headertop-items">
                    <div className="icon-menu px-2"><i className="fas fa-bars"></i></div>
                    <div className="box-logo">
                        <div className="logo"></div>
                        <div className="clone-by-me">
                            Clone by <span>hip06</span>
                        </div>
                    </div>
                </div>
                <div className="headertop-items">
                    <ul>
                        <li >
                            <b onClick={(event) => this.props.handleClickHeaderItem(event, true)}><FormattedMessage id={"header.specialty"} /></b>
                            <span>
                                <FormattedMessage id={"header.findDoctorBySpecialty"} />
                            </span>
                        </li>
                        <li><b onClick={(event) => this.props.handleClickHeaderItem(event, true)}><FormattedMessage id={"header.healthFacilities"} /></b><span><FormattedMessage id={"header.chooseHospitalClinic"} /></span></li>
                        <li><b onClick={(event) => this.props.handleClickHeaderItem(event, true)}><FormattedMessage id={"header.doctor"} /></b><span><FormattedMessage id={"header.chooseGoodDoctor"} /></span></li>
                        <li><a target="_blank" href="https://bookingcare.vn/#khamtongquat"><b><FormattedMessage id={"header.services"} /></b><span><FormattedMessage id={"header.generalHealthCheck"} /></span></a></li>
                    </ul>
                </div>
                <div className="headertop-items">
                    <a target="_blank" href="https://www.facebook.com/em.aichoc" className="help">
                        <div className="icon-help"><i className="fas fa-question-circle"></i><FormattedMessage id={"header.help"} /></div>
                        {/* <div className="language">
                            <span className={language === languages.VI ? 'active' : ''} onClick={() => { this.handleChangeLang(languages.VI) }} >VI</span>
                            <div className="line"></div>
                            <span className={language === languages.EN ? 'active' : ''} onClick={() => { this.handleChangeLang(languages.EN) }}>EN</span>
                        </div> */}

                    </a>
                    {!this.props.isLoggedIn
                        ? <div onClick={() => this.handleRedictLogin()} className="login-box"><span>Đăng nhập</span> (only for doctors)</div>
                        : this.state.infoDoctor && <div className="login-box"><div>
                            Xin chào bác sĩ <span>{this.state.infoDoctor.lastName} !</span>
                            <div onClick={() => this.props.negative('/system/booking-manage')} className="go-manage">Quản lý lịch khám của tôi</div>
                        </div></div>
                    }
                    {this.props.isLoggedIn && <div onClick={() => {
                        this.handleRedictLogin()
                        this.props.logout()
                    }} className="log-out-bookingcare"><i className="fas fa-sign-out-alt"></i></div>}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changeLanguages: (language) => { dispatch(actions.changeLanguages(language)) },
        negative: (path) => dispatch(push(path)),
        logout: () => dispatch(actions.processLogout())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Headertop);