import React, { Component } from 'react';
import { connect } from "react-redux";
import { push } from 'connected-react-router'
import swal from 'sweetalert';
import * as actions from '../../../store/actions'
import './boxDoctor.scss'
import { getDoctorBySpecialtyIdService, getScheduleDoctorService, getAllProvinceService } from '../../../services/doctorServices'
import { withRouter } from 'react-router';
import _ from 'lodash'
import Modal from '../ModalBookingSchedule/Modal';
import AwesomeComponent from '../../../utils/Loading';





class BoxDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataDoctorBySpecialty: null,
            currentDay: this.today().newDate, // dùng để check thời gian đã qua trong ngày
            isShowDetail: false,
            allProvince: null,
            dataDoctorByProvince: null,
            isShowModal: false,
            item: null,
            selectedDay: null

        }
    }
    async componentDidMount() {
        let dataDoctorBySpecialty = await getDoctorBySpecialtyIdService({ id: this.props.match.params.id, date: this.state.currentDay, type: this.props.type })
        if (dataDoctorBySpecialty && dataDoctorBySpecialty.data.errCode === 0) {
            this.setState({
                dataDoctorBySpecialty: dataDoctorBySpecialty.data.response,
                dataDoctorByProvince: dataDoctorBySpecialty.data.response
            })
        }
        let allProvince = await getAllProvinceService()
        // console.log(allProvince, 'chck');
        if (allProvince && allProvince.data.errCode === 0) {
            this.setState({
                allProvince: allProvince.data.typeCode,
            })
        }


    }
    componentDidUpdate(prevProps) {
    }
    today = (fromToday) => {
        let requiredDay = fromToday || 0
        let date = new Date()
        let day = date.getDay() + requiredDay
        let dayWord = ''
        switch (day % 7) {
            case 0:
                dayWord = 'Chủ Nhật'
                break
            case 1:
                dayWord = 'Thứ 2'
                break
            case 2:
                dayWord = 'Thứ 3'
                break
            case 3:
                dayWord = 'Thứ 4'
                break
            case 4:
                dayWord = 'Thứ 5'
                break
            case 5:
                dayWord = 'Thứ 6'
                break
            case 6:
                dayWord = 'Thứ 7'
                break
            default:
                break
        }
        dayWord = !fromToday || fromToday === 0 ? 'Hôm nay' : dayWord
        let newDate = `${date.getDate() + requiredDay}/${date.getMonth() + 1}/${date.getFullYear()}`
        let newFullDate = `${dayWord} - ${date.getDate() + requiredDay}/${date.getMonth() + 1}/${date.getFullYear()}`
        return { newDate, newFullDate }

    }
    handleCheckHourInDay = (schedule, currentDay) => {
        let currentHour = new Date().getHours()
        let arrTimeInDay = [{ id: 8, value: 'T1' }, { id: 9, value: 'T2' }, { id: 10, value: 'T3' }, { id: 11, value: 'T4' },
        { id: 13, value: 'T5' }, { id: 14, value: 'T6' }, { id: 15, value: 'T7' }, { id: 16, value: 'T8' }, { id: 17, value: 'T9' },
        { id: 18, value: 'T10' }, { id: 19, value: 'T11' }, { id: 20, value: 'T12' }]
        let startofTimeRange = arrTimeInDay.find(item => currentHour - item.id <= 0) //match timeType
        let foundElem = ''

        if (schedule) {
            foundElem = schedule.filter(item => item.timeType === startofTimeRange.value) //find element from schedule
        }
        foundElem = _.isEmpty(foundElem) ? [{ Allcode: startofTimeRange }] : foundElem

        //check isToday
        let isToday = this.today().newDate === currentDay ? true : false
        return [foundElem, isToday]
    }
    handleChangeSelect = async (event, item) => {
        let { dataDoctorBySpecialty } = this.state
        let response = await getScheduleDoctorService({ id: item.doctorId, date: event.target.value })
        // bác sĩ có lịch vào ngày đc chọn thì hiện ko thì = []
        if (response && response.data.errCode === 0) {
            dataDoctorBySpecialty.forEach(element => {
                if (element.doctorId === item.doctorId) {
                    element.timeSchedule = response.data.response
                    element.currentDay = event.target.value
                }
            })
            this.setState({
                dataDoctorBySpecialty: dataDoctorBySpecialty,
                selectedDay: event.target.value
                // currentDay: event.target.value
            })
        } else {
            dataDoctorBySpecialty.forEach(element => {
                if (element.doctorId === item.doctorId) {
                    element.timeSchedule = []
                }
            })
            this.setState({
                dataDoctorBySpecialty: dataDoctorBySpecialty,
                // currentDay: event.target.value
            })
        }
        // console.log('handle', dataDoctorBySpecialty);
    }
    formatVnd = (money) => {
        let formatedMoney = ''
        while (+money >= 1000) {
            let surplus = +money - (Math.floor(+money / 1000) * 1000)
            money = Math.floor(+money / 1000)
            surplus = surplus.toString().length === 1 ? `00${surplus}` : surplus.toString().length === 2 ? `0${surplus}` : `${surplus}`
            formatedMoney = `.${surplus}${formatedMoney}`
        }
        return `${money}${formatedMoney}`
    }
    handleToggle = (request, id, item) => {
        if (id === 'detail') {
            this.setState({
                isShowDetail: request
            })
        }
        if (id === 'modal') {
            if (request && item) {
                this.setState({
                    item: item
                })
            }
            // console.log(request, id, item);
            this.setState({
                isShowModal: request
            })
        }
    }
    handleChangeProvince = (event) => {
        let { dataDoctorBySpecialty } = this.state
        let dataDoctorByProvince = []
        if (event.target.value === 'ALL') {
            dataDoctorByProvince = dataDoctorBySpecialty
        } else {
            dataDoctorBySpecialty.forEach(item => {
                if (item.province.keyMap === event.target.value) {
                    dataDoctorByProvince.push(item)
                }
            })
        }

        this.setState({
            dataDoctorByProvince: dataDoctorByProvince
        })

    }


    render() {
        let { dataDoctorBySpecialty, isShowDetail, allProvince, dataDoctorByProvince } = this.state
        // console.log(dataDoctorByProvince);



        return (
            <>
                {this.props.sortByProvince && <div className="select-province ">
                    <select onChange={(event) => this.handleChangeProvince(event)} >
                        <option value="ALL" >Toàn quốc</option>
                        {allProvince && allProvince.length > 0 && allProvince.map((item, index) => {
                            return (
                                <option key={index} value={item.keyMap}>{item.valueVI}</option>
                            )
                        })}
                    </select>
                </div>}
                {dataDoctorByProvince && dataDoctorByProvince.length > 0 && dataDoctorByProvince.map((item, index) => {
                    // console.log(this.handleCheckHourInDay(item.timeSchedule));
                    return (
                        <div key={index} className="box-doctor-container">
                            <div className="info-section col-6">
                                <div className="avatar-doctor">
                                    <img src={new Buffer(item.User.image, 'base64').toString('binary')} alt="avatar-doctor" />
                                    <div onClick={() => this.props.negative(`/bookingcare/doctor-profile/${item.doctorId}`)} className="see-more">Xem thêm</div>
                                </div>
                                <div className="desc-doctor">
                                    <h4>{`${item.positionData.valueVI} - ${item.User.firstName} ${item.User.lastName}`}</h4>
                                    <div className="desc" dangerouslySetInnerHTML={{ __html: item.Markdown.introduction }}></div>
                                    <div className="location">
                                        <i className="fas fa-map-marker-alt"></i>
                                        {item.province.valueVI}
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 schedule-section">
                                <div className="select-date">
                                    <select onChange={(event) => this.handleChangeSelect(event, item)} className="select-day px-3 py-2">
                                        <option value={this.today().newDate}>{this.today().newFullDate}</option>
                                        <option value={this.today(1).newDate}>{this.today(1).newFullDate}</option>
                                        <option value={this.today(2).newDate}>{this.today(2).newFullDate}</option>
                                    </select>
                                </div>
                                <div className="content-schedule col-12">
                                    <div className="tilte-schedule">
                                        <i className="fas fa-calendar-alt"></i>
                                        <h5 className="my-3">Schedule</h5>
                                    </div>
                                    <div className="table-time">
                                        {item.timeSchedule && item.timeSchedule.length > 0
                                            ? <> <div className="box-item">
                                                {this.handleCheckHourInDay(item.timeSchedule, item.currentDay)[0] && item.timeSchedule.map((itemTime, index) => {
                                                    // console.log(this.handleCheckHourInDay[1]);
                                                    return (
                                                        <div onClick={() => this.handleToggle(true, 'modal', itemTime)} key={index}
                                                            className={!this.handleCheckHourInDay(item.timeShedule, item.currentDay)[1] ? 'item enable-item' : itemTime.Allcode.id < this.handleCheckHourInDay(item.timeShedule, item.currentDay)[0][0].Allcode.id ? 'item' : 'item enable-item'}>
                                                            {itemTime.Allcode.valueVI}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                                <small className="title-small">Chọn <span><i className="far fa-hand-point-up mx-0"></i></span> và đặt (Phí đặt 0đ)</small></>
                                            :
                                            <div className="text">{`Hôm nay bác sĩ ${item.User.firstName} ${item.User.lastName} không có lịch khám! Bệnh nhân có thể đặt lịch vào ngày khác... `}</div>
                                        }
                                    </div>
                                </div>
                                <div className="content-clinic col-12">
                                    <div className="tilte-clinic d-flex">
                                        <i className="fas fa-hospital-alt"></i>
                                        <h5 className="my-3">Address</h5>
                                    </div>
                                    <div className="table-time">
                                        <div className="clinic">
                                            <b>{item.nameClinic}</b>
                                            <p>{item.addressClinic}</p>
                                        </div>
                                        <div className="price">
                                            <b>{`Giá khám: ${this.formatVnd(item.price.valueVI)} vnđ`}</b>
                                            {!isShowDetail && <span onClick={() => { this.handleToggle(true, 'detail') }} className="show-detail px-2">Xem chi tiết</span>}
                                            {isShowDetail && <div className="detail">
                                                <div className="details">
                                                    <div>Giá khám: <span style={{ float: 'right' }}>{`${this.formatVnd(item.price.valueVI)} vnđ`}</span></div>
                                                    {item.note !== 'none' && <div>{item.note}</div>}
                                                    {item.payment &&
                                                        <div>{`Người bệnh có thể thanh toán bằng ${item.payment.valueVI}`}</div>}
                                                </div>
                                                <div onClick={() => { this.handleToggle(false, 'detail') }} className="show-detail my-2">Ẩn chi tiết</div>
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {this.state.isShowModal && <Modal
                                handleToggle={this.handleToggle}
                                item={this.state.item}
                                currentDay={this.state.selectedDay ? this.state.selectedDay : item.currentDay}
                                formatVnd={this.formatVnd}
                            />}
                        </div>
                    )
                })
                }
                {!dataDoctorByProvince && <div style={{ margin: '32px 16px', paddingBottom: '200px' }}>Loading data...</div>}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        // specialtyData: state.app.specialty,
        schedule: state.doctor.schedule
    };
};

const mapDispatchToProps = dispatch => {
    return {
        negative: (path) => dispatch(push(path)),
        getScheduleDoctor: (doctorIdAndDate) => dispatch(actions.getScheduleDoctor(doctorIdAndDate)),


    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BoxDoctor));
