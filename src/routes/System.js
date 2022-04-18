import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import ReduxManage from '../containers/System/ReduxManage';
import Header from '../containers/Header/Header';
import DoctorManage from '../containers/System/DoctorManage';
import ScheduleDoctor from '../containers/System/ScheduleDoctor';
import SpecialtyManage from '../containers/System/SpecialtyManage';
import ClinicManage from '../containers/System/ClinicManage';
import BookingManage from '../containers/System/BookingManage';
import HandbookManage from '../containers/System/handbookManage/HandbookManage';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                {this.props.isLoggedIn && <Header />}
                <div className="system-list">
                    <Switch>
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/user-manage-redux" component={ReduxManage} />
                        <Route path="/system/doctor-manage" component={DoctorManage} />
                        <Route path="/system/manage-schedule-doctor" component={ScheduleDoctor} />
                        <Route path="/system/specialty-manage" component={SpecialtyManage} />
                        <Route path="/system/clinic-manage" component={ClinicManage} />
                        <Route path="/system/booking-manage" component={BookingManage} />
                        <Route path="/system/handbook-manage" component={HandbookManage} />
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
