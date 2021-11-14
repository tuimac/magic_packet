import React from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { API_URL } from '../environment';

class Console extends React.Component {
  
  componentDidMount() {
    const url = 'ws://' + window.location.hostname + API_URL + '/runcommand'
    const socket = new WebSocket(url);
    let currentInput = '';
    let inputHistory = [];
    let cursor = 0;
    let historyIndex = 0;

    var term = new Terminal({
      background: '#202B33',
      foreground: '#F5F8FA',
      cursorStyle: 'block',
      fontSize: 16,
      cursorBlink: true,
      RendererType: 'canvas',
    });
    
    term.open(this.terminal);
    term.write('$ ');
    socket.addEventListener('message', (response) => {
      console.log(response);
      response = JSON.parse(response.data).result
      if(response !== false) {
        response = response.replaceAll('\n', '\r\n')
        term.write(response + '\r\n');
      } else {
        term.write('\r\n');
      }
      term.write('$ ');
    });

  	term.onKey((data) => {
      console.log(data.domEvent.key); 
      switch(data.domEvent.key) {
        case 'Enter':
          term.write('\r\n');
          if(currentInput) {
            socket.send(JSON.stringify({
              command: currentInput
            }));
          } else {
            term.write('\r\n');
            term.write('$ ');
          }
          historyIndex++;
          inputHistory.push(currentInput);
          currentInput = '';
          break;
        case 'Backspace':
          if(currentInput.length > 0) {
            term.write('\b \b');
          }
          currentInput = currentInput.substring(0, currentInput.length - 1);
          break;
        case 'ArrowUp':
          try {
            if(historyIndex > 0 && historyIndex <= inputHistory.length) {
              historyIndex--;
              for(let i = 0; i < currentInput.length; i++){
                term.write('\b \b');
              }
              currentInput = inputHistory[historyIndex];
              term.write(currentInput);
            }
          } catch(e) {
            currentInput = inputHistory[historyIndex];
            term.write(currentInput);
          }
          break;
        case 'ArrowDown':
          try {
            if(historyIndex >= 0 && historyIndex < inputHistory.length) {
              historyIndex++;
              for(let i = 0; i < currentInput.length; i++){
                term.write('\b \b');
              }
              currentInput = inputHistory[historyIndex];
              term.write(currentInput);
            }
          } catch(e) {
            currentInput = inputHistory[historyIndex];
          }
          break;
        default:
          if (cursor < 120) {
            cursor += 1;
            currentInput += data.key;
            term.write(data.key);
          }
          break;
      }
    });
  }

  render() {
    return (
      <>
        <div ref={ id => this.terminal = id }></div>
      </>
    );
  };
};

export default Console;
