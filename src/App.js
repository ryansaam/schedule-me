import React, { Component } from 'react';
import './App.css';

import ScheduleMe from './components/schedule-me/ScheduleMe.js'
import colorTheme from './components/schedule-me/calendar.colors.js'

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
