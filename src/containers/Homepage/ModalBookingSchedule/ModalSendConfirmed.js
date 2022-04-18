import React from "react";
import './modalSend.scss'
import GetBase64 from "../../../utils/getBase64";

class ModalSendConfirmed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            emailModal: this.props.email,
            imgbase64: null
        }
    }
    handleChangeInput = (event) => {
        this.setState({
            emailModal: event.target.value
        })
    }
    handleChangeFile = async (event) => {
        let imgbase64 = await GetBase64.toBase64(event.target.files[0])
        this.setState({
            imgbase64: imgbase64
        })
    }
    render() {
        return (
            <div onClick={(event) => this.props.handleToggle(false, event)} className="modal-send-comfirmed">
                <div onClick={(event) => this.props.handleToggle(true, event)} className="box-modal-confirm">
                    <div className="top-modal">
                        <h4 style={{ margin: '0' }}>Xác nhận từ bác sĩ</h4>
                        <div onClick={(event) => this.props.handleToggle(false, event)} className="close-modal">
                            <i className="fas fa-times"></i>
                        </div>
                    </div>
                    <div className="content-modal">
                        <div className="row">
                            <div className="left-modal col-6">
                                <div className="email-patient ">
                                    <label htmlFor="">Email người đặt lịch</label>
                                    <input onChange={(event) => this.handleChangeInput(event)} value={this.state.emailModal} type="email" className="form-control" />
                                </div>
                                <div className="bill ">
                                    <label htmlFor="">Thêm hóa đơn</label>
                                    <input type="file" onChange={(event) => this.handleChangeFile(event)} className="form-control" />
                                </div>
                            </div>
                            <div className="right-modal col-6">
                                <label htmlFor="">Xem trước hóa đơn</label>
                                <div className="img-preview">
                                    <img src={this.state.imgbase64 ? this.state.imgbase64 : ''} alt="preview bill here" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="confirm"><button type="button" onClick={() => this.props.handleConfirm(this.state)} className="btn btn-primary px-3">Confirm</button></div>
                </div>
            </div>
        )
    }
}

export default ModalSendConfirmed