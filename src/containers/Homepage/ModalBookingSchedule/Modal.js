import React from "react";
import { connect } from "react-redux";
import './modal.scss'
import swal from "sweetalert";
import { upsertBooking } from '../../../services/userServices'
import * as actions from '../../../store/actions'
import { withRouter } from "react-router";
import AwesomeComponent from "../../../utils/Loading";

class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: null,
            phone: null,
            email: null,
            address: null,
            bookingFor: null,
            gender: null,
            reason: null,
            item: null,
            currentDay: null,
            isLoading: false
        }
    }
    componentDidMount() {
        if (this.props.item && this.props.item.doctorId) {
            this.props.getDetailsInforDoctor(this.props.item.doctorId)
            this.props.dataDoctorMarkdown(this.props.item.doctorId)
        }
        this.setState({
            ...this.state,
            item: this.props.item,
            currentDay: this.props.currentDay
        }, () => console.log(this.state.currentDay))
    }

    handleChangeInput = (event, id) => {
        this.setState({
            [id]: event.target.value
        })
    }
    validate = (validatedFields) => {
        let checkValidate = null
        for (let i = 0; i < validatedFields.length; i++) {
            if (!this.state[validatedFields[i]]) {
                checkValidate = validatedFields[i]
                break
            }
        }
        return checkValidate
    }
    handleSubmit = async () => {
        let validatedFields = ['fullName', 'phone', 'email', 'address', 'bookingFor', 'gender', 'reason',]
        let resultValidate = this.validate(validatedFields)
        if (!resultValidate) {
            let payload = {
                email: this.state.email,
                address: this.state.address,
                phoneNumber: this.state.phone,
                fullName: this.state.fullName,
                doctorId: this.props.detailsInforDoctor.id,
                doctorName: this.props.detailsInforDoctor.firstName + ' ' + this.props.detailsInforDoctor.lastName,
                date: this.state.currentDay,
                timeType: this.state.item.Allcode.valueVI,
                reason: this.state.reason
            }
            // console.log(payload);
            this.setState({
                isLoading: true
            })
            let result = await upsertBooking(payload)
            // console.log(result);
            if (result && result.data.errCode === 0) {
                this.setState({
                    fullName: null,
                    phone: null,
                    email: null,
                    address: null,
                    bookingFor: null,
                    gender: null,
                    reason: null,
                    isLoading: false
                })
                swal('Done!', `Pls check your email to confirm the booking...`, 'success')
                this.props.handleToggle(false, 'modal')
            } else {
                swal('Ops!', `${result.data.message}`, 'warning')
            }
        } else {
            swal('Ops!', `Missing something...[${resultValidate}]`, 'warning')
        }

    }

    render() {
        let { detailsInforDoctor, detailsInforDoctorBonus } = this.props
        // console.log(this.props);
        let { item, currentDay } = this.state
        let srcAvatar = detailsInforDoctor ? new Buffer(detailsInforDoctor.image, 'base64').toString('binary') : null

        // console.log(this.props.detailsInforDoctor)
        return (
            <>
                {detailsInforDoctor && detailsInforDoctorBonus && <div onClick={() => { this.props.handleToggle(false, 'modal') }} className="container-modal">
                    <div onClick={(event) => {
                        event.stopPropagation()
                        this.props.handleToggle(true, 'modal')
                    }}
                        className="box-modal">
                        <div className="header-modal">
                            <b>Thông tin đặt lịch khám bệnh</b>
                        </div>
                        <div onClick={(event) => {
                            event.stopPropagation()
                            this.props.handleToggle(false, 'modal')
                        }} className="close">X</div>
                        <div className="section-info">
                            <div className="avatar">
                                <img src={srcAvatar} alt="avatar" />
                            </div>
                            <div className="content-info">
                                <div className="booking">
                                    <h4>Đặt lịch khám</h4>

                                    <p>{item && item.Allcode && `${item.Allcode.valueVI} - ${currentDay}`}</p>
                                </div>
                                <div className="info-doctor">
                                    <b>{detailsInforDoctor.positionData.valueVI + ' - ' + detailsInforDoctor.firstName + ' ' + detailsInforDoctor.lastName}</b>
                                    <div dangerouslySetInnerHTML={{ __html: detailsInforDoctor.Markdown.introduction }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="body-modal">
                            <b>Giá khám: <span style={{ color: 'red' }}>{`${this.props.formatVnd(detailsInforDoctorBonus.responseDoctorInfor.price.valueVI)} vnđ`}</span></b>
                            <div className="row my-3">
                                <div className="col-6">
                                    <label htmlFor="">Họ và tên</label>
                                    <input value={this.state.fullName} type="text" className="form-control"
                                        onChange={event => this.handleChangeInput(event, 'fullName')} />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Số điện thoại</label>
                                    <input value={this.state.phone} type="text" className="form-control"
                                        onChange={event => this.handleChangeInput(event, 'phone')} />
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-6">
                                    <label htmlFor="">Email</label>
                                    <input value={this.state.email} type="email" className="form-control"
                                        onChange={event => this.handleChangeInput(event, 'email')} />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Địa chỉ liên hệ</label>
                                    <input value={this.state.address} type="text" className="form-control"
                                        onChange={event => this.handleChangeInput(event, 'address')} />
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-6">
                                    <label htmlFor="">Đặt cho ai</label>
                                    <input value={this.state.bookingFor} type="email" className="form-control"
                                        onChange={event => this.handleChangeInput(event, 'bookingFor')} />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Giới tính</label>
                                    <input value={this.state.gender} type="text" className="form-control"
                                        onChange={event => this.handleChangeInput(event, 'gender')} />
                                </div>
                            </div>
                            <div className="my-3">
                                <label htmlFor="">Lý do khám</label>
                                <textarea value={this.state.reason} className="col-12 form-control"
                                    onChange={event => this.handleChangeInput(event, 'reason')}></textarea>
                            </div>
                            <div className="buttons-submit">
                                <button onClick={() => this.handleSubmit()} className="btns">Xác nhận</button>
                                <button onClick={(event) => {
                                    event.stopPropagation()
                                    this.props.handleToggle(false, 'modal')
                                }} className="btns">Hủy bỏ</button>
                            </div>
                        </div>
                    </div>
                </div>}
                {this.state.isLoading && <AwesomeComponent />}
            </>
        )
    }

}
const mapStateToProps = (state) => {
    return ({
        detailsInforDoctor: state.doctor.detailsInforDoctor.data,
        detailsInforDoctorBonus: state.doctor.markdownDoctor.data,

    })
}
const mapDispatchToProps = (dispatch) => {
    return ({
        getDetailsInforDoctor: (id) => dispatch(actions.getDetailsInforDoctor(id)),
        dataDoctorMarkdown: (id) => dispatch(actions.dataDoctorMarkdown(id)),

    })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal))