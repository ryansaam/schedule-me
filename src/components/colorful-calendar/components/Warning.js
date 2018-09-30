import React from 'react'

const Warning = (props) => {
  return (
    <div className="warning" id="warn" style={{display: props.display ? "block" : "none"}}>{props.msg}</div>
  )
}

export default Warning