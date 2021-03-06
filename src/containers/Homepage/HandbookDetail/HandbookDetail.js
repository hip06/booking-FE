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
                                <div style={{ fontSize: '14px' }}>S???n ph???m c???a: <span style={{ color: 'blue' }}>BookingCare</span></div>
                                <div style={{ fontSize: '14px' }}>Nh??m t??c gi???: <span style={{ color: 'blue' }}>{dataHandbook.author}</span></div>
                                <div style={{ fontSize: '14px' }}>Ng??y xu???t b???n: <span style={{ color: 'blue' }}>{moment(dataHandbook.createdAt).format('DD/MM/YYYY')}</span></div>
                                <div style={{ fontSize: '14px' }}>Ng??y c???p nh???t l???n cu???i: <span style={{ color: 'blue' }}>{moment(dataHandbook.updatedAt).format('DD/MM/YYYY')}</span></div>
                                <div className="box-one">
                                    <i className="fas fa-lightbulb"></i>
                                    <p>BookingCare l?? N???n t???ng Y t??? Ch??m s??c s???c kh???e to??n di???n k???t n???i ng?????i d??ng v???i d???ch v??? y t??? -
                                        ch??m s??c s???c kh???e hi???u qu???, tin c???y v???i tr??n 100 b???nh vi???n, ph??ng kh??m uy t??n, h??n 600 b??c s?? chuy??n khoa gi???i v?? h??ng ngh??n d???ch v??? y t??? ch???t l?????ng cao.</p>
                                </div>
                                <div className="text-detail-handbook" dangerouslySetInnerHTML={{ __html: dataHandbook.descriptionHTML }}></div>
                            </div>
                            <div className="navright">
                                <h6><b>N???i dung ch??nh n??</b></h6>
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