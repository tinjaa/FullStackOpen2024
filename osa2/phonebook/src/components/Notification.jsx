import React from 'react'

const Notification = ({message,error}) => {
    if(message == null) {
        return null
    }

    let color = 'green';
    if(error) {
        color = 'red';
    }

    const messageStyle = {
        color: color,
        backgroundColor: 'lightgrey',
        fontSize: '20spx',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    }

    return (
        <div style={messageStyle}>{message}</div>
    )
}

export default Notification