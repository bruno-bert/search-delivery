import React from 'react'

const LoginButton = ({buttonText, type, buttonType, icon, iconSize, onClick }) => {
    return (
        <button type={type} onClick={onClick} style={{color: "white", marginTop: "10px", width:"100%", margin: "auto" }} 
        className={`btn btn-lg btn-block btn-social ${buttonType}`}>
          <span style={{fontSize: iconSize}} className={icon}></span>
          <span style={{ display: "block" ,textAlign: "center"}}>{ buttonText }</span>
        </button>
    )
}



export default LoginButton
