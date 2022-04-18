import React, { Component } from 'react';
import { connect } from "react-redux";
import { push } from 'connected-react-router'
import swal from 'sweetalert';
import HeaderSub from '../HeaderSub/HeaderSub'
import * as actions from '../../../store/actions'
import './specialtyDetail.scss'
import BoxDoctor from '../boxDoctor/BoxDoctor';
import Footer from '../Footer/Footer';
import AwesomeComponent from '../../../utils/Loading';





class SpecialtyDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullDataSpecialtyFromRedux: null,
            isShowDetail: false


        }
    }
    componentDidMount() {
        this.props.getDataSpecialty()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.specialtyData !== this.props.specialtyData) {
            this.setState({
                fullDataSpecialtyFromRedux: this.props.specialtyData.responseData
            })
        }

    }
    getDataSpecialtyById = () => {
        let id = this.props.match.params.id
        let { fullDataSpecialtyFromRedux } = this.state
        let data
        if (fullDataSpecialtyFromRedux) {
            data = fullDataSpecialtyFromRedux.filter(item => item.id === +id)
        }
        return data
    }
    handleToggleDetail = () => {
        this.setState({
            isShowDetail: !this.state.isShowDetail
        })
    }

    render() {
        let dataSpecialtyById = this.getDataSpecialtyById()
        // console.log(dataSpecialtyById);
        // console.log(this.props.match.params.id);

        return (
            <div className="detail-specialty-container">
                <HeaderSub />
                {!dataSpecialtyById
                    ? <AwesomeComponent />
                    : <>
                        <div className="content-specialty">
                            {dataSpecialtyById && <div className={!this.state.isShowDetail ? 'wrap-top-specialty actived-hiden-l' : 'wrap-top-specialty'} >
                                <div className="img">
                                    <img src={new Buffer(dataSpecialtyById[0].image, 'base64').toString('binary')} alt="" />
                                    <div className="gradient-color"></div>
                                </div>
                                <div className={!this.state.isShowDetail ? 'description-specialty actived-hiden-s' : 'description-specialty'}>
                                    <h3>{dataSpecialtyById[0].name}</h3>
                                    <div className="desc-specialty pt-3" dangerouslySetInnerHTML={{ __html: dataSpecialtyById[0].descriptionHTML }}></div>
                                </div>
                                <div onClick={() => this.handleToggleDetail()} className="toggle">{!this.state.isShowDetail ? 'Đọc thêm' : 'Ẩn bớt'}</div>
                            </div>}

                        </div>
                        <div className="box-doctors">
                            <div className="item-box">
                                <BoxDoctor type={'specialty'} sortByProvince={true} />
                            </div>
                        </div>
                        <Footer />
                    </>
                }

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        specialtyData: state.app.specialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // negative: (path) => dispatch(push(path))
        getDataSpecialty: () => dispatch(actions.getDataSpecialty())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail);
