import React, { Component } from 'react'
import './App.css'

class Display extends Component {
  render() {
    var displayStyles = {
      width: 100,
      height: 50,
      border: '1px solid #b4b3b3',
      borderRadius: 10,
      margin: '0 auto 36px auto',
      padding: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }

    return (
      <p id='display' style={displayStyles}>{this.props.timerLength}</p>
    )
  }
}


class Button extends Component {
  render() {
    var props = this.props
    var action = props.action === 'down' ? '-' : '+'
    var handler = (props.id === 'reduceSession') ? props.reduceSession
      : (props.id === 'addSession') ? props.addSession
      : (props.id === 'reduceBreak') ? props.reduceBreak
      : props.addBreak

    return (
      <button className='button' onClick={handler}>{action}</button>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      session: 25,
      break: 5
    }
  }

  toggleActive(e) {
    var labels = Array.from(document.querySelectorAll('.label'))

    labels.forEach(function(label) {
      label.classList.remove('active')
      e.target.classList.add('active')
    })
  }

  increaseSession() {
    this.setState((prevState) => {
      if (prevState.session < 60) {
        return {session: prevState.session + 1}
      } else {
        return {session: prevState.session}
      }
    })
  }

  decreaseSession() {
    this.setState((prevState) => {
      if (prevState.session > 1) {
        return {session: prevState.session - 1}
      } else {
        return {session: prevState.session}
      }
    })
  }

  increaseBreak() {
    this.setState((prevState) => {
      if (prevState.break < 60) {
        return {break: prevState.break + 1}
      } else {
        return {break: prevState.break}
      }
    })
  }

  decreaseBreak() {
    this.setState((prevState) => {
      if (prevState.break > 1) {
        return {break: prevState.break - 1}
      } else {
        return {break: prevState.break}
      }
    })
  }

  render() {
    var timer = {
      timerLength: this.state.session,
      breakLength: this.state.break
    }

    var plusMinus = {
      addSession: this.increaseSession.bind(this),
      reduceSession: this.decreaseSession.bind(this),
      addBreak: this.increaseBreak.bind(this),
      reduceBreak: this.decreaseBreak.bind(this)
    }
   
    return (
      <main className="App">
        <header className="App-header">
          <h1 className="App-title">Pomodoro Clock</h1>
          <p className="App-intro">Set Pomodoro and Break Duration</p>
        </header>

        <Display {...timer} />

        <section className='mode'>
          <div id='pomodoroLength'>
            <h3 ref='pomodoroLabel' className='label active'
              onClick={this.toggleActive.bind(this)}>Pomodoro</h3>
            <Button action='down' {...plusMinus} id='reduceSession'/>
            <span>{this.state.session}</span>
            <Button action='up' {...plusMinus} id='addSession'/>
          </div>

          <div id='breakLength'>
            <h3 ref='pomodoroLabel' className='label'
              onClick={this.toggleActive.bind(this)}>Break</h3>
            <Button action='down' {...plusMinus} id='reduceBreak'/>
            <span>{this.state.break}</span>
            <Button action='up' {...plusMinus} id='addBreak'/>
          </div>
        </section>
      </main>
    )
  }
}

export default App
