import logo from './icon.png';
import './App.css';
import React from 'react';
import Message from './components/message.component';
import Guidelines from './components/guidelines.component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Annotate4Ukraine
        </h1>
      </header>
      <body>
        <div>
          <Guidelines/>
        </div>
        <div>
          <Message/>
        </div>
      </body>
    </div>
  )
}

export default App