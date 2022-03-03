import React from 'react';
import logo from './icons/logo.svg';
import close from './icons/close.svg';
import './App.css';
import {DOMMessage, DOMMessageResponse} from "./types";
import {Score} from "./components/Score";
import {Statistics} from "./components/Statistics";

type StatisticValues = {
  name: string;
  value: number;
}

function App() {
  const [title, setTitle] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [encodedUrl, setEncodedUrl] = React.useState('https%3A%2F%2Falinao.uber.space%2F');
  const [domain, setDomain] = React.useState('');
  const [greenHosting, setGreenHosting] = React.useState(false);
  const [pageSpeed, setPageSpeed] = React.useState('');
  const [mobile, setMobile] = React.useState(0);

  //TODO wait for response to fetch
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
          if (url) {
            const newUrl = new URL(url);
            setDomain(newUrl.hostname);
            setEncodedUrl(encodeURIComponent(url));
          }
        });
    });
  });

  React.useEffect(() => {
    fetch(`https://admin.thegreenwebfoundation.org/api/v3/greencheck/${domain}`)
      .then(response => response.json())
      .then(data => {
        setGreenHosting(data.green);
        console.log(data)
      });

  }, [domain]);

  React.useEffect(() => {
    fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodedUrl}&key=AIzaSyAtebrMwOKZT0CJ6zB0QHd_Ts0f6fE0Ko0`, {
      headers: {
        'Accept': `application/json`,
      }
    })
      .then(response => response.json())
      .then(data => {
        setMobile(data.lighthouseResult.audits.viewport.score);
        console.log(data)
      });
  }, []);

  const statisticValues: StatisticValues[] = [
    {
      name: 'Green Hosting',
      value: greenHosting ? 100 : 5
    },
    {
      name: 'Page Speed',
      value: 20
    },
    {
      name: 'HTTP Requests',
      value: 40
    },
    {
      name: 'MozRank',
      value: 20
    },
    {
      name: 'Responsiveness',
      value: mobile === 0 ? 1 : mobile * 100
    },
  ]

  return (
    <div className="bg-lightblue px-1.5 py-2.5 overflow-hidden">
      <header className="flex flex-row justify-center items-center h-auto">
        <img className="w-8 h-8" src={logo} alt="logo"/>
        <p className="w-full text-xl text-green font-semibold px-1.5 text-center">
          Wie grün ist diese Website?
          {url} {title}
        </p>
        <img className="w-8 h-8 cursor-pointer" src={close} alt="logo" onClick={() => window.close()}/>
      </header>
      <div className="h-2/4"><Score/></div>
      <div className="h-72 w-96 mx-6 rounded-medium bg-offwhite"><Statistics values={statisticValues}/></div>
    </div>
  );
}

export default App;
