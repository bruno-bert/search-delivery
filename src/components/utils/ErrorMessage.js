import React from 'react'

const ErrorMessage = ( { message }) => {

       return (
            <div style={{marginTop: "25px"}} className="alert alert-danger alert-dismissible fade show" role="alert">
         
          {message}
         </div>)
    
}

export default ErrorMessage

