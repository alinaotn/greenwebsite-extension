import React, {FC, ReactElement, useEffect} from 'react';
// import {Bar} from "./Bar";
import {ClipLoader} from "react-spinners";
import {Badge} from "./Badge";

type StatisticValues = {
  name: string;
  value: number;
}

interface StatisticsProps {
  values?: StatisticValues[];
  spinnerLoading?: boolean;
}

export const Statistics: FC<StatisticsProps> = ({values, spinnerLoading}): ReactElement => {
  const [loading, setLoading] = React.useState(true);

  //TODO remove loadingState if not needed or use as fallback
  useEffect(() => {
    let timeout: any;
    if (loading) {
      timeout = setTimeout(() => setLoading(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    <>
      {spinnerLoading ?
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="#67837E" loading={spinnerLoading} size={100}/>
        </div> :
        <div className="bg-offwhite mt-8 overflow-hidden flex flex-col justify-center p-2">
          {values && values.map((v, index) =>
            <div key={index} className="mb-5">
              {/*<span className="text-green text-base">{v.name}</span>*/}
              {/*<Bar value={v.value}/>*/}
              <Badge value={v.value} name={v.name}/>
            </div>
          )}
        </div>}
    </>
  );
}
