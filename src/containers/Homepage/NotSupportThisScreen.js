import React from "react";

class NotSupportThisScreen extends React.Component {


    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'center', width: '100vw', height: '100vh', flexDirection: 'column' }}>

                <b style={{ margin: 'auto', color: 'red', fontSize: '20px', textAlign: 'center' }}><i style={{ display: 'block', fontSize: '25px' }} className="fas fa-exclamation-triangle"></i>Width less than 768px not supported!</b>
            </div>
        )
    }
}
export default NotSupportThisScreen