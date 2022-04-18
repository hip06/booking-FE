import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './doctorManage.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import * as actions from '../../store/actions'
import swal from 'sweetalert';
import _ from 'lodash';
const mdParser = new MarkdownIt(/* Markdown-it options */);



class DoctorManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: null,
            doctorData: null,
            selectedPrice: null,
            priceData: null,
            selectedPayment: null,
            paymentData: null,
            selectedProvince: null,
            provinceData: null,
            selectedSpecialty: null,
            specialtyData: null,
            selectedClinic: null,
            clinicData: null,

            contentHTML: '',
            contentMarkdown: '',
            contentIntroducion: null,
            resultCallAPI: null,
            isEdit: true,
            updateResponse: null,

            clinicName: null,
            addressClinic: null,
            note: null,
        }
    }
    componentDidMount() {
        this.props.readDoctors()
        this.props.getDataFromAllcode('price')
        this.props.getDataFromAllcode('payment')
        this.props.getDataFromAllcode('province')
        this.props.getDataSpecialty()
        this.props.getdataClinics('ALL')
    }

    componentDidUpdate(prevProps) {
        if (prevProps.doctorData !== this.props.doctorData) {
            this.setState({
                doctorData: this.props.doctorData

            })
        }
        if (prevProps.resultReduxServices !== this.props.resultReduxServices) {
            this.setState({
                resultCallAPI: this.props.resultReduxServices
            })
        }
        if (prevProps.markdownDoctor !== this.props.markdownDoctor) {
            if (this.props.markdownDoctor.errCode === 0) {
                let { responseMarkdown, responseDoctorInfor } = this.props.markdownDoctor.data
                this.setState({
                    contentHTML: responseMarkdown.contentHTML,
                    contentMarkdown: responseMarkdown.contentMarkdown,
                    contentIntroducion: responseMarkdown.introduction,
                    selectedPrice: { label: responseDoctorInfor.price.valueVI, value: responseDoctorInfor.priceId },
                    selectedPayment: { label: responseDoctorInfor.payment.valueVI, value: responseDoctorInfor.paymentId },
                    selectedProvince: { label: responseDoctorInfor.province.valueVI, value: responseDoctorInfor.provinceId },
                    clinicName: responseDoctorInfor.nameClinic,
                    addressClinic: responseDoctorInfor.addressClinic,
                    note: responseDoctorInfor.note,

                })
            } else {
                this.setState({
                    isEdit: false,
                    contentHTML: '',
                    contentMarkdown: '',
                    contentIntroducion: '',
                    clinicName: '',
                    addressClinic: '',
                    note: '',
                    selectedPrice: null,
                    selectedPayment: null,
                    selectedProvince: null,
                })
            }

        }
        if (prevProps.updateResponse !== this.props.updateResponse) {
            this.setState({
                updateResponse: this.props.updateResponse
            })
        }
        if (prevProps.priceData !== this.props.priceData) {
            this.setState({
                priceData: this.props.priceData
            })
        }
        if (prevProps.paymentData !== this.props.paymentData) {
            this.setState({
                paymentData: this.props.paymentData
            })
        }
        if (prevProps.provinceData !== this.props.provinceData) {
            this.setState({
                provinceData: this.props.provinceData
            })
        }
        if (prevProps.specialtyData !== this.props.specialtyData) {
            this.setState({
                specialtyData: this.props.specialtyData
            })
        }
        if (prevProps.clinicData !== this.props.clinicData) {
            this.setState({
                clinicData: this.props.clinicData

            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            ...this.state,
            contentHTML: html,
            contentMarkdown: text
        })
    }
    handleChangeSelect = (selectedValue, name) => {
        if (name.name === 'selectedDoctor') {
            this.setState({
                ...this.state,
                selectedDoctor: selectedValue,
                isEdit: true
            }, () => { this.props.dataDoctorMarkdown(selectedValue.id) });
        } else {
            this.setState({
                ...this.state,
                [name.name]: selectedValue
            })
        }
        // console.log(selectedValue);
    };
    // handleUpdate = async (dataUpdate) => {
    //     await this.props.updateInforDoctor(dataUpdate)
    //     if (this.props.updateResponse.errCode !== 0) {
    //         swal('Ops!', this.state.updateResponse.message, 'error')
    //     } else {
    //         swal('Done!', 'Save infor succeeded', 'success')
    //         this.setState({
    //             selectedDoctor: "",
    //             contentHTML: '',
    //             contentMarkdown: '',
    //             contentIntroducion: '',
    //             updateResponse: '',
    //             isEdit: true
    //         })
    //     }
    // }
    // handleCreate = async (dataCreate) => {
    //     await this.props.createInforDoctor(dataCreate)
    //     if (this.state.resultCallAPI.errCode !== 0) {
    //         swal('Ops!', this.state.resultCallAPI.message, 'error')
    //     } else {
    //         swal('Done!', 'Save infor succeeded', 'success')
    //         this.setState({
    //             selectedDoctor: "",
    //             contentHTML: '',
    //             contentMarkdown: '',
    //             contentIntroducion: '',
    //             resultCallAPI: '',
    //             isEdit: true
    //         })
    //     }
    // }
    handleSave = async () => {
        let resultValidate = this.validate()
        if (!resultValidate) {
            let dataGroup = {
                markdown: {
                    selectedDoctor: this.state.selectedDoctor,
                    contentHTML: this.state.contentHTML,
                    contentIntroducion: this.state.contentIntroducion,
                    contentMarkdown: this.state.contentMarkdown
                },
                inforDoctor: {
                    selectedDoctor: this.state.selectedDoctor,
                    selectedPrice: this.state.selectedPrice,
                    selectedPayment: this.state.selectedPayment,
                    selectedProvince: this.state.selectedProvince,
                    clinicName: this.state.clinicName,
                    addressClinic: this.state.addressClinic,
                    note: this.state.note,
                    selectedSpecialty: this.state.selectedSpecialty,
                    selectedClinic: this.state.selectedClinic

                }
            }
            // console.log(dataGroup);
            let response = await this.props.upsertDoctorInfor(dataGroup)
            // console.log(response);
            if (response && response.data && response.data.errCode === 0) {
                swal('Done!', `Your action has been succeeded!`, 'success')
                this.setState({
                    contentHTML: '',
                    contentMarkdown: '',
                    contentIntroducion: '',
                    selectedPrice: null,
                    selectedPayment: null,
                    selectedProvince: null,
                    clinicName: '',
                    addressClinic: '',
                    note: '',
                    selectedClinic: null

                })
            } else {
                swal('Error!', `${response.data.message}`, 'error')
            }

        } else {
            swal('Error!', `Missing some infors...[${resultValidate}]`, 'warning')
        }
    }
    validate = () => {
        let validatedFields = ['selectedDoctor', 'contentIntroducion', 'selectedPrice', 'selectedPayment',
            'selectedProvince', 'clinicName', 'addressClinic', 'note', 'contentHTML', 'contentMarkdown', 'selectedSpecialty']

        let checkValidate = null
        for (let i = 0; i < validatedFields.length; i++) {
            if (!this.state[validatedFields[i]]) {
                checkValidate = validatedFields[i]
                break
            }
        }
        return checkValidate
    }
    handleChangeInput = (event, id) => {
        this.setState({
            ...this.state,
            [id]: event.target.value
        })
    }
    setUpDataDoctorSeclect = (data) => {
        let options = []
        if (data.type === 'doctor') {
            if (data.arrValue && data.arrValue.length > 0) {
                options = data.arrValue.map((item, index) => {
                    return { value: item.firstName + ' ' + item.lastName, label: item.firstName + ' ' + item.lastName, id: item.id }
                })
            }
        }
        if (data.type === 'price') {
            if (data.arrValue && data.arrValue.length > 0) {
                options = data.arrValue.map((item, index) => {
                    return { value: item.keyMap, label: `${item.valueVI} VND`, id: item.id }
                })
            }
        }
        if (data.type === 'payment') {
            if (data.arrValue && data.arrValue.length > 0) {
                options = data.arrValue.map((item, index) => {
                    return { value: item.keyMap, label: item.valueVI, id: item.id }
                })
            }
        }
        if (data.type === 'province') {
            if (data.arrValue && data.arrValue.length > 0) {
                options = data.arrValue.map((item, index) => {
                    return { value: item.keyMap, label: item.valueVI, id: item.id }
                })
            }
        }
        if (data.type === 'specialty') {
            if (data.arrValue && data.arrValue.length > 0) {
                options = data.arrValue.map((item, index) => {
                    return { value: item.name, label: item.name, id: item.id }
                })
            }
        }
        if (data.type === 'clinic') {
            if (data.arrValue && data.arrValue.length > 0) {
                options = data.arrValue.map((item, index) => {
                    return { value: item.name, label: item.name, id: item.id }
                })
            }
        }
        return options
    }

    render() {
        let { isEdit, priceData, paymentData, provinceData, doctorData, specialtyData, clinicData } = this.state
        let optionsDoctor = this.setUpDataDoctorSeclect({ type: 'doctor', arrValue: doctorData })
        let optionsPrice = this.setUpDataDoctorSeclect({ type: 'price', arrValue: priceData })
        let optionsPayment = this.setUpDataDoctorSeclect({ type: 'payment', arrValue: paymentData })
        let optionsProvince = this.setUpDataDoctorSeclect({ type: 'province', arrValue: provinceData })
        let optionsSpecialty = this.setUpDataDoctorSeclect({ type: 'specialty', arrValue: specialtyData })
        let optionsClinic = this.setUpDataDoctorSeclect({ type: 'clinic', arrValue: clinicData })

        // console.log('check', clinicData);
        // console.log(optionsSpecialty);
        // console.log(this.state.selectedSpecialty);
        // console.log(this.props.clinicData);
        return (
            <div className='mx-2'>
                <h1 className='text-center my-2'>Doctor's Manage</h1>
                <div className="row my-3">
                    <div className="col-6">
                        <label >Select doctors:</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={optionsDoctor}
                            name={'selectedDoctor'}
                        />
                    </div>
                    <div className="col-6">
                        <label>Introdutions:</label>
                        <textarea value={this.state.contentIntroducion} onChange={(event) => this.handleChangeInput(event, 'contentIntroducion')} className='col-12 form-control' rows="5"></textarea>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-4">
                        <label >Select price:</label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelect}
                            options={optionsPrice}
                            name={'selectedPrice'}
                        />
                    </div>
                    <div className="col-4">
                        <label >Select payment method:</label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelect}
                            options={optionsPayment}
                            name={'selectedPayment'}
                        />
                    </div>
                    <div className="col-4">
                        <label >Select province:</label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelect}
                            options={optionsProvince}
                            name={'selectedProvince'}
                        />
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-4">
                        <label >Select specialty</label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelect}
                            options={optionsSpecialty}
                            name={'selectedSpecialty'}
                        />
                    </div>
                    <div className="col-4">
                        <label >Select clinic:</label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelect}
                            options={optionsClinic}
                            name={'selectedClinic'}
                        />
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-4">
                        <label htmlFor="">Clinic name:</label>
                        <input type="text" value={this.state.clinicName} onChange={(event) => this.handleChangeInput(event, 'clinicName')} className='form-control' />
                    </div>
                    <div className="col-4">
                        <label htmlFor="">Clinic address:</label>
                        <input type="text" value={this.state.addressClinic} onChange={(event) => this.handleChangeInput(event, 'addressClinic')} className='form-control' />
                    </div>
                    <div className="col-4">
                        <label htmlFor="">Note:</label>
                        <input type="text" value={this.state.note} onChange={(event) => this.handleChangeInput(event, 'note')} className='form-control' />
                    </div>
                </div>
                <MdEditor style={{ height: '500px', border: '1px solid red' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.contentMarkdown}
                />
                <button type='button' className='btn btn-primary my-2 px-5' onClick={() => this.handleSave()}>{isEdit ? 'Update' : 'Save'}</button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        doctorData: state.admin.doctorData,
        resultReduxServices: state.admin.result,
        markdownDoctor: state.doctor.markdownDoctor,
        updateResponse: state.doctor.updateDoctorResponse,
        priceData: state.doctor.priceData,
        paymentData: state.doctor.paymentData,
        provinceData: state.doctor.provinceData,
        specialtyData: state.app.specialty ? state.app.specialty.responseData : null,
        clinicData: state.app.clinic ? state.app.clinic.responseData : null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        readDoctors: () => dispatch(actions.readDoctorStart()),
        getDataFromAllcode: (type) => dispatch(actions.getDataFromAllcode(type)),
        getDataSpecialty: () => dispatch(actions.getDataSpecialty()),
        getdataClinics: (id) => dispatch(actions.getdataClinics(id)),
        dataDoctorMarkdown: (id) => dispatch(actions.dataDoctorMarkdown(id)),
        // updateInforDoctor: (editedData) => { dispatch(actions.updateInforDoctor(editedData)) },
        upsertDoctorInfor: (dataGroup) => dispatch(actions.upsertDoctorInfor(dataGroup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
