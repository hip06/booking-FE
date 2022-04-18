import React, { Component } from 'react';
import { connect } from "react-redux";
import { push } from 'connected-react-router'
import swal from 'sweetalert';
import './headerDetail.scss'
import * as actions from '../../../store/actions'






class HeaderDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            specialtyData: this.props.specialtyData ? this.props.specialtyData.responseData : null,
            clincis: this.props.clincis ? this.props.clincis.responseData : null,
            titleHeader: null,
            currentItem: null
        }
    }
    componentDidMount() {
        switch (this.props.titleHeader) {
            case 'Chuyên khoa':
                this.setState({
                    titleHeader: this.props.titleHeader,
                    currentItem: this.props.specialtyData ? this.props.specialtyData.responseData : null,
                })
                break;
            case 'Cơ sở y tế':
                this.setState({
                    titleHeader: this.props.titleHeader,
                    currentItem: this.props.clinics ? this.props.clinics.responseData : null
                })
                break;
            case 'Bác sĩ':
                this.setState({
                    titleHeader: this.props.titleHeader,
                    currentItem: this.props.allUsers ? this.props.allUsers : null
                })
                break;
            default:
                break;
        }
    }
    // componentDidUpdate(prevProps) {
    //     if (prevProps.specialtyData !== this.props.specialtyData && this.props.specialtyData.errCode === 0) {
    //         this.setState({
    //             specialtyData: this.props.specialtyData.responseData
    //         })
    //     }
    //     if (prevProps.clinics !== this.props.clinics && this.props.clinics.errCode === 0) {
    //         this.setState({
    //             clinics: this.props.clinics.responseData
    //         })
    //     }
    // }
    handleRedirect = (item) => {
        // this.props.handleClickHeaderItem(false)
        switch (this.props.titleHeader) {
            case 'Chuyên khoa':
                this.props.negative(`/bookingcare/specialty-detail/${item.id}`)
                break;
            case 'Cơ sở y tế':
                this.props.negative(`/bookingcare/clinic-detail/${item.id}`)
                break;
            case 'Bác sĩ':
                this.props.negative(`/bookingcare/doctor-profile/${item.id}`)
                break;
            default:
                break;
        }

    }


    render() {
        let { currentItem } = this.state
        // console.log(currentItem);
        return (
            <div onClick={(event) => this.props.handleClickHeaderItem(event, false)} className="header-detail-container">
                <div onClick={(event) => this.props.handleClickHeaderItem(event, true)} className="box-item-header">
                    <div className="top-box-item">
                        {this.state.titleHeader}
                    </div>
                    <div className="wrap-box-item">
                        {currentItem && currentItem.length > 0 && currentItem.map((item, index) => {
                            return (
                                <div key={index} onClick={() => this.handleRedirect(item)} className="item-box">
                                    <div className="box-img">
                                        <img src={new Buffer(item.image, 'base64').toString('binary')} alt="" />
                                    </div>
                                    <b>{item.name || `${item.firstName} ${item.lastName}`}</b>
                                </div>
                            )
                        })}

                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        specialtyData: state.app.specialty,
        clinics: state.app.clinic,
        allUsers: state.admin.doctorData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        negative: (path) => dispatch(push(path)),
        // getDataSpecialty: () => dispatch(actions.getDataSpecialty())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderDetail);
