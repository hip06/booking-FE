import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import './ScheduleDoctor.scss'
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
import * as actions from '../../store/actions'

import * as doctorServices from '../../services/doctorServices'
import swal from 'sweetalert';
import { push } from 'connected-react-router';





class ScheduleDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedOption: null,
            date: new Date(),
            activedTime: [],
            doctorData: null
        }
    }

    async componentDidMount() {
        this.props.readTimeWork()

        this.props.readDoctors()

    }
    componentDidUpdate(prevProps) {
        if (prevProps.doctorData !== this.props.doctorData) {
            if (JSON.parse(JSON.parse(localStorage.getItem('persist:user')).userInfoExeptionImage) &&
                JSON.parse(JSON.parse(localStorage.getItem('persist:user')).userInfoExeptionImage).roleId === 'R2') {
                let doctorData = this.props.doctorData.filter(item => item.id === JSON.parse(JSON.parse(localStorage.getItem('persist:user')).userInfoExeptionImage).id)
                this.setState({
                    doctorData: doctorData,
                    selectedOption: doctorData[0]
                })
            } else {
                this.setState({
                    doctorData: this.props.doctorData

                })

            }
        }
    }
    handleChange = (selectedOption) => {
        this.setState({
            selectedOption
        });
    };
    handleDateChange = (value) => {
        this.setState({
            date: value
        })
    }
    handleSubmit = async () => {
        let dataNotHandleYet = this.state
        let formatedDate = `${dataNotHandleYet.date.getDate()}/${dataNotHandleYet.date.getMonth() + 1}/${dataNotHandleYet.date.getFullYear()}`
        let dataForBulkCreate = []
        dataForBulkCreate = dataNotHandleYet && dataNotHandleYet.activedTime.length > 0 && dataNotHandleYet.activedTime.map((item, index) => {
            return {
                doctorId: dataNotHandleYet.selectedOption.id,
                date: formatedDate,
                timeType: item.keyMap
            }
        })

        let response = await doctorServices.bulkCreateSchedule(dataForBulkCreate)
        if (response && response.data && response.data.errCode === 0) {
            swal('Done!', 'Schedules has been set up!', 'success')
            this.setState({
                date: new Date(),
                activedTime: []
            })
        } else {
            swal('Ops!', response.data.message, 'warning')
        }
        // console.log(response.data.message);

        // console.log(new Date(dataNotHandleYet.date.getTime()));
    }
    handleActive = (itemActived) => {
        let { activedTime } = this.state
        let newActived = []
        if (!activedTime) {
            this.setState({
                activedTime: [
                    ...this.state.activedTime,
                    itemActived
                ]
            })
        } else {
            let check = activedTime.find((item) => item.id === itemActived.id)
            if (check) {
                newActived = activedTime.filter((item) => item.id !== itemActived.id)
            } else {
                newActived = [...activedTime, itemActived]
            }
            this.setState({
                activedTime: newActived
            })
        }
    }
    checkActiveItem = (idItem) => {
        let { activedTime } = this.state
        let check = activedTime.find((item) => idItem === item.id)
        if (check) {
            return 'item active-time'
        } else {
            return 'item'
        }
    }
    setUpDataDoctorSeclect = () => {
        let options = []
        let { doctorData } = this.state
        if (doctorData && doctorData.length > 0) {
            options = doctorData.map((item, index) => {
                return { value: item.firstName + ' ' + item.lastName, label: item.firstName + ' ' + item.lastName, id: item.id }
            })
        }
        return options
    }
    render() {
        let { timeArray } = this.props
        let options = this.setUpDataDoctorSeclect()
        // console.log(this.state.doctorData);
        // console.log(this.props.timeArray);
        // console.log(this.props.doctorData);
        // console.log(JSON.parse(JSON.parse(localStorage.getItem('persist:user')).userInfoExeptionImage));
        return (
            <>
                <div className="container-page">
                    <h1 className='text-center my-3'>LÊN LỊCH KHÁM BỆNH CHO BÁC SĨ</h1>
                    <div className="content-schedule my-5 row">
                        <div className="col-6">
                            <Select
                                value={this.selectedOption}
                                onChange={this.handleChange}
                                options={options}
                            />
                        </div>
                        <div className="col-6">
                            <DatePicker
                                selected={this.state.date}
                                className='form-control'
                                dateFormat={'dd/MM/yyyy'}
                                minDate={new Date()}
                                onChange={this.handleDateChange} //only when value has changed
                            />
                        </div>

                    </div>
                    <div className="schedule">
                        <div className="box-time">
                            {timeArray && timeArray.length > 0 && timeArray.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => { this.handleActive(item) }} className={this.checkActiveItem(item.id)}>{item.valueVI}</div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="submit text-center"><button type='button' onClick={() => this.handleSubmit()} className='btn btn-primary px-5 '>Submit</button></div>
                </div>
                <div onClick={() => this.props.negative('/homepage')} style={{ cursor: 'pointer', color: 'blue', margin: '32px 300px' }} >Tới trang chính</div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        timeArray: state.doctor.timeArray,
        doctorData: state.admin.doctorData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        readTimeWork: () => dispatch(actions.getTimeWork()),
        readDoctors: () => dispatch(actions.readDoctorStart()),
        negative: (path) => dispatch(push(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctor);
