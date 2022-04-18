import React, { Component } from 'react';
import { connect } from "react-redux";
import './footer.scss'

class Footer extends Component {
    render() {

        return (
            <div className="footer-container">
                <div className="top-footer">
                    <div className="content-footer">
                        <div className="intro">
                            <img src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg" alt="logo-booking-care" />
                            <b>Công ty Cổ phần Công nghệ BookingCare</b>
                            <p><i className="fas fa-map-marker-alt"></i>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</p>
                            <p><i className="fas fa-check"></i>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</p>
                            <div className="logo-ministry">
                                <img src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg" alt="logo-bo-cong-thuong" />
                                <img src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg" alt="logo-bo-cong-thuong" />

                            </div>
                        </div>
                        <div className="list-link">
                            <ul>
                                <li><a href="https://bookingcare.vn/hop-tac-voi-bookingcare">Liên hệ hợp tác</a></li>
                                <li><a href="https://bookingcare.vn/benh-nhan-thuong-hoi">Câu hỏi thường gặp</a></li>
                                <li><a href="https://bookingcare.vn/thong-tin/dieu-khoan-su-dung-p7">Điều khoản sử dụng</a></li>
                                <li><a href="https://bookingcare.vn/thong-tin/chinh-sach-bao-mat-p8">Chính sách Bảo mật</a></li>
                                <li><a href="https://bookingcare.vn/thong-tin/quy-trinh-ho-tro-giai-quyet-khieu-nai-p13">Quy trình hỗ trợ giải quyết khiếu nại</a></li>
                                <li><a href="https://bookingcare.vn/site/quyche">Quy chế hoạt động</a></li>
                            </ul>
                        </div>
                        <div className="address">
                            <div className="item">
                                <b>Trụ sở tại Hà Nội</b>
                                <p>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</p>
                            </div>
                            <div className="item">
                                <b>Văn phòng tại TP Hồ Chí Minh</b>
                                <p>6/6 Cách Mạch Tháng Tám, P. Bến Thành, Quận 1</p>
                            </div>
                            <div className="item">
                                <b>Hỗ trợ khách hàng</b>
                                <p>support@bookingcare.vn (7h - 18h)</p>
                            </div>
                        </div>
                    </div>
                    <div className="mobile">
                        <i className="fas fa-mobile-alt"></i>
                        <p>Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng: <span>Android</span> - <span>iPhone/iPad</span> - <span>Khác</span></p>
                    </div>
                </div>
                <div className="bottom-footer">
                    <div className="copy-right">&copy; 2022 BookingCare</div>
                    <div className="logos">
                        <a target='_blank' href="https://www.facebook.com/em.aichoc"><i style={{ color: 'blue' }} className="fab fa fa-facebook-square"></i></a>
                        <i className="fab fa fa-youtube-square"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
