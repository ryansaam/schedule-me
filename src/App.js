import React, { Component } from 'react';
import './App.css';

import ScheduleMe from './components/colorful-calendar/ScheduleMe.js'
import colorTheme from './components/colorful-calendar/calendar.colors.js'
import './components/colorful-calendar/Calendar.css'
import './components/colorful-calendar/mediaqueries.css'

class App extends Component {
  render() {
    return (
      <div className="App" id="app">
        <ScheduleMe date={new Date()} colors={colorTheme.purplenight} />
      </div>
    );
  }
}

export default App;
