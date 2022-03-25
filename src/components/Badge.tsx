import React, {FC, ReactElement} from 'react';
import plus from "../icons/plus.svg";
import like from "../icons/like.svg";
import dislike from "../icons/dislike.svg";
import minus from "../icons/minus.svg";
import styled from 'styled-components';

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
  const [img, setImg] = React.useState(like);
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    if (value < 30) {
      setImg(dislike)
    } else if (value >= 30 && value < 60) {
      setImg(dislike)
    } else if (value >= 60) {
      setImg(like)
    }
  }, [value])

  return (
    <div className={`bg-mint flex flex-col rounded-medium w-400 cursor-pointer`}
         onClick={() => setExpanded(!expanded)}>
      <div className={` flex items-center h-11 `}>
        <div className="ml-4 mr-4">
          {expanded ? <img className="w-8 h-8 " src={minus} alt="minus"/> :
            <img className="w-8 h-8 " src={plus} alt="plus"/>}
        </div>
        {expanded ? <BadgeContent expanded={expanded}
                                  className={`text-dark-green font-medium text-lg w-320`}>{name}</BadgeContent> :
          <span className={`text-dark-green text-lg w-320`}>{name}</span>}
        <div className="ml-4 mr-4">
          <img className="w-8 h-8" src={img} alt="like"/>
        </div>
      </div>
      <BadgeBody expanded={expanded}>
        <div className={`text-dark-green text-sm w-320 ml-[60px] pb-3 overflow-hidden`}>{content}</div>
      </BadgeBody>
    </div>
  );
}
