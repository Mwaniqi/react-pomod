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

    return(
      <p style={displayStyles}>{this.props.timerLength}</p>
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

// class Break extends Component{
//   render() {
//     return(
//       <div>
//         <h3>Break</h3>
//         <MinusButton handleMinus={this.props.handleMinus}/>
//         <span>{this.props.breakLength}</span>
//         <PlusButton handlePlus={this.props.handlePlus}/>
//       </div>
//     )
//   }
// }

class SessionLength extends Component {
  toggleActive(e) {
    var labels = Array.from(document.querySelectorAll('.label'))

    labels.forEach(function(label) {
      label.classList.remove('active')
      e.target.classList.add('active')
    })
  }

  render() {
    var props = this.props
    var duration = (props.id === 'pomodoro') ? props.timerLength : props.breakLength
    // var activated = (props.id === 'pomodoro') ? 'active' : null

    return(
      <React.Fragment>
        <h3 className='label' onClick={this.toggleActive.bind(this)}>{props.id}</h3>
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
      time: 25,
      break: 5
    }
  }  

  increment() {
    console.log('plusBtn')
    this.setState((prevState) => {
      return {time: prevState.time + 1}
    })
  }

  decrement() {
    console.log('minusBtn')
    this.setState((prevState) => {
      return {time: prevState.time - 1}
    })
  }

  render() {
    var timer = {
      timerLength: this.state.time,
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
          <div>
          {/* <input name='select' type='radio'></input> */}
            <SessionLength id='pomodoro'
              {...timer} {...plusMinus} />
          </div>
          
          <div>
          {/* <input name='select' type='radio'></input> */}
            <SessionLength id='break'
            {...timer} {...plusMinus} />
          </div>
        </section>
      </main>
    )
  }
}

export default App
