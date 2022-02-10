import React, {FC, ReactElement} from 'react';
import GaugeChart from 'react-gauge-chart';

interface ScoreProps {
  min?: number;
  max?: number;
  steps?: number;
}

export const Score: FC<ScoreProps> = ({min = 0, max = 100, steps}): ReactElement => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(90);
  }, []);

  return (
    <div className="relative bg-lightblue w-screen h-screen overflow-hidden px-1.5 py-2.5">
      <span className="absolute top-52 left-44 text-7xl font-bold text-green" style={{width: "100%", height: "100%"}}>{value}</span>
      <GaugeChart hideText colors={['#D09887', '#F0C97F', '#759051']} cornerRadius={10} needleColor="#9FB1BA" needleBaseColor="#9FB1BA" arcPadding={0.015}/>
    </div>
  );
}
