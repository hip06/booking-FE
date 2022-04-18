import React from "react";
import './clinic.scss'
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


class Clinic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listClinic: null

        }
    }
    async componentDidMount() {
        this.props.readClinics('ALL')
    }
    componentDidUpdate(prevProps) {
        if (prevProps.clinics !== this.props.clinics) {
            this.setState({
                listClinic: this.props.clinics ? this.props.clinics.responseData : null
            })
        }
    }
    handleShowDetailClinic = (item) => {
        this.props.navigate(`/bookingcare/clinic-detail/${item.id}`)

    }

    render() {
        let { listClinic } = this.state
        // console.log(listClinic);

        return (
            <div className="clinic-container">
                <div className="title-slick">Cơ sở y tế nổi bậc</div>
                <Slider {...settings}>
                    {listClinic && listClinic.length > 0 && listClinic.map((item, index) => {
                        return (
                            <div key={index} className="slick-item" onClick={() => this.handleShowDetailClinic(item)}>
                                <div className="img">
                                    <div className="box-info">
                                        <img src={new Buffer(item.image, 'base64').toString('binary')} alt="" />
                                    </div>
                                    <div className="name-clinic">{item.name}</div>
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
        clinics: state.app.clinic

    }
};

const mapDispatchToProps = dispatch => {

    return {
        navigate: (path) => dispatch(push(path)),
        readClinics: (id) => dispatch(actions.getdataClinics(id)),
        // getDetailsInforDoctor: (id) => dispatch(actions.getDetailsInforDoctor(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Clinic)