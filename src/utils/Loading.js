import React from "react";
import { css } from "@emotion/react";
import PacmanLoader from "react-spinners/PacmanLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: auto;
  border-color: red;
`;

class AwesomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    render() {
        return (
            <div style={{
                position: 'fixed',
                top: '0',
                left: '0',
                bottom: '0',
                right: '0',
                display: 'flex',
                backgroundColor: 'rgba(0,0,0,0.5)',
                flexDirection: 'column',
                justifyContent: 'center'
            }} className="sweet-loading">
                <div style={{
                    margin: 'auto'
                }}>
                    <PacmanLoader css={override} size={30} color={"red"} loading={this.state.loading} speedMultiplier={1.5} />
                    <div style={{ fontSize: '18px', margin: 'auto', paddingTop: '38px', paddingLeft: '42px', color: 'white' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div >Đợi xíu nha mấy bợn...</div>
                            <div >Xài host free nên load hơi chậm tý :v</div>
                            <div >ACE thông cảm ha</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AwesomeComponent