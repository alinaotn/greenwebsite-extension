import React, {FC, ReactElement} from 'react';

interface ScoreProps {
  value: number;
  max?: number;
}

export const Score: FC<ScoreProps> = ({ value, max = 100}): ReactElement => {
  return (
    <div className="mt-2 overflow-hidden flex flex-col justify-center items-center">
      <span className="text-8xl font-bold text-red">{value}</span>
      {/*<span className="text-2xl font-medium text-green">out of {max}</span>*/}
    </div>
  );
}
