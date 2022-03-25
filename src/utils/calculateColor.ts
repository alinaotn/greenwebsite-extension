export const calculateColor = (value: number) => {
  if (value < 30) {
    // return '#D09887';
    return 'bg-red';
  } else if (value >= 30 && value < 60) {
    // return '#F0C97F'
    return 'bg-yellow';
  } else if (value >= 60) {
    // return '#67837E'
    return 'bg-green';
  }
};
