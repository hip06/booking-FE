import React from "react";
import './handbookDetail.scss'
import { connect } from 'react-redux'
import { push } from "connected-react-router";
import { getDataHandbook } from '../../../services/userServices'
import HeaderSub from '../HeaderSub/HeaderSub'
import moment from 'moment'
import Footer from "../Footer/Footer";



class HandbookDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHandbook: null,
            strongTag: []
        }
    }
    async componentDidMount() {
        let response = await getDataHandbook(this.props.match.params.id)
        // console.log(response);
        if (response && response.data.errCode === 0) {
            this.setState({
                dataHandbook: response.data.response
            })
        }
        this.addClassStrongToNav()
    }
    componentDidUpdate(prevProps) {

    }
    addClassStrongToNav = () => {
        let strongtags = document.querySelectorAll('strong')
        let textStrong = []
        for (let i = 1; i < strongtags.length; i++) {
            strongtags[i].setAttribute("id", `str${i - 1}`);
            textStrong.push(strongtags[i].innerHTML)
        }
        this.setState({
            strongTag: textStrong
        })
    }
    handleClickLink = (index) => {
        let strongtags = document.querySelectorAll('strong')
        for (let i = 1; i < strongtags.length; i++) {
            if (i === index + 1) {
                strongtags[i].classList.add('click-me')
            } else {
                strongtags[i].classList.remove('click-me')

            }

        }
    }


    render() {
        let { dataHandbook, strongTag } = this.state
        // console.log(strongTag);




        return (
            <div className="handbook-detail-container">
                <HeaderSub pageId={'handbook'} />
                {dataHandbook &&
                    <>
                        <div className="top-content">
                            <div className="content-detail-handnook">
                                <h2>{dataHandbook.title}</h2>
                                <div style={{ fontSize: '14px' }}>Sản phẩm của: <span style={{ color: 'blue' }}>BookingCare</span></div>
                                <div style={{ fontSize: '14px' }}>Nhóm tác giả: <span style={{ color: 'blue' }}>{dataHandbook.author}</span></div>
                                <div style={{ fontSize: '14px' }}>Ngày xuất bản: <span style={{ color: 'blue' }}>{moment(dataHandbook.createdAt).format('DD/MM/YYYY')}</span></div>
                                <div style={{ fontSize: '14px' }}>Ngày cập nhật lần cuối: <span style={{ color: 'blue' }}>{moment(dataHandbook.updatedAt).format('DD/MM/YYYY')}</span></div>
                                <div className="box-one">
                                    <i className="fas fa-lightbulb"></i>
                                    <p>BookingCare là Nền tảng Y tế Chăm sóc sức khỏe toàn diện kết nối người dùng với dịch vụ y tế -
                                        chăm sóc sức khỏe hiệu quả, tin cậy với trên 100 bệnh viện, phòng khám uy tín, hơn 600 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ y tế chất lượng cao.</p>
                                </div>
                                <div className="text-detail-handbook" dangerouslySetInnerHTML={{ __html: dataHandbook.descriptionHTML }}></div>
                            </div>
                            <div className="navright">
                                <h6><b>Nội dung chính nè</b></h6>
                                <ul>
                                    {strongTag && strongTag.map((item, index) => {
                                        return (
                                            <li><a onClick={() => this.handleClickLink(index)} href={`#str${index}`}>{item}</a></li>
                                        )
                                    })}

                                </ul>
                            </div>
                        </div>
                        <Footer />
                    </>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(HandbookDetail)