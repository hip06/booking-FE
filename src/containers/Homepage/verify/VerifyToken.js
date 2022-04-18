import React, { Component } from 'react';
import { connect } from "react-redux";
import queryString from 'query-string';
import { push } from 'connected-react-router'
import swal from 'sweetalert';

import { verifyEmailService } from '../../../services/userServices'



class VerifyToken extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isVerifying: true,
            errMessage: null
        }
    }
    verifyEmail = async () => {
        let parsed = queryString.parse(window.location.search);
        // console.log(parsed);
        let result = await verifyEmailService(parsed)
        // console.log(result);
        this.setState({
            isVerifying: false,
            errMessage: result.data.message
        })
    }
    backToHome = () => {
        let parsed = queryString.parse(window.location.search);
        this.props.negative(`/bookingcare/doctor-profile/${parsed.doctorId}`)
    }

    render() {
        this.verifyEmail()
        return (
            <div style={{ display: 'flex', height: '100vh', textAlign: 'center', fontSize: '20px' }} className="verify-container">
                <div style={{ margin: 'auto' }}>
                    {this.state.isVerifying ? 'Waiting for verifying...' : this.state.errMessage}
                    <div style={{ color: 'blue', cursor: 'pointer' }} onClick={() => this.backToHome()}>Back home</div>
                </div>
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
        negative: (path) => dispatch(push(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyToken);
