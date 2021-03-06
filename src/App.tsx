import React from 'react';
import close from './icons/close.svg';
import './App.css';
import {DOMMessage, DOMMessageResponse} from "./types";
import {Score} from "./components/Score";
import {Statistics} from "./components/Statistics";
import {calculateColor} from "./utils/calculateColor";
import {calculateStatisticValue} from "./utils/calculateValues";
import {Oval} from "react-loader-spinner";
import Tooltip from "./components/Tooltip";

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
    content: 'A lot of energy is used by websites in the data centre and in the transmission of data to and from the data centre. Careful selection of web hosting services can therefore have a big impact on energy efficiency and web page speeds. A score of 100 means that the website is hosted on a green server.',
  },
  {
    id: 'speed',
    name: 'Page Speed',
    value: 0,
    content: 'The Page Speed parameter measures how quickly content is visually displayed during page load. Designing for fast performance does often lead to reduced data transfer and emissions. The smaller the page weight the better the score.',

  },
  {
    id: 'http',
    name: 'HTTP Requests',
    value: 0,
    content: 'The internet boasts a vast array of resources hosted on different servers. For you to access these resources, your browser needs to be able to send HTTP requests to the servers and display the resources for you. A score of 0 doesn`t mean that there are 0 requests.The fewer requests made, the less data transfer takes place and the higher the score.'
  },
  {
    id: 'mobile',
    name: 'Responsiveness',
    value: 0,
    content: 'Is the page optimized for smartphone use? Optimized pages, do not need to load oversized media on mobile devices. They are programmed so that desktop styles do not need to be overwritten, but are designed directly for the smallest device. The higher the score, the more emphasis was placed on responsive design.'
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
  const [showScoreTooltip, setShowScoreTooltip] = React.useState(false);

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
      }, 12000);
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
    <div className="bg-hero-pattern px-6 py-5 overflow-hidden flex flex-col justify-center w-450 h-550 gap-5">
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
          <div onMouseEnter={() => setShowScoreTooltip(true)} onMouseLeave={() => setShowScoreTooltip(false)}><Score
            value={scoreValue} color={scoreColor}/> {showScoreTooltip && <Tooltip
              text="This score tells you how sustainable the website is, that you are currently visiting"
              arrowPosition="left" top="top-[12%]" left="left-[70%]" maxWidth='max-w-[28%]'/>}
          </div>
          <div className="h-270 overflow-y-auto">
            <Statistics values={statisticValues}/></div>
        </>
      }

      <div className="text-lg text-dark-green cursor-pointer">Learn more: <a href="http://greenwebsite.info/extension"  target="_blank" className="hover:underline">www.greenwebsite.info</a></div>
    </div>
  );
}

export default App;
