import React, { Component } from 'react'
import './App.css'

class Display extends Component {
  render() {
    var displayStyles = {
      width: 170,
      height: 50,
      boxShadow: 'inset 0 0 0 1px rgb(129, 87, 87)',
      borderRadius: 10,
      margin: '56px auto 72px auto',
      padding: '40px 24px',
      fontSize: '72px',
      fontWeight: 'bold',
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
    var action = props.action === 'down' ? '-'
      : props.action === 'up' ? '+'
      : props.action === 'start' ? 'Start'
      : props.action === 'pause' ? 'Pause'
      : 'Reset'

    var handler = (props.id === 'reduceSession') ? props.reduceSession
      : (props.id === 'addSession') ? props.addSession
      : (props.id === 'reduceBreak') ? props.reduceBreak
      : (props.id === 'addBreak') ? props.addBreak
      : (props.id === 'start') ? props.ticker
      : (props.id === 'pause') ? props.pause
      : props.reset

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

  // initial duration-to-time format
  componentWillMount() {
    window.addEventListener('load', this.formatTime)
  }

  // duration-to-time format for every change
  componentDidUpdate() {
    this.formatTime()
  }

  toggleActive(e) {
    var modes = Array.from(document.querySelectorAll('.mode'))

    modes.forEach((mode) => {
      mode.classList.remove('active')
    })
    e.target.parentElement.classList.add('active')
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

  formatTime(minutes) {
    var display = document.getElementById('display')
    minutes = Number(display.textContent)
    var seconds = Math.floor((minutes % (1000* 60)) / 1000)

    minutes = minutes < 10 ? `0${minutes}` : minutes
    seconds = seconds < 10 ? `0${seconds}` : seconds
    
    display.textContent = `${minutes}:${seconds}`
  }

  ticker() {
    console.log('start clicked')
  }
  
  pause() {
    console.log('pause clicked')
  }

  reset() {
    console.log('reset clicked')
  }

  render() {
    var length = {
      timerLength: this.state.session,
      breakLength: this.state.break
    }

    var plusMinus = {
      addSession: this.increaseSession.bind(this),
      reduceSession: this.decreaseSession.bind(this),
      addBreak: this.increaseBreak.bind(this),
      reduceBreak: this.decreaseBreak.bind(this),
      ticker: this.ticker.bind(this),
      pause: this.pause.bind(this),
      reset: this.reset.bind(this)
    }

    return (
      <main className="App">
        <header className="App-header">
          <h1 className="App-title">Pomodoro Clock</h1>
        </header>

        <section id='mode'>
          <div id='pomodoroLength' className='mode active'>
            <h3 ref='pomodoroLabel' className='label'
              onClick={this.toggleActive.bind(this)}>Pomodoro</h3>
            <Button action='down' {...plusMinus} id='reduceSession'/>
            <span>{this.state.session}</span>
            <Button action='up' {...plusMinus} id='addSession'/>
          </div>

          <div id='breakLength' className='mode'>
            <h3 ref='pomodoroLabel' className='label'
              onClick={this.toggleActive.bind(this)}>Break</h3>
            <Button action='down' {...plusMinus} id='reduceBreak'/>
            <span>{this.state.break}</span>
            <Button action='up' {...plusMinus} id='addBreak'/>

          </div>
        </section>
        <Display {...length} />

        <section id='controls'>
          <Button action='start' {...plusMinus} id='start'/>
          <Button action='pause' {...plusMinus} id='pause'/>
          <Button action='reset' {...plusMinus} id='reset'/>
        </section>        
      </main>
    )
  }
}

export default App
