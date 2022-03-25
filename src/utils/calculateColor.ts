export const calculateColor = (value: number) => {
  if (value < 30) {
    return 'bg-red';
  } else if (value >= 30 && value < 60) {
    return 'bg-yellow';
  } else if (value >= 60) {
    return 'bg-green';
  }
};
