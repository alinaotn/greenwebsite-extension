import React from 'react';
import close from './icons/close.svg';
import './App.css';
import {DOMMessage, DOMMessageResponse} from "./types";
import {Score} from "./components/Score";
import {Statistics} from "./components/Statistics";
import {calculateColor} from "./utils/calculateColor";
import {calculateStatisticValue} from "./utils/calculateValues";
import {Oval} from "react-loader-spinner";

type StatisticValues = {
  id: string;
  name: string;
  value: number;
  content: string;
}

let statisticValues: StatisticValues[] = [
  {
    id: 'green',
    name: 'Green Hosting',
    value: 0,
    content: 'Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. ',
  },
  {
    id: 'speed',
    name: 'Page Speed',
    value: 0,
    content: 'Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. ',

  },
  {
    id: 'http',
    name: 'HTTP Requests',
    value: 0,
    content: 'Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. '
  },
  {
    id: 'mobile',
    name: 'Responsiveness',
    value: 0,
    content: 'Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. '
  },
]

function App() {
  const [url, setUrl] = React.useState('');
  const [encodedUrl, setEncodedUrl] = React.useState('');
  const [domain, setDomain] = React.useState('');
  const [greenHosting, setGreenHosting] = React.useState(false);
  const [pageSpeed, setPageSpeed] = React.useState(0);
  const [mobile, setMobile] = React.useState(0);
  const [httpRequests, setHttpRequests] = React.useState(0);
  const [spinnerLoading, setSpinnerLoading] = React.useState(true);
  const [scoreValue, setScoreValue] = React.useState(0);
  const [scoreColor, setScoreColor] = React.useState('');
  const [loadingTitle, setLoadingTitle] = React.useState('Please wait...');

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
    })
  });

  React.useEffect(() => {
    timeLoadingTitle();
    calculateScore();

    let timeout: any;
    if (spinnerLoading) {
      timeout = setTimeout(() => {
        setSpinnerLoading(false)
      }, 10000);
    }
    return () => clearTimeout(timeout);

  }, [greenHosting, pageSpeed, mobile, httpRequests])

  const timeLoadingTitle = () => {
    let timeout: any;
    if (spinnerLoading) {
      timeout = setTimeout(() => {
        setLoadingTitle('Almost there...')
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }

  const calculateScore = () => {
    let value = calculateStatisticValue(greenHosting, pageSpeed, httpRequests, mobile, statisticValues);
    setScoreValue(value);

    const scoreHex = calculateColor(scoreValue);
    if (scoreHex) {
      setScoreColor(scoreHex);
    }
  }

  return (
    <div className="bg-hero-pattern px-6 py-5 overflow-hidden flex flex-col justify-center w-450 h-550 gap-7">
      <header className="flex flex-row justify-between items-center h-auto">
        <p className=" text-2xl text-dark-green font-semibold px-1.5 text-center">
          How green is this Website?
        </p>
        <img className="w-8 h-8 cursor-pointer" src={close} alt="close" onClick={() => window.close()}/>
      </header>
      {spinnerLoading ?
        <div className="flex flex-col items-center h-full">
          <Oval
            ariaLabel="loading-indicator"
            height={135}
            width={135}
            strokeWidth={2}
            color="#0C3B2E"
            secondaryColor="#F3F5F6"
          />
          <div className="text-lg text-dark-green mt-20">{loadingTitle}</div>
        </div>
        :
        <>
          <div><Score value={scoreValue} color={scoreColor}/></div>
          <div className="h-250 overflow-y-auto">
            <Statistics values={statisticValues}/></div>
        </>
      }
      <div className="text-lg text-dark-green cursor-pointer">Learn more: www.greenwebsite.info</div>
    </div>
  );
}

export default App;
