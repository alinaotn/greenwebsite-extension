import React, {FC, ReactElement} from 'react';

interface ScoreProps {
  max?: number;
}

export const Score: FC<ScoreProps> = ({ max = 100}): ReactElement => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(20);
  }, []);

  return (
    <div className="bg-lightblue mt-2 overflow-hidden flex flex-col justify-center items-center">
      <span className="text-8xl font-bold text-red">{value}</span>
      <span className="text-2xl font-medium text-green">out of {max}</span>
    </div>
  );
}
