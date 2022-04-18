import React from "react";
import './specialty.scss'
import * as actions from '../../../store/actions'
import Slider from "react-slick";
import { connect } from "react-redux";
import { push } from 'connected-react-router'

let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
};


class Specialty extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            specialtyData: null
        }
    }

    componentDidMount() {
        this.props.getDataSpecialty()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.specialtyData !== this.props.specialtyData && this.props.specialtyData.errCode === 0) {
            this.setState({
                specialtyData: this.props.specialtyData.responseData
            })
        }
    }
    handleRedirect = (item) => {
        this.props.negative(`/bookingcare/specialty-detail/${item.id}`)
    }

    render() {
        let { specialtyData } = this.state
        // console.log(specialtyData);

        return (
            <div className="spec-container">
                <div className="title-slick">Chuyên khoa phổ biến</div>
                <Slider {...settings}>
                    {specialtyData && specialtyData.length > 0 && specialtyData.map((item, index) => {
                        return (
                            <div key={index} onClick={() => this.handleRedirect(item)} className="slick-item">
                                <div className="img"><img src={new Buffer(item.image, 'base64').toString('binary')} alt="avatar specialty" /></div>
                                <small>{item.name}</small>
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
        specialtyData: state.app.specialty

    }
}
const mapDispatchToProps = dispatch => {
    return {
        negative: (path) => dispatch(push(path)),
        getDataSpecialty: () => dispatch(actions.getDataSpecialty())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Specialty)