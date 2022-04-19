import React from "react";
import './homepage.scss'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import actionTypes from '../../store/actions/actionTypes';

import Header from "./Header-Banner/Header";
import Specialty from "./Slider/Specialty";
import Doctors from "./Slider/Doctors";
import Footer from "./Footer/Footer";
import Clinic from "./Clinic/Clinic";
import Handbook from "./Handbook/Handbook";
import HeaderDetail from "./HeaderDetail/HeaderDetail";
import NotSupportThisScreen from "./NotSupportThisScreen";
import { withRouter } from "react-router";

class Homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowHeaderDetial: false,
            titleHeader: null,
            srcIframe: '',

        }
    }
    componentDidMount() {
        this.setState({
            srcIframe: 'https://www.youtube.com/embed/FyDQljKtWnI'
        })

        // window.location.reload()
    }
    handleClickHeaderItem = (event, signal) => {
        event.stopPropagation()

        this.setState({
            isShowHeaderDetial: signal,
            titleHeader: event.target.innerHTML
        })
    }



    render() {
        let options = [
            { icon: 'fas fa-hospital', text: <FormattedMessage id={"header.specializedExamination"} /> },
            { icon: "fas fa-mobile-alt", text: <FormattedMessage id={"header.specializedExamination"} /> },
            { icon: "fas fa-book", text: <FormattedMessage id={"header.remoteExamination"} /> },
            { icon: "fas fa-hospital", text: <FormattedMessage id={"header.medicalTest"} /> },
            { icon: "fas fa-hospital", text: <FormattedMessage id={"header.mentalHealth"} /> },
            { icon: 'fas fa-hospital', text: <FormattedMessage id={"header.dentalExamination"} /> },
            { icon: 'fas fa-hospital', text: <FormattedMessage id={"header.surgeryPack"} /> },
            { icon: 'fas fa-hospital', text: <FormattedMessage id={"header.medicalProduct"} /> },
        ]
        // console.log('check', document.getElementsByClassName('iframe')[0].contentWindow);
        // console.log(window.screen.width);
        // console.log(this.state.isSupport);

        return (
            <>
                <div className="homepage-container">
                    <div className="header"><Header handleClickHeaderItem={this.handleClickHeaderItem} /></div>
                    <div className="banner">
                        <div className="banner-content">
                            <h1 className="title"><span><FormattedMessage id={"header.medicalBackground"} /></span> <br /><FormattedMessage id={"header.comprehensiveHealthCare"} /></h1>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder='Tìm chuyên khoa' />
                            </div>
                            <div className="menu-options">
                                {options.map((item, index) => {
                                    return (
                                        <div key={index} className="options">
                                            <div className='icon-option'>
                                                <i className={item.icon}></i>
                                            </div>
                                            <span>{item.text}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="section specialty mt-5"><Specialty /></div>
                    <div className="section doctor-section"><Doctors /></div>
                    <div className="section clinic"><Clinic /></div>
                    <div className="section handbook"><Handbook /></div>
                    <div className="section media">
                        <div className="title-media">Truyền thông nói về BookingCare</div>
                        <div className="row box-media">
                            <div className="video">
                                <iframe
                                    className="iframe"
                                    about="blank"
                                    width="560"
                                    height="315"
                                    src={this.state.srcIframe}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen />
                            </div>
                            <div className="list-logo col-6">
                                <div className="logo-media"></div>
                                <div className="logo-media"></div>
                                <div className="logo-media"></div>
                                <div className="logo-media"></div>
                                <div className="logo-media">
                                    <div className="vtc"></div>
                                </div>
                                <div className="logo-media"></div>
                                <div className="logo-media"></div>

                            </div>
                        </div>
                    </div>
                    <div className="footer"><Footer /></div>
                </div>
                {this.state.isShowHeaderDetial && <HeaderDetail handleClickHeaderItem={this.handleClickHeaderItem} titleHeader={this.state.titleHeader} />}
                <div className="not-support"><NotSupportThisScreen /></div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allUser: state.admin.data
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // fireChangeLanguage: (language) => { dispatch({ type: actionTypes.CHANGELANGUAGE, language }) }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Homepage));