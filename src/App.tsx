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
  const [url, setUrl] = React.useState('');
  const [encodedUrl, setEncodedUrl] = React.useState('https%3A%2F%2Falinao.uber.space%2F');
  const [domain, setDomain] = React.useState('');
  const [greenHosting, setGreenHosting] = React.useState(false);
  const [pageSpeed, setPageSpeed] = React.useState(0);
  const [mobile, setMobile] = React.useState(0);
  const [httpRequests, setHttpRequests] = React.useState(0);
  const [spinnerLoading, setSpinnerLoading] = React.useState(true);
  const [scoreValue, setScoreValue] = React.useState(0);

  const getBrowserTabs = () => {
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        {type: 'GET_DOM'} as DOMMessage,
        async (response: DOMMessageResponse) => {
          await setUrl(response.url);
          if (url) {
            const newUrl = new URL(url);
            await setDomain(newUrl.hostname);
            await setEncodedUrl(encodeURIComponent(url));
          }
        });
    });
  }


  const fetchJson = async (apiURL: string) => {
    const response = await fetch(apiURL);
    return response.json();
  };

  React.useEffect(() => {
    getBrowserTabs();
    fetchJson(`https://admin.thegreenwebfoundation.org/api/v3/greencheck/${domain}`).then((data) => setGreenHosting(data.green));
    fetchJson(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodedUrl}&key=AIzaSyAtebrMwOKZT0CJ6zB0QHd_Ts0f6fE0Ko0`).then((data) => {
      setMobile(data.lighthouseResult.audits.viewport.score);
      setPageSpeed(data.lighthouseResult.audits['speed-index'].score);
      setHttpRequests(data.lighthouseResult.audits['network-requests'].details.items.length);
      calculateScore();
      setSpinnerLoading(false);
    })
  });

  //TODO check numeric values for red, orange, green ranking
  const statisticValues: StatisticValues[] = [
    {
      name: 'Green Hosting',
      value: greenHosting ? 100 : 5
    },
    {
      name: 'Page Speed',
      value: pageSpeed === 0 ? 5 : pageSpeed * 100
    },
    {
      name: 'HTTP Requests',
      value: httpRequests
    },
    {
      name: 'MozRank',
      value: 20
    },
    {
      name: 'Responsiveness',
      value: mobile === 0 ? 5 : mobile * 100
    },
  ]

  const calculateScore = async () => {
    let value = 0;
    await statisticValues.forEach((item) => {
      value += item.value;
    })

    setScoreValue(Math.round(value / 5));
  }

  return (
    <div className="bg-lightblue px-1.5 py-2.5 overflow-hidden">
      <header className="flex flex-row justify-center items-center h-auto">
        <img className="w-8 h-8" src={logo} alt="logo"/>
        <p className="w-full text-xl text-green font-semibold px-1.5 text-center">
          Wie grün ist diese Website?
        </p>
        <img className="w-8 h-8 cursor-pointer" src={close} alt="close" onClick={() => window.close()}/>
      </header>
      <div className="h-2/4">{!spinnerLoading && <Score value={scoreValue}/>}</div>
      <div className="h-72 w-96 mx-6 rounded-medium bg-offwhite">
        <Statistics values={statisticValues} spinnerLoading={spinnerLoading}/></div>
    </div>
  );
}

export default App;
