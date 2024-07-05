import React from 'react'
 function Logo({className = "" , logoDivClass = ""}) {
  return (
    <div className={`${logoDivClass}`}>
 
 <h2 className={`logoImg ${className}`}>Foesteric</h2>       
    </div>
  )
}

export default Logo