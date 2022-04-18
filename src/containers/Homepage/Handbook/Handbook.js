import React from "react";
import './handbook.scss'
import { connect } from 'react-redux'
import { push } from "connected-react-router";
import { getDataHandbook } from '../../../services/userServices'

import Slider from "react-slick";


let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
};


class Handbook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHandbook: null

        }
    }
    async componentDidMount() {
        let response = await getDataHandbook("ALL")
        // console.log(response);
        if (response && response.data.errCode === 0) {
            this.setState({
                dataHandbook: response.data.response
            })
        }
    }
    componentDidUpdate(prevProps) {
        // if (prevProps.clinics !== this.props.clinics) {
        //     this.setState({
        //         listClinic: this.props.clinics ? this.props.clinics.responseData : null
        //     })
        // }
    }
    handleShowDetailHanbook = (item) => {
        // console.log(item);
        this.props.navigate(`/bookingcare/handbook-detail/${item.id}`)

    }

    render() {
        let { dataHandbook } = this.state
        // console.log(dataHandbook);

        return (
            <div className="handbook-container">
                <div className="title-slick">Cẩm nang</div>
                <Slider {...settings}>
                    {dataHandbook && dataHandbook.length > 0 && dataHandbook.map((item, index) => {
                        return (
                            <div key={index} className="slick-item" onClick={() => this.handleShowDetailHanbook(item)}>
                                <div className="img">
                                    <div className="box-info">
                                        <img src={new Buffer(item.image, 'base64').toString('binary')} alt="" />
                                    </div>
                                    <div className="name-clinic"><b>{item.title}</b></div>
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

    }
};

const mapDispatchToProps = dispatch => {

    return {
        navigate: (path) => dispatch(push(path)),

        // getDetailsInforDoctor: (id) => dispatch(actions.getDetailsInforDoctor(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Handbook)