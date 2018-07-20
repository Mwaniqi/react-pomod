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

class PlusButton extends Component {
  render() {
    return (
      <button className='button'
        onClick={this.props.handlePlus} >
        &uarr;
      </button>
    )
  }
}

class MinusButton extends Component {
  render() {
    return (
      <button className='button'
        onClick={this.props.handleMinus} >
        &darr;
      </button>
    )
  }
}

class SessionLength extends Component {

  render() {
    var props = this.props
    var duration = (props.id === 'pomodoro') ? props.timerLength : props.breakLength

    return(
      <React.Fragment>
        <MinusButton handleMinus={props.handleMinus} />
        <span>{duration}</span>
        <PlusButton handlePlus={props.handlePlus} />
      </React.Fragment>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pomodoro: 25,
      break: 5
    }
  }

  toggleActive(e) {
    var labels = Array.from(document.querySelectorAll('.label'))
    var displayText = document.getElementById('display')

    labels.forEach(function(label) {
      label.classList.remove('active')
      e.target.classList.add('active')
    })

    if(this.refs.pomodoroLabel.classList.contains('active')) {
      displayText.textContent = this.state.pomodoro
    } else {
      displayText.textContent = this.state.break
    }
  }

  increment() {
    this.setState((prevState) => {
      return {pomodoro: prevState.pomodoro + 1}
    })
  }

  decrement() {
    this.setState((prevState) => {
      return {pomodoro: prevState.pomodoro - 1}
    })
  }

  render() {
    var timer = {
      timerLength: this.state.pomodoro,
      breakLength: this.state.break
    }

    var plusMinus = {
      handleMinus: this.decrement.bind(this),
      handlePlus: this.increment.bind(this)
    }
   
    return (
      <main className="App">
        <header className="App-header">
          <h1 className="App-title">Pomodoro Clock</h1>
          <p className="App-intro">Set Pomodoro and Break Duration</p>
        </header>

        <Display {...timer} />
        
        <section className='controls'>
          <div id='pomodoroComp'>
            <h3 ref='pomodoroLabel' className='label active'
              onClick={this.toggleActive.bind(this)}>Pomodoro</h3>
            <SessionLength id='pomodoro' {...timer} {...plusMinus} />
          </div>
          
          <div id='breakComp'>
           <h3 ref='breakLabel' className='label'
            onClick={this.toggleActive.bind(this)}>Break</h3>
            <SessionLength id='break' {...timer} {...plusMinus} />
          </div>
        </section>
      </main>
    )
  }
}

export default App
