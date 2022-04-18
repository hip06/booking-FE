import React, { Component } from 'react';
import { connect } from 'react-redux';
import './bookingManage.scss'
import 'react-markdown-editor-lite/lib/index.css';
import swal from 'sweetalert';
import _ from 'lodash';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { updateBookingAndSendRemadyService, deleteCompletedBooking } from '../../services/doctorServices'
import ModalSendConfirmed from '../Homepage/ModalBookingSchedule/ModalSendConfirmed';
import * as actions from '../../store/actions'
import AwesomeComponent from '../../utils/Loading';
import { push } from 'connected-react-router';





class BookingManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            doctorId: JSON.parse(JSON.parse(localStorage.getItem('persist:user')).userInfoExeptionImage) ? JSON.parse(JSON.parse(localStorage.getItem('persist:user')).userInfoExeptionImage).id : null,
            formatedDate: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
            listBooking: [],
            isShowModal: false,
            email: null,
            selectedPatient: null,
            loading: false

        }
    }
    async componentDidMount() {
        let formatedDate = `${this.state.date.getDate()}/${this.state.date.getMonth() + 1}/${this.state.date.getFullYear()}`
        let myData = JSON.parse(JSON.parse(localStorage.getItem('persist:user')).userInfoExeptionImage)
        if (myData) {
            await this.props.getAllBookingByDoctorId({ id: myData.id, date: formatedDate })
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.listBooking !== this.props.listBooking) {
            this.setState({
                listBooking: this.props.listBooking
            })
        }
    }
    handleDateChange = (value) => {
        let myData = JSON.parse(JSON.parse(localStorage.getItem('persist:user')).userInfoExeptionImage)
        let formatedDate = `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`
        this.setState({
            date: value,
            formatedDate: formatedDate
        }, async () => {
            await this.props.getAllBookingByDoctorId({ id: myData.id, date: this.state.formatedDate })
        })
    }
    handleToggle = (signal, event, data) => {
        if (event) {
            event.stopPropagation()
        }
        this.setState({
            isShowModal: signal,
        })
        if (data && data.User) {
            this.setState({
                email: data.User.email,
                selectedPatient: data
            })
        }
    }
    handleConfirm = async (dataFromModal) => {
        let { selectedPatient } = this.state
        let data = {
            ...dataFromModal,
            ...selectedPatient
        }
        this.setState({
            loading: true
        })
        if (data && data.User) {
            let response = await updateBookingAndSendRemadyService({
                doctorId: data.doctorId,
                patientId: data.patientId,
                token: data.token,
                email: data.emailModal,
                imgbase64: data.imgbase64,
                fullName: data.User.firstName,
                timeType: data.timeType,
                date: data.date
            })
            // console.log(response);
            if (response && response.data.errCode === 0) {
                swal('Done!', 'Email has been sent successfully', 'success')
                this.refresh()
                this.setState({
                    isShowModal: false,
                    loading: false
                })
            } else {
                swal('Ops!', 'Email has been sent failly', 'error')
            }

        } else {
            swal('Ops!', 'Email has been sent failly', 'error')
        }
    }
    refresh = async () => {
        await this.props.getAllBookingByDoctorId({ id: this.state.doctorId, date: this.state.formatedDate })
        this.setState({
            listBooking: this.props.listBooking
        })
    }
    handleDelete = async (data) => {
        let response
        if (data && data.token) {
            response = await deleteCompletedBooking(data.token)
        }
        if (response && response.data.errCode === 0) {
            this.refresh()
            swal('Done!', 'Delete OK', 'success')
        } else {
            swal('Ops!', 'Sonething was wrong. try again', 'error')
        }

    }

    render() {
        // console.log(this.state);
        let { listBooking } = this.state

        return (
            <>
                <div className='booking-manage-container'>
                    <h3 className='text-center my-5'>DANH SÁCH CUỘC HẸN KHÁM BỆNH</h3>

                    <div className="row">
                        <div className="col-4">
                            <label htmlFor="">Chọn ngày khám: </label>
                            <DatePicker
                                selected={this.state.date}
                                className='form-control'
                                dateFormat={'dd/MM/yyyy'}
                                minDate={new Date()}
                                onChange={this.handleDateChange} //only when value has changedssss
                            />
                        </div>
                        <button style={{ marginTop: '20px' }} onClick={() => this.refresh()} type='button' className='btn btn-primary px-3 col-1'>Refresh</button>
                    </div>
                    <table className="table my-5">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Họ và tên</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Địa chỉ liên hệ</th>
                                <th scope="col">Lý do khám</th>
                                <th scope="col">Giờ khám</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listBooking && listBooking.length > 0 ? '' : 'No data'}
                            {listBooking && listBooking.length > 0 && listBooking.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index}</th>
                                        <td>{item.User.firstName}</td>
                                        <td>{item.User.email}</td>
                                        <td>{item.User.phoneNumber}</td>
                                        <td>{item.User.address}</td>
                                        <td>{item.reason}</td>
                                        <td>{item.timeType}</td>
                                        <td>{`${item.status.valueVI} `} {item.statusId === 'S2' || item.statusId === 'S3' ? <i style={{ color: 'green' }} className="fas fa-check-circle"></i> : ''}</td>
                                        <td>
                                            {item.statusId === 'S2'
                                                ? <button onClick={(event) => this.handleToggle(true, event, item)} type='button' className='btn btn-success px-3'>Chấp nhận lịch khám</button>
                                                : item.statusId === 'S3'
                                                    ? <div className="">Đã xong !<button type='button' onClick={() => this.handleDelete(item)} className='btn btn-danger px-3 mx-3'>Delete</button></div>
                                                    : <p style={{ color: 'blue', margin: '0' }}>Đang chờ bệnh nhân xác nhận...</p>}
                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <div onClick={() => this.props.negative('/homepage')} style={{ cursor: 'pointer', color: 'blue' }} >Tới trang chính</div>
                </div>
                {this.state.isShowModal && <ModalSendConfirmed
                    handleToggle={this.handleToggle}
                    email={this.state.email}
                    handleConfirm={this.handleConfirm}
                />}
                {this.state.loading && <AwesomeComponent />}
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listBooking: state.app.listBooking,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllBookingByDoctorId: (data) => dispatch(actions.updateStatusVerify(data)),
        negative: (path) => dispatch(push(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingManage);
