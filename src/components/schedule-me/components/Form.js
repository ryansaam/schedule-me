import React, { Component } from 'react'
import '../Form.css'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: ""
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.stopPropagation()
    e.preventDefault()
  }

  render() {
    const { onExit, display, date } = this.props
    return (
      <div className="form" style={{display: display}} onClick={onExit}>
        <div className="content-wrapper">
          <i className="ion-android-cancel"></i>
          <div className="form-header" onClick={this.handleClick}>
            <h3>Scheduling an appointment on:</h3> 
            <h4>{date}</h4>
          </div>
          <form className="form-fields" id="email-form" method="POST" action="api/mail-post.php" accept-charset="utf-8" onClick={this.handleClick}>
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
    )
  }
}

export default Form;