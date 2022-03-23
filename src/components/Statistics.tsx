import React, {FC, ReactElement } from 'react';
import {Badge} from "./Badge";

type StatisticValues = {
  name: string;
  value: number;
}

interface StatisticsProps {
  values?: StatisticValues[];
}

export const Statistics: FC<StatisticsProps> = ({values}): ReactElement => {
  return (
    <div className="overflow-hidden flex flex-col justify-center">
      {values && values.map((v, index) =>
        <div key={index} className="mb-5">
          <Badge value={v.value} name={v.name}/>
        </div>
      )}
    </div>
  );
}
