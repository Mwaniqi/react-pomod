import React, { Component } from 'react';
import './App.css';

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

class Break extends Component{
  render() {
    return(
      <div>
        <h3>Break</h3>
        <MinusButton handleMinus={this.props.handleMinus}/>
        <span>{this.props.breakLength}</span>
        <PlusButton handlePlus={this.props.handlePlus}/>
      </div>
    )
  }
}

class Pomodoro extends Component{
  render() {
    return(
      <div>
        <h3>Pomodoro</h3>
        <MinusButton 
          // {...this.props}
          handleMinus={this.props.handleMinus}
        />
        <span>{this.props.timerLength}</span>
        <PlusButton
          // {...this.props}
          handlePlus={this.props.handlePlus}
        />
      </div>
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
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Pomodoro Clock</h1>
          <p className="App-intro">Set Timer and Break Duration</p>
        </header>
        <Display 
          timerLength={this.state.time}
          breakLength={this.state.break}
        />
        <div className='controls'>
          <Pomodoro 
            {...this.props}
            // timerLength={this.state.time}
            // breakLength={this.state.break}
            // handleMinus={this.decrement.bind(this)}
            // handlePlus={this.increment.bind(this)}
          />
          <Break
            timerLength={this.state.time}
            breakLength={this.state.break}
            handleMinus={this.decrement.bind(this)}
            handlePlus={this.increment.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
