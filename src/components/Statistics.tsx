import React, {FC, ReactElement} from 'react';
import {Bar} from "./Bar";

type StatisticValues = {
  name: string;
  value: number;
}

interface StatisticsProps {
  values?: StatisticValues[];
}

export const Statistics: FC<StatisticsProps> = ({values}): ReactElement => {

  return (
    <div className="bg-offwhite mt-8 overflow-hidden flex flex-col justify-center p-2">
      {values && values.map((v) =>
        <div className="mb-4">
          <span className="text-green text-base">{v.name}</span>
          <Bar value={v.value}/>
        </div>
      )}
    </div>
  );
}
