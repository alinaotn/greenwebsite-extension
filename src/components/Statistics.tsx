import React, {FC, ReactElement, useEffect} from 'react';
import {Bar} from "./Bar";
import {ClipLoader} from "react-spinners";

type StatisticValues = {
  name: string;
  value: number;
}

interface StatisticsProps {
  values?: StatisticValues[];
}

export const Statistics: FC<StatisticsProps> = ({values}): ReactElement => {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    let timeout: any;
    if (loading) {
      timeout = setTimeout(() => setLoading(false), 1000);
    }
    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    <>
      {loading ?
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="#67837E" loading={loading} size={100}/>
        </div> :
        <div className="bg-offwhite mt-8 overflow-hidden flex flex-col justify-center p-2">
          {values && values.map((v, index) =>
            <div key={index} className="mb-4">
              <span className="text-green text-base">{v.name}</span>
              <Bar value={v.value}/>
            </div>
          )}
        </div>}
    </>
  );
}
