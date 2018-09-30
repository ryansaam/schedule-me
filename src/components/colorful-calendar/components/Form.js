import React from 'react'
import '../Form.css'

function handleClick(e) {
  e.stopPropagation()
}
const Form = (props) => {
  return (
    <div className="form" style={{display: props.display}} onClick={props.onExit}>
      <div className="content-wrapper">
        <i className="ion-android-cancel"></i>
        <div className="form-header" onClick={handleClick}>
          <h3>Scheduling an appointment on:</h3> 
          <h4>{props.date}</h4>
        </div>
        <form className="form-fields" method="POST" action="api/book" onClick={handleClick}>
          <label>
            <p>First Name</p>
            <input name="firstName" type="text" placeholder="John"/>
          </label>
          <label>
            <p>Last Name</p>
            <input name="lastName" type="text" placeholder="Doe"/>
          </label>
          <label>
            <p>Phone Number</p>
            <input name="phone" type="text" placeholder="(000) 000-000"/>
          </label>
          <button className="btn" type="submit">Book!</button>
        </form>
      </div>
    </div>
  );
}

export default Form;