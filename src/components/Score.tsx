import React, {FC, ReactElement} from 'react';

interface ScoreProps {
  value: number;
  max?: number;
}

export const Score: FC<ScoreProps> = ({value, max = 100}): ReactElement => {
  const [linearGradient, setLinearGradient] = React.useState('');
  //TODO add color check via value
  //TODO understand LinearGradient and calculate percent via value

  React.useEffect(() => {
    setLinearGradient('linear-gradient(270deg, #0C3B2E 50%, #F3F5F6 50%), linear-gradient(0deg, #0C3B2E 50%, #F3F5F6 50%)')
  }, [])

  return (
    <div className={`w-135 h-135 rounded-50 flex flex-col justify-center items-center mx-auto `} style={{background: `${linearGradient}`}}>
      <div
        className="w-130 h-130 bg-white overflow-hidden rounded-50 flex flex-col justify-center items-center">
        <span className="text-8xl font-bold text-red">{value}</span>
      </div>
    </div>
  );
}
