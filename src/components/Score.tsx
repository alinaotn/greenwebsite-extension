import React, {FC, ReactElement} from 'react';
import styled, {keyframes} from 'styled-components';

interface ScoreProps {
  value: number;
  color?: string;
}

const rotate = (degree: number) => keyframes`
  100% {
    transform: rotate(${degree}deg);
  }
`;

interface BarLeftProps {
  degree: number;
}

const BarLeft = styled.div<BarLeftProps>`
  animation: ${props => rotate(props.degree)} 1s linear both;
`;

const BarRight = styled.div<BarLeftProps>`
  animation: ${props => rotate(props.degree)} 1s linear both;
  animation-delay: 1s;
`;

export const Score: FC<ScoreProps> = ({value, color}): ReactElement => {
  const [degreeLeft, setDegreeLeft] = React.useState(0);
  const [degreeRight, setDegreeRight] = React.useState(0);

  React.useEffect(() => {
    if (value <= 50) {
      setDegreeLeft(360 * (value / 100));
      setDegreeRight(0);
    } else {
      setDegreeLeft(360 * (50 / 100));
      setDegreeRight(360 * ((value - 50) / 100));
    }
  }, [value])

  return (
    <div className={`w-130 h-130 rounded-50 flex flex-col justify-center items-center mx-auto relative`}>
      <div className={`w-100 h-100 relative scale-150`}>
        <div className="inner absolute bg-white"/>
        <div className="circle">
          <div className="bar left bg-offwhite">
            <BarLeft className={`progress ${color}`} degree={degreeLeft}/>
          </div>
          <div className="bar right bg-offwhite">
            <BarRight className={`progress ${color}`} degree={degreeRight}/>
          </div>
        </div>
      </div>
      <span className="text-7xl font-bold text-dark-green absolute">{value}</span>
    </div>
  );
}
