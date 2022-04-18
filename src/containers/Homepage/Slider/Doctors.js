import React from "react";
import './doctor.scss'
import { connect } from 'react-redux'
import { push } from "connected-react-router";
import * as actions from '../../../store/actions'

import Slider from "react-slick";


let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
};


class Doctors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: '',
        }
    }
    async componentDidMount() {
        await this.props.readDoctorStart()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.allUsers !== this.props.allUsers) {
            this.setState({
                listDoctor: this.props.allUsers
            })
            //     let tempArr = this.props.allUsers
            //     if (tempArr && tempArr.length > 0) {
            //         for (let i = 0; i < tempArr.length; i++) {
            //             tempArr[i].image = new Buffer(tempArr[i].image, 'base64').toString('binary')
            //         }
            //         this.setState({
            //             listDoctor: tempArr
            //         })
            //     }
        }
    }
    handleShowDetailDoctor = (dataDoctor) => {
        this.redirectToOtherPage(`/bookingcare/doctor-profile/${dataDoctor.id}`)
    }
    redirectToOtherPage = (redirectPath) => {
        const { navigate } = this.props;
        navigate(`${redirectPath}`);
    }
    render() {
        let { listDoctor } = this.state
        // console.log(listDoctor, 'check list doctor');
        return (
            <div className="doctor-container">
                <div className="title-slick">Bác sĩ nối bật trong tuần</div>
                <Slider {...settings}>
                    {listDoctor && listDoctor.length > 0 && listDoctor.map((item, index) => {
                        return (
                            <div key={index} className="slick-item" onClick={() => this.handleShowDetailDoctor(item)}>
                                <div className="img">
                                    <div className="box-info">
                                        <img src={new Buffer(item.image, 'base64').toString('binary')} alt="" />
                                        <div className="name-doctor"><b>{`${item.firstName} ${item.lastName} - ${item.positionData.valueVI}`}</b></div>
                                        <div className="specialty">{`Khoa ${item.Spec.name}`}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        allUsers: state.admin.doctorData,
        detailsInforDoctor: state.doctor.detailsInforDoctor.data

    }
};

const mapDispatchToProps = dispatch => {

    return {
        navigate: (path) => dispatch(push(path)),
        readDoctorStart: () => dispatch(actions.readDoctorStart()),
        // getDetailsInforDoctor: (id) => dispatch(actions.getDetailsInforDoctor(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctors)