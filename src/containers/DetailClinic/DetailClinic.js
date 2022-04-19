import React from "react";
import './detailClinic.scss'
import { connect } from 'react-redux'
import { push } from "connected-react-router";
import HeaderSub from "../Homepage/HeaderSub/HeaderSub";
import * as actions from '../../store/actions'
import Footer from '../Homepage/Footer/Footer'
import BoxDoctorByClinic from "../Homepage/boxDoctor/BoxDoctorByClinic";
import BoxDoctor from "../Homepage/boxDoctor/BoxDoctor";
import AwesomeComponent from "../../utils/Loading";






class DetailClinic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            dataThisClinic: null,

        }
    }
    componentDidMount() {
        this.props.readClinics(this.props.match.params.id)

    }
    componentDidUpdate(prevProps) {
        if (prevProps.clinics !== this.props.clinics) {
            this.setState({
                dataThisClinic: this.props.clinics.responseData
            })
        }
    }


    render() {
        let { dataThisClinic } = this.state

        // console.log(this.state);
        // console.log(this.props.clinics.responseData);

        return (
            <div className="clinic-detail-container">
                <HeaderSub />
                {dataThisClinic
                    ? <>
                        <div className="content-clinic-big">
                            <div className="top-section">
                                <div className="background"><img src={new Buffer(dataThisClinic.image, 'base64').toString('binary')} alt="backgroung clinic" /></div>
                                <div className="name">
                                    <div className="name-left">
                                        <div className="avatar-clinic"><img src="https://e7.pngegg.com/pngimages/127/557/png-clipart-hospital-computer-icons-health-care-medicine-hospital-logo-medicine.png" alt="logo-clinic" /></div>
                                        <div className="detail">
                                            <h4>{dataThisClinic.name}</h4>
                                            <p><i className="fas fa-map-marker-alt"></i>{dataThisClinic.address}</p>
                                        </div></div>
                                    <button className="booking btn btn-warning px-5">Đặt lịch</button>
                                </div>
                            </div>
                            <div className="middle"></div>
                            <div className="content-section">
                                <div className="box-one">
                                    <i className="fas fa-lightbulb"></i>
                                    <p>BookingCare là Nền tảng Y tế Chăm sóc sức khỏe toàn diện kết nối người dùng với dịch vụ y tế -
                                        chăm sóc sức khỏe hiệu quả, tin cậy với trên 100 bệnh viện, phòng khám uy tín, hơn 600 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ y tế chất lượng cao.</p>
                                </div>
                                <div className="box-two">
                                    <p>
                                        {`Từ nay, người bệnh có thể đặt khám ${dataThisClinic.name} thông qua hệ thống đặt khám BookingCare.`}
                                    </p>
                                    <ul>
                                        <li>Được lựa chọn khám với các bác sĩ chuyên khoa giàu kinh nghiệm</li>
                                        <li>Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt lịch)</li>
                                        <li>Giảm thiểu thời gian chờ đợi xếp hàng làm thủ tục khám</li>
                                        <li>Nhận được hướng dẫn đi khám chi tiết sau khi đặt lịch</li>
                                    </ul>
                                </div>
                                <div className="boxs-doctor">
                                    <BoxDoctor type={'clinic'} sortByProvince={false} />
                                </div>
                                <div className="desc-clinic" dangerouslySetInnerHTML={{ __html: dataThisClinic.descriptionHTML }}></div>
                            </div>
                        </div>
                        <Footer />
                    </>
                    : <AwesomeComponent />}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        clinics: state.app.clinic

    }
};

const mapDispatchToProps = dispatch => {

    return {
        // navigate: (path) => dispatch(push(path)),
        readClinics: (id) => dispatch(actions.getdataClinics(id)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic)