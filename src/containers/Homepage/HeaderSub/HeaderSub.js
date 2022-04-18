import React from "react";
import './headerSub.scss'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { push } from "connected-react-router";
import { withRouter } from "react-router";




class HeaderSub extends React.Component {

    handleGoBack = (pageId) => {
        if (pageId === 'handbook') {
            this.props.history.push('/homepage')
        } else {
            this.props.history.goBack()
        }
    }


    render() {
        let pageId = this.props.pageId ? this.props.pageId : 'orther'

        return (
            <div className="headerSub">
                <div onClick={() => this.handleGoBack(pageId)} className="link-back"><i className="fas fa-arrow-left"></i></div>
                {/* <div className="menu-btn"><i className="fas fa-bars"></i></div> */}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = dispatch => {
    return {


    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderSub));