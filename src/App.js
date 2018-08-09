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
      <p id='display' style={displayStyles}>{this.props.remaining / 60}</p>
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
      break: 5,
      remaining: 1500,
      running: false,
      paused: false
    }
  }

  // initial display-to-time format
  componentDidMount() {
    this.formatTime()
  }

  // format display to time for every duration change
  componentDidUpdate() {
    this.formatTime()
  }

  // mode toggle
  toggleActive() {
    var modes = document.querySelectorAll('.mode')

    modes.forEach((mode) => {
      mode.classList.toggle('active')
    })
  }

  increaseSession() {
    if(this.state.running) { return }

    if (this.state.session < 60) {
      this.setState({session: this.state.session + 1,
        remaining: (this.state.session + 1) * 60})
    } else { return }
  }

  decreaseSession() {
    if(this.state.running) { return }

    if (this.state.session > 1) {
      this.setState({session: this.state.session - 1,
        remaining: (this.state.session - 1) * 60})
    } else { return }
  }

  increaseBreak() {
    if(this.state.running) { return }

    if (this.state.break < 60) {
      this.setState({break: this.state.break + 1,
       remaining: (this.state.break + 1) * 60})
    } else { return }
  }

  decreaseBreak() {
    if(this.state.running) { return }

    if (this.state.break > 1) {
      this.setState({break: this.state.break - 1,
        remaining: (this.state.break - 1) * 60})
    } else { return }
  }

  formatTime() {
    var duration = this.state.remaining
    var minutes = Math.floor(duration / 60, 10)
    var seconds = Math.floor(duration % 60, 10)
    var mins = minutes < 10 ? `0${minutes}` : minutes
    var secs = seconds < 10 ? `0${seconds}` : seconds
    var display = document.getElementById('display')

    display.textContent = `${mins}:${secs}`
  }

  ticker() {
    var active = document.querySelector('.active')
    
    this.setState({running: true})

    if (this.state.paused) {
      this.setState({paused: false, remaining: this.state.remaining})
    } else if (active.id === 'pomodoro') {
      this.setState({remaining: this.state.session * 60})
    } else {
      this.setState({remaining: this.state.break * 60})
    }
  
    this.ticker.timer = { running : setInterval(() => {
      var duration = this.state.remaining

      if (duration > 0) {
        duration--
      
        this.setState({remaining: duration})
      }

      // end of session
      if (duration === 0 && active.id === 'pomodoro') {
        clearInterval(this.ticker.timer.running)
        this.toggleActive()
        this.ticker()
      }

      // end of break
      if (duration === 0 && active.id === 'break') {
        clearInterval(this.ticker.timer.running)
        this.toggleActive()
        this.setState({running: false})
        return
      }

    }, 1000)}
  }
  
  pause() {
    clearInterval(this.ticker.timer.running)
    this.setState({running: false, paused: true})
  }

  reset() {
    clearInterval(this.ticker.timer.running)
    this.setState(
      {session: 25, break: 5, remaining: 1500, running: false} )
  }

  render() {
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
              {/* spread operator to pass multiple props*/}
            <Button action='down' {...plusMinus} id='reduceSession'/>
            <span >{this.state.session}</span>
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
        <Display remaining={this.state.remaining}/>

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
