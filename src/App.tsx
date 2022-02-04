import React from 'react';
import logo from './icons/logo.svg';
import close from './icons/close.svg';
import './App.css';
import {DOMMessage, DOMMessageResponse} from "./types";

function App() {
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      /**
       * Sends a single message to the content script(s) in the specified tab,
       * with an optional callback to run when a response is sent back.
       *
       * The runtime.onMessage event is fired in each content script running
       * in the specified tab for the current extension.
       */

      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        {type: 'GET_DOM'} as DOMMessage,
        (response: DOMMessageResponse) => {
          console.log(response);
          setTitle(response.title);
        });
    });
  });

  return (
    <div className="bg-lightblue w-screen h-screen p-1.5">
      <header className="flex flex-row justify-center h-1/4">
        <img className="w-8 h-8" src={logo} alt="logo"/>
        <p className="text-xl text-green font-semibold px-1.5 text-center">
          Wie grün ist {title}?
        </p>
        <img className="w-8 h-8" src={close} alt="logo"/>
      </header>
      <div className="h-2/4">
      </div>
    </div>
  );
}

export default App;
