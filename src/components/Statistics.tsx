import React, {FC, ReactElement } from 'react';
import {Badge} from "./Badge";

type StatisticValues = {
  id: string;
  name: string;
  value: number;
  content: string;
}

interface StatisticsProps {
  values?: StatisticValues[];
}

export const Statistics: FC<StatisticsProps> = ({values}): ReactElement => {
  return (
    <div className="overflow-hidden flex flex-col justify-center">
      {values && values.map((v, index) =>
        <div key={index} className="mb-5 first-of-type:mt-[31px]">
          <Badge value={v.value} name={v.name} content={v.content}/>
        </div>
      )}
    </div>
  );
}
