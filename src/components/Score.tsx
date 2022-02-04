import React, {FC, ReactElement} from 'react';
import { ArcGauge, ArcGaugeProps } from "@progress/kendo-react-gauges";

interface ScoreProps {
  min?: number;
  max?: number;
  steps?: number;
}

export const Score: FC<ScoreProps> = ({min = 0, max = 100, steps}): ReactElement => {
  const [value, setValue] = React.useState(0);

  const colors = [
    {
      to: 33,
      color: "#D09887",
    },
    {
      from: 33,
      to: 66,
      color: "#F0C97F",
    },
    {
      from: 66,
      color: "#67837E",
    },
  ];

  React.useEffect(() => {
      setValue(90);
  }, []);

  const arcOptions: ArcGaugeProps = {
    value: value,
    colors,
    color: '#000',
    transitions: false,
  };

  return (
    <div className="bg-lightblue w-screen h-screen px-1.5 py-2.5">
      Score
      <ArcGauge {...arcOptions}   />
    </div>
  );
}
