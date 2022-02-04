import React from 'react';
import logo from './icons/logo.svg';
import close from './icons/close.svg';
import './App.css';
import {DOMMessage, DOMMessageResponse} from "./types";
import {Score} from "./components/Score";

function App() {
  const [title, setTitle] = React.useState('');
  const [url, setUrl] = React.useState('');

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
      console.log(tabs);
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        {type: 'GET_DOM'} as DOMMessage,
        (response: DOMMessageResponse) => {
          setTitle(response.title);
          setUrl(response.url);
        });
    });
  });

  return (
    <div className="bg-lightblue px-1.5 py-2.5">
      <header className="flex flex-row justify-center items-center h-auto">
        <img className="w-8 h-8" src={logo} alt="logo"/>
        <p className="w-full text-xl text-green font-semibold px-1.5 text-center">
          Wie grün ist diese Website?
        </p>
        <img className="w-8 h-8" src={close} alt="logo"/>
      </header>
      <div className="h-1/4">
        <p className="w-full text-xl text-green font-semibold text-center">
         title: {title}
          url: {url}
        </p>
      </div>
      <div className="h-2/4 bg-white"><Score/></div>
    </div>
  );
}

export default App;
