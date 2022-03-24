import React from 'react';
import close from './icons/close.svg';
import './App.css';
import {DOMMessage, DOMMessageResponse} from "./types";
import {Score} from "./components/Score";
import {Statistics} from "./components/Statistics";
import {ClipLoader} from "react-spinners";

type StatisticValues = {
  name: string;
  value: number;
  content: string;
}

let statisticValues: StatisticValues[] = [
  {
    name: 'Green Hosting',
    value: 0,
    content: 'Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. ',
  },
  {
    name: 'Page Speed',
    value: 0,
    content: 'Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. ',

  },
  {
    name: 'HTTP Requests',
    value: 0,
    content: 'Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. Green Hosting is super! Pleas use it. '
  },
  {
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
    calculateScore();

    let timeout: any;
    if (spinnerLoading) {
      timeout = setTimeout(() => {
        setSpinnerLoading(false)
      }, 12000);
    }
    return () => clearTimeout(timeout);

  }, [greenHosting, pageSpeed, mobile, httpRequests])

  const convertStatisticValues = () => {
//TODO algorithm to calculate values
    statisticValues = [
      {
        name: 'Green Hosting',
        value: greenHosting ? 100 : 0,
        content: 'Green Hosting is super! Pleas use it.'

      },
      {
        name: 'Page Speed',
        value: pageSpeed * 100,
        content: 'Green Hosting is super! Pleas use it.'

      },
      {
        name: 'HTTP Requests',
        value: httpRequests <= 15 ? 100 : 0,
        content: 'Green Hosting is super! Pleas use it.'

      },
      {
        name: 'Responsiveness',
        value: mobile * 100,
        content: 'Green Hosting is super! Pleas use it.'

      },
    ]
  }

  const calculateScore = () => {
    // let value = 0;
    // console.log(statisticValues);
    // statisticValues.forEach((item) => {
    //   value += item.value;
    // })
    console.log('greenHosting', greenHosting);
    console.log('pageSpeed', pageSpeed);
    console.log('httpRequests', httpRequests);
    console.log('mobile', mobile);
    //TODO work on algorithm for parameters and push values to statisticValues
    const green = greenHosting ? 100 : 0;
    let value = green + (pageSpeed * 100) + httpRequests + (mobile * 100);
    setScoreValue(Math.round(value / 4));
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
          <ClipLoader color="#67837E" loading={spinnerLoading} size={130} speedMultiplier={0.8}/>
          <div className="text-dark-green mt-20">Please wait...</div>
        </div>
        :
        <>
          <div><Score value={scoreValue}/></div>
          <div className="h-250 overflow-y-auto">
            <Statistics values={statisticValues}/></div>
        </>
      }
      <div className="text-dark-green">Learn more: www.greenwebsite.com</div>
    </div>
  );
}

export default App;
