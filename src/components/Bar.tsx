import React, {FC, ReactElement} from 'react';

interface BarProps {
  value: number;
}

export const Bar: FC<BarProps> = ({value}): ReactElement => {
  const [color, setColor] = React.useState('bg-green');
  const [width, setWidth] = React.useState(368);

  React.useEffect(() => {
    if (value < 30) {
      setColor('bg-red');
    } else if (value >= 30 && value < 60) {
      setColor('bg-yellow');
    } else if (value >= 60) {
      setColor('bg-green');
    }
    setWidth(calculateWidth(value));
    console.log(value);
  }, [value])

  function calculateWidth(value: number) {
    return (368 * value) / 100;
  }

  return (
    <div className={`${color} h-2 rounded-medium mt-2`} style={{width: `${width}px`}}/>
  );
}
