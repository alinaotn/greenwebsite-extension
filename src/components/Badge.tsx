import React, {FC, ReactElement} from 'react';
import styled from 'styled-components';
import info from "../icons/info.svg";
import minimize from "../icons/minimize.svg";

interface BadgeProps {
  value: number;
  name: string;
  content: string;
}

interface BadgeBodyProps {
  expanded: boolean;
}

const BadgeBody = styled.div<BadgeBodyProps>`
  max-height: 0;
  transition-property: max-height, visibility, opacity;
  transition-duration: 200ms;
  transition-timing-function: ease-out;
  opacity: 0;
  visibility: hidden;

  ${({expanded}) =>
          expanded ? `transition-timing-function: ease-in;max-height: 128px; opacity: 1; visibility: visible` : ''};
`;

const BadgeContent = styled.div<BadgeBodyProps>`
  transition-property: opacity, visibility;
  transition-duration: 350ms;
  opacity: 0;
  visibility: hidden;

  ${({expanded}) =>
          expanded ? `opacity: 1; visibility: visible;` : ''};
`;

export const Badge: FC<BadgeProps> = ({value, name, content}): ReactElement => {
  const [color, setColor] = React.useState('');
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    if (value < 30) {
      setColor('border-red');
    } else if (value >= 30 && value < 60) {
      setColor('border-yellow');
    } else if (value >= 60) {
      setColor('border-green');
    }
  }, [value])

  return (
    <div className={`bg-mint flex flex-col rounded-medium w-400 cursor-pointer`}
         onClick={() => setExpanded(!expanded)}>
      <div className={`flex items-center h-11 justify-between`}>
        <div className="flex items-center">
          {expanded ? <BadgeContent expanded={expanded}
                                    className={`text-dark-green font-medium text-lg ml-4 mr-2`}>{name}</BadgeContent> :
            <span className={`text-dark-green text-lg ml-4 mr-2`}>{name}</span>}
          <div>
            {expanded ? <img className="w-5 h-5 " src={minimize} alt="minimize"/> :
              <img className="w-5 h-5 " src={info} alt="info"/>}
          </div>
        </div>
        <div className="ml-4 mr-4">
          <div className={`border-[3px] bg-transparent rounded-round ${color} w-17 h-17`}/>
        </div>
      </div>
      <BadgeBody expanded={expanded}>
        <div className={`text-dark-green text-sm w-320 ml-4 pb-3 overflow-hidden`}>{content}</div>
      </BadgeBody>
    </div>
  );
}
