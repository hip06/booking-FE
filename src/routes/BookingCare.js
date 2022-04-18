import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import DoctorProfile from '../containers/Homepage/DoctorProfile/DoctorProfile';
import SpecialtyDetail from '../containers/Homepage/SpecialtyDetail/SpecialtyDetail';
import DetailClinic from '../containers/DetailClinic/DetailClinic';
import HandbookDetail from '../containers/Homepage/HandbookDetail/HandbookDetail';

class BookingCare extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="bookingcare-container">
                <div className="bookingcare-list">
                    <Switch>
                        <Route path="/bookingcare/doctor-profile/:id" component={DoctorProfile} />
                        <Route path="/bookingcare/specialty-detail/:id" component={SpecialtyDetail} />
                        <Route path="/bookingcare/clinic-detail/:id" component={DetailClinic} />
                        <Route path="/bookingcare/handbook-detail/:id" component={HandbookDetail} />

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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingCare);
