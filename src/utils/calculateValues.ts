type StatisticValues = {
  id: string;
  name: string;
  value: number;
  content: string;
}

export const calculateStatisticValue = (greenHosting: boolean, pageSpeed: number, httpRequests: number, mobile: number, statValues: StatisticValues []) => {
  let value = 0;
  let green = 0;
  if (greenHosting) {
    green = 100;
  }
  if (pageSpeed) {
    pageSpeed = pageSpeed * 100
  }
  if (httpRequests <= 15) {
    httpRequests = 100
  } else if (httpRequests >= 15 && httpRequests <= 30) {
    httpRequests = 50
  } else {
    httpRequests = 0;
  }
  if (mobile) {
    mobile = mobile * 100
  }

  statValues.forEach((item) => {
    if (item.id === 'green') {
      item.value = green;
    }
    if (item.id === 'speed') {
      item.value = pageSpeed
    }
    if (item.id === 'http') {
      item.value = httpRequests
    }
    if (item.id === 'mobile') {
      item.value = mobile
    }

    value += item.value;
  })

  return (Math.round(value / statValues.length))
};
