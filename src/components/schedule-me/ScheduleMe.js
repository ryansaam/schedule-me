import React, { Component } from 'react';
import disableScroll from 'disable-scroll'
import { fillCalendar, route } from './calendar.tools.js'
import ArrowBtn from './components/ArrowBtn.js'
import DateNodes from './components/DateNodes.js'
import TextWindow from './components/TextWindow.js'
import WeekDayNodes from './components/WeekDayNodes.js'
import Form from './components/Form.js'
import Warning from './components/Warning.js'

import './ScheduleMe.css'
import './mediaqueries.css'

const monthNames = ["Jan ", "Feb ", "Mar ", "Apr ", "May ", "Jun ", "Jul ", "Aug ", "Sept ", "Oct ", "Nov ", "Dec "]
const weekDayNames = ["Sunday ", "Monday ", "Tuesday ", "Wednesday ", "Thursday ", "Friday ", "Saturday "]

class ScheduleMe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      monthIsOffset: false,
      monthOffset: props.date.getMonth(),
      yearOffset: props.date.getFullYear(),
      datesArray: fillCalendar(props.date.getMonth(), props.date.getFullYear()),
      rotateY: 0,
      itorator: 0,
      rightBtn: false,
      leftBtn: false,
      monthGroup: [monthNames[props.date.getMonth()] + props.date.getFullYear(), undefined, undefined, undefined],
      btnClicked: false,
      warningDisplay: false,
      dateClicked: 1,
      weekDayName: weekDayNames[props.date.getDay()],
      monthName: monthNames[props.date.getMonth()],
      warningMsg: ""
    }
    this.handleMonthChange = this.handleMonthChange.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleExit = this.handleExit.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const { yearOffset, monthOffset, warningDisplay } = this.state
    if (this.state.monthOffset !== prevState.monthOffset) {
      this.setState({ datesArray: fillCalendar(monthOffset, yearOffset) })
    } else if (warningDisplay !== prevState.warningDisplay) {
      setTimeout(() => {this.setState({ warningDisplay: false })}, 3000)
    } 
  }

  handleMonthChange(e) {
    const { monthOffset, yearOffset, rotateY, itorator, rightBtn, leftBtn } = this.state
    if (e.currentTarget.id === "left-arrow" && monthOffset - 1 < this.props.date.getMonth()) {
      this.setState({ warningMsg: "You can't schedule on a date in the past silly", warningDisplay: true })
      return
    }
    if (e.currentTarget.id === "right-arrow" && monthOffset + 1 > this.props.date.getMonth() + 2) {
      return this.setState({ warningMsg: "Sorry we don't schedule appointments past two months ahead", warningDisplay: true })
    }
    const cMonth = this.props.date.getMonth();
    const cYear = this.props.date.getFullYear();
    const nextMonthValues = {
      nextYear: {
        monthOffset: 0,
        yearOffset: yearOffset + 1,
        rotateY: rotateY - 90,
        itorator: route(itorator, leftBtn)
      },
      currentYear: {
        monthOffset: monthOffset + 1,
        rotateY: rotateY - 90,
        itorator: route(itorator, leftBtn)
      }
    }
    const prevMonthValues = {
      prevYear: {
        monthOffset: 11,
        yearOffset: yearOffset - 1,
        rotateY: rotateY + 90,
        itorator: route(itorator, rightBtn)
      },
      currentYear: {
        monthOffset: monthOffset - 1,
        rotateY: rotateY + 90,
        itorator: route(itorator, rightBtn)
      }
    }
    if (e.currentTarget.id === "right-arrow") {
      this.setState(( monthOffset === 11 ) ? nextMonthValues.nextYear : nextMonthValues.currentYear, () => {
        const { monthOffset, yearOffset, itorator } = this.state
        this.setState({ monthIsOffset: ( monthOffset === cMonth && yearOffset === cYear ) ? false : true })
        this.setState({rightBtn: true, leftBtn: false})
        this.setState(
          (itorator === 1) ? prevState => ({ monthGroup: [prevState.monthGroup[0], monthNames[monthOffset] + yearOffset, undefined, undefined] }) :
          (itorator === 2) ? prevState => ({ monthGroup: [undefined, prevState.monthGroup[1], monthNames[monthOffset] + yearOffset, undefined] }) :
          (itorator === 3) ? prevState => ({ monthGroup: [undefined, undefined, prevState.monthGroup[2], monthNames[monthOffset] + yearOffset] }) :
          (itorator === 4) ? prevState => ({ monthGroup: [monthNames[monthOffset] + yearOffset, undefined, undefined, prevState.monthGroup[3]], itorator: 0 }) : void 0
        )
      })
    } else {
      this.setState(( monthOffset === 0 ) ? prevMonthValues.prevYear : prevMonthValues.currentYear, () => {
        const { monthOffset, yearOffset, itorator } = this.state
        this.setState({ monthIsOffset: ( monthOffset === cMonth && yearOffset === cYear ) ? false : true })
        this.setState({rightBtn: false, leftBtn: true})
        this.setState(
          (itorator === 1) ? prevState => ({ monthGroup: [prevState.monthGroup[0], undefined, undefined, monthNames[monthOffset] + yearOffset] }) :
          (itorator === 2) ? prevState => ({ monthGroup: [undefined, undefined, monthNames[monthOffset] + yearOffset, prevState.monthGroup[3]] }) :
          (itorator === 3) ? prevState => ({ monthGroup: [undefined, monthNames[monthOffset] + yearOffset, prevState.monthGroup[2], undefined] }) :
          (itorator === 4) ? prevState => ({ monthGroup: [monthNames[monthOffset] + yearOffset, prevState.monthGroup[1], undefined, undefined], itorator: 0 }) : void 0
        )
      })
    }
  }

  handleDate(e) {
    const { monthOffset, yearOffset } = this.state
    const { date } = this.props
    let value = e.currentTarget.getAttribute("value")
    let key = e.currentTarget.getAttribute("keyvalue")

    if (key.match("leadDate")) {
      if ((monthOffset === 0 ? 11 : monthOffset - 1) < date.getMonth()) {
        this.setState({ warningMsg: "You can't schedule on a date in the past silly", warningDisplay: true })
      } else {
        disableScroll.on()
        let weekDayIndex = new Date(
          yearOffset, 
          (monthOffset === 0 ? 11 : monthOffset - 1),
          value
        )
        let weekDayName = weekDayNames[weekDayIndex.getDay()]
        this.setState(state => ({ 
          btnClicked: !state.btnClicked,
          dateClicked: value,
          weekDayName: weekDayName,
          monthName: monthNames[(monthOffset === 0 ? 11 : monthOffset - 1)]
        }))
      }
    } else if (key.match("postDate")) {
      if (monthOffset + 1 > date.getMonth() + 2) return this.setState({ warningMsg: "Sorry we don't schedule appointments past two months ahead", warningDisplay: true })
      disableScroll.on()
      let weekDayIndex = new Date(
        yearOffset, 
        (monthOffset === 11 ? 0 : monthOffset + 1),
        value
      )
      let weekDayName = weekDayNames[weekDayIndex.getDay()]
      this.setState(state => ({ 
        btnClicked: !state.btnClicked, 
        dateClicked: value, 
        weekDayName: weekDayName, 
        monthName: monthNames[(monthOffset === 11 ? 0 : monthOffset + 1)]
      }))
    } else {
      if (value < date.getDate() && monthOffset === date.getMonth()) return this.setState({ warningMsg: "You can't schedule on a date in the past silly", warningDisplay: true })
      disableScroll.on()
      let weekDayIndex = new Date(yearOffset, monthOffset, value)
      let weekDayName = weekDayNames[weekDayIndex.getDay()]
      this.setState(state => ({
        btnClicked: !state.btnClicked,
        dateClicked: value,
        weekDayName: weekDayName,
        monthName: monthNames[monthOffset]
      }))
    }
  }

  handleExit() {
    disableScroll.off()
    this.setState(state => ({ btnClicked: !state.btnClicked }))
  }

  render() {
    const { datesArray, monthIsOffset, rotateY, monthGroup, monthOffset, weekDayName, dateClicked, monthName, warningMsg, warningDisplay } = this.state
    const { date, colors } = this.props
    return (
      <div className="calendar" style={{background: colors.componentBG, color: colors.textColor}}>
        <Warning msg={warningMsg} display={warningDisplay} />
        <div className="ui">
          <TextWindow
            monthGroup={monthGroup}
            rotateY={rotateY} 
            monthOffset={monthOffset} 
            cMonth={date.getMonth()}
            monthNames={monthNames}
            header1BG={colors.header1BG}
            header2BG={colors.header2BG}
           />
          <div className="arrow-btns">
            <ArrowBtn id={"left-arrow"} eventHandler={this.handleMonthChange} colors={{arrowsBG: colors.arrowsBG, svgFill: colors.textColor}} />
            <ArrowBtn id={"right-arrow"} eventHandler={this.handleMonthChange} colors={{arrowsBG: colors.arrowsBG, svgFill: colors.textColor}} />
          </div>
        </div>
        <div className="display">
          <div className="d-wkDays" id="wkDays" style={{background: colors.weekDayNamesBG}}>
            <WeekDayNodes border={colors.componentBG} />
          </div>
          <DateNodes
            datesArray={datesArray} 
            monthIsOffset={monthIsOffset}
            colors={{
              prevMonthNodesBG: colors.prevMonthNodesBG,
              currentDateNodeBG: colors.currentDateNodeBG,
              currentMonthNodesBG: colors.currentMonthNodesBG,
              nextMonthNodesBG: colors.nextMonthNodesBG
            }}
            handleDate={this.handleDate}
          />
        </div>
        <Form 
          display={this.state.btnClicked ? "grid" : "none" } 
          onExit={this.handleExit}
          date={weekDayName + monthName + dateClicked}
        />
      </div>
    );
  }
}

export default ScheduleMe