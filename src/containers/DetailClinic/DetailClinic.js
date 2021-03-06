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
                                    <button className="booking btn btn-warning px-5">?????t l???ch</button>
                                </div>
                            </div>
                            <div className="middle"></div>
                            <div className="content-section">
                                <div className="box-one">
                                    <i className="fas fa-lightbulb"></i>
                                    <p>BookingCare l?? N???n t???ng Y t??? Ch??m s??c s???c kh???e to??n di???n k???t n???i ng?????i d??ng v???i d???ch v??? y t??? -
                                        ch??m s??c s???c kh???e hi???u qu???, tin c???y v???i tr??n 100 b???nh vi???n, ph??ng kh??m uy t??n, h??n 600 b??c s?? chuy??n khoa gi???i v?? h??ng ngh??n d???ch v??? y t??? ch???t l?????ng cao.</p>
                                </div>
                                <div className="box-two">
                                    <p>
                                        {`T??? nay, ng?????i b???nh c?? th??? ?????t kh??m ${dataThisClinic.name} th??ng qua h??? th???ng ?????t kh??m BookingCare.`}
                                    </p>
                                    <ul>
                                        <li>???????c l???a ch???n kh??m v???i c??c b??c s?? chuy??n khoa gi??u kinh nghi???m</li>
                                        <li>H??? tr??? ?????t kh??m tr???c tuy???n tr?????c khi ??i kh??m (mi???n ph?? ?????t l???ch)</li>
                                        <li>Gi???m thi???u th???i gian ch??? ?????i x???p h??ng l??m th??? t???c kh??m</li>
                                        <li>Nh???n ???????c h?????ng d???n ??i kh??m chi ti???t sau khi ?????t l???ch</li>
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