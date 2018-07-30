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
      fontSize: '62px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }

    return (
      <p id='display' style={displayStyles}>{this.props.sessionLength}</p>
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

  // initial display-to-time format
  componentDidMount() {
    var display = document.getElementById('display')

    display.textContent = `${display.textContent}:00`
  }

  // display-to-time format for every duration change
  componentDidUpdate() {
    this.formatTime()
  }

  toggleActive(e) {
    var modes = Array.from(document.querySelectorAll('.mode'))
    var display = document.getElementById('display')
    var parentEl = e.target.parentElement

    modes.forEach((mode) => {
      mode.classList.remove('active')
    })
    parentEl.classList.add('active')
    display.textContent = parentEl.children[2].textContent
    display.dataset.mode = parentEl.children[0].textContent.toLowerCase()

    this.formatTime()
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
    var mode = document.querySelector('.active')
    var display = document.getElementById('display')

    if (mode.id === 'pomodoro') {
      minutes = this.state.session
    } else {
      minutes = this.state.break
    }

    var seconds = Math.floor((minutes % (1000* 60)) / 1000)
    var mins = minutes < 10 ? `0${minutes}` : minutes
    var secs = seconds < 10 ? `0${seconds}` : seconds
    
    display.textContent = `${mins}:${secs}`
  }

  ticker(duration) {
    var active = document.querySelector('.active')
    var pomodoro = document.getElementById('pomodoro')
    var rest = document.getElementById('break')
    var startTime = new Date().getTime()

    if (active.id === 'pomodoro') {
      duration = this.state.session * 60
    } else {
      duration = this.state.break * 60
    }

    setInterval(() => {
      var endTime = startTime + duration

      console.log('startTime', startTime)
      console.log('endTime', endTime)
      console.log('length', duration)

      if (duration > 0) {
        duration--
      } else {
        pomodoro.classList.remove('active')
        rest.classList.add('active')
        duration = this.state.break * 60
        this.ticker(duration)
      }

      var minutes = Math.floor(duration / 60, 10);
      var seconds = Math.floor(duration % 60, 10);

      var display = document.getElementById('display')
      var mins = minutes < 10 ? `0${minutes}` : minutes
      var secs = seconds < 10 ? `0${seconds}` : seconds
      
      display.textContent = `${mins}:${secs}`
    }, 1000)
  }
  
  pause() {
    console.log('pause clicked')
  }

  reset() {
    this.setState({
        session: 25,
        break:5
    })
  }

  render() {
    var length = {
      sessionLength: this.state.session,
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
          <div id='pomodoro' className='mode active'>
            <h3 className='label'
              onClick={this.toggleActive.bind(this)}>Pomodoro</h3>
            <Button action='down' {...plusMinus} id='reduceSession'/>
            <span>{this.state.session}</span>
            <Button action='up' {...plusMinus} id='addSession'/>
          </div>

          <div id='break' className='mode'>
            <h3 className='label'
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
