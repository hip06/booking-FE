import React from "react";
import './doctorProfile.scss'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'
import _ from 'lodash'

//import components
import HeaderSub from "../HeaderSub/HeaderSub";
import Modal from "../ModalBookingSchedule/Modal";
import Footer from "../Footer/Footer";
import AwesomeComponent from '../../../utils/Loading';


class DoctorProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsInforDoctor: [],
            srcAvatar: '',
            schedule: null,
            currentDay: this.today().newDate,
            bonusInformationDoctor: null,
            isShowDetail: false,
            isShowModal: false,
            item: null
        }
    }
    componentDidMount() {
        this.props.getDetailsInforDoctor(this.props.match.params.id)
        this.props.getScheduleDoctor({ id: this.props.match.params.id, date: this.today().newDate })
        this.props.dataDoctorMarkdown(this.props.match.params.id)

    }
    componentDidUpdate(prevProps) {
        if (prevProps.detailsInforDoctor !== this.props.detailsInforDoctor) {
            this.setState({
                detailsInforDoctor: this.props.detailsInforDoctor,
                srcAvatar: new Buffer(this.props.detailsInforDoctor.image, 'base64').toString('binary')
            })
        }
        if (prevProps.schedule !== this.props.schedule) {
            this.setState({
                schedule: this.props.schedule
            })
        }
        if (prevProps.detailsInforDoctorBonus !== this.props.detailsInforDoctorBonus) {
            this.setState({
                ...this.state,
                bonusInformationDoctor: this.props.detailsInforDoctorBonus.data
            })
        }
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
    handleChangeSelect = (event) => {
        // console.log(event.target.value.getDay);
        this.props.getScheduleDoctor({ id: this.props.match.params.id, date: event.target.value })
        this.setState({
            ...this.state,
            currentDay: event.target.value
        })
    }
    handleCheckHourInDay = () => {
        let { schedule } = this.state
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
        let isToday = this.today().newDate === this.state.currentDay ? true : false
        return [foundElem, isToday]
    }
    handleToggle = (request, id, item) => {
        if (id === 'detail') {
            this.setState({
                isShowDetail: request
            })
        }
        if (id === 'modal') {
            if (request) {
                this.setState({
                    item: !item ? null : item
                })
            }
            this.setState({
                isShowModal: request
            })
        }
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


    render() {
        let { detailsInforDoctor, srcAvatar, schedule, bonusInformationDoctor, isShowDetail } = this.state
        let isDataSchedule = schedule && schedule.length ? true : false
        let [breakItem, isToday] = this.handleCheckHourInDay()

        return (
            <>
                <div className="doctor-profile-page">
                    <div className="col-12"><HeaderSub /></div>
                    {!detailsInforDoctor || !bonusInformationDoctor
                        ? <AwesomeComponent />
                        :
                        <>
                            <div className="doctor-profile-container">
                                {detailsInforDoctor && detailsInforDoctor.Markdown && <>
                                    <div className="top-section" style={{ padding: '16px 350px', border: '1px solid #ccc' }}>
                                        <div className="header-infor row">
                                            <div className="avatar col-2">
                                                <div className="box-img">{srcAvatar && <img src={srcAvatar} alt="avatar-doctor" />}</div>
                                            </div>
                                            <div className="infor col-10">
                                                <div className="col-12 title-name">{detailsInforDoctor.positionData && (detailsInforDoctor.positionData.valueVI + ' - ' + detailsInforDoctor.firstName + ' ' + detailsInforDoctor.lastName)}</div>
                                                <div className="col-12 desc" dangerouslySetInnerHTML={{ __html: detailsInforDoctor.Markdown.introduction }}></div>
                                            </div>
                                        </div>
                                        <div className="header-section">
                                            <div className="schedule my-5">
                                                <div className="select-date col-2">
                                                    <select onChange={(event) => this.handleChangeSelect(event)} className="select-day px-3 py-2">
                                                        <option value={this.today().newDate}>{this.today().newFullDate}</option>
                                                        <option value={this.today(1).newDate}>{this.today(1).newFullDate}</option>
                                                        <option value={this.today(2).newDate}>{this.today(2).newFullDate}</option>
                                                    </select>
                                                </div>
                                                <div className="row">
                                                    <div className="content-schedule col-6">
                                                        <div className="tilte-schedule d-flex">
                                                            <i className="fas fa-calendar-alt"></i>
                                                            <h3 className="my-3">Schedule</h3>
                                                        </div>
                                                        <div className="table-time">
                                                            {isDataSchedule
                                                                ? <>
                                                                    <div className="box-item">
                                                                        {breakItem && schedule.map((item, index) => {
                                                                            return (
                                                                                <div onClick={() => this.handleToggle(true, 'modal', item)} key={index}
                                                                                    className={!isToday ? 'item enable-item' : item.Allcode.id < breakItem[0].Allcode.id ? 'item' : 'item enable-item'}>
                                                                                    {item.Allcode.valueVI}
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                    <small className="title-small">Chọn <span><i className="far fa-hand-point-up mx-0"></i></span> và đặt (Phí đặt 0đ)</small>
                                                                </>
                                                                : <div className="text">{`Hôm nay bác sĩ ${detailsInforDoctor.firstName + ' ' + detailsInforDoctor.lastName} không có lịch khám! Bệnh nhân có thể đặt lịch vào ngày khác... `}</div>
                                                            }

                                                        </div>
                                                    </div>
                                                    <div className="content-clinic col-6">
                                                        <div className="tilte-schedule d-flex">
                                                            <h3 className="my-3">Address</h3>
                                                        </div>
                                                        {bonusInformationDoctor && <div className="table-time">
                                                            <div className="clinic">
                                                                <b>{bonusInformationDoctor.responseDoctorInfor.nameClinic}</b>
                                                                <p>{bonusInformationDoctor.responseDoctorInfor.addressClinic}</p>
                                                            </div>
                                                            <div className="price">
                                                                <b>{`Giá khám: ${this.formatVnd(bonusInformationDoctor.responseDoctorInfor.price.valueVI)} vnđ`}</b>
                                                                {!isShowDetail && <span onClick={() => { this.handleToggle(true, 'detail') }} className="show-detail px-2">Xem chi tiết</span>}
                                                                {isShowDetail && <div className="detail">
                                                                    <div className="details">
                                                                        <div>Giá khám: <span style={{ float: 'right' }}>{`${this.formatVnd(bonusInformationDoctor.responseDoctorInfor.price.valueVI)} vnđ`}</span></div>
                                                                        {bonusInformationDoctor.responseDoctorInfor.note !== 'none' && <div>{bonusInformationDoctor.responseDoctorInfor.note}</div>}
                                                                        {bonusInformationDoctor.responseDoctorInfor.payment &&
                                                                            <div>{`Người bệnh có thể thanh toán bằng ${bonusInformationDoctor.responseDoctorInfor.payment.valueVI}`}</div>}
                                                                    </div>
                                                                    <div onClick={() => { this.handleToggle(false, 'detail') }} className="show-detail my-2">Ẩn chi tiết</div>
                                                                </div>}
                                                            </div>
                                                        </div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content-details" >
                                        <div className="content-text py-5" dangerouslySetInnerHTML={{ __html: detailsInforDoctor.Markdown.contentHTML }}></div>
                                    </div>
                                </>}
                            </div>
                            <div><Footer /></div>
                        </>
                    }
                </div>
                {this.state.isShowModal && <Modal
                    handleToggle={this.handleToggle}
                    item={this.state.item}
                    currentDay={this.state.currentDay}
                    formatVnd={this.formatVnd}
                />}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        detailsInforDoctor: state.doctor.detailsInforDoctor.data,
        detailsInforDoctorBonus: state.doctor.markdownDoctor,
        schedule: state.doctor.schedule
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getDetailsInforDoctor: (id) => dispatch(actions.getDetailsInforDoctor(id)),
        getScheduleDoctor: (doctorIdAndDate) => dispatch(actions.getScheduleDoctor(doctorIdAndDate)),
        dataDoctorMarkdown: (id) => dispatch(actions.dataDoctorMarkdown(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);