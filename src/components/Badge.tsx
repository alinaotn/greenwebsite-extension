import React, {FC, ReactElement} from 'react';
import plus from "../icons/plus.svg";
import like from "../icons/like.svg";
import dislike from "../icons/dislike.svg";
import minus from "../icons/minus.svg";

interface BadgeProps {
  value: number;
  name: string;
  content: string;
}

export const Badge: FC<BadgeProps> = ({value, name, content}): ReactElement => {
  const [hexColor, setHexColor] = React.useState('#67837E');
  const [img, setImg] = React.useState(like);
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    if (value < 30) {
      setHexColor('#D09887')
      setImg(dislike)
    } else if (value >= 30 && value < 60) {
      setHexColor('#F0C97F')
      setImg(dislike)
    } else if (value >= 60) {
      setHexColor('#67837E')
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
        {expanded ? <span className={`text-dark-green font-medium text-lg w-320`}>{name}</span> :  <span className={`text-dark-green text-lg w-320`}>{name}</span> }
        <div className="ml-4 mr-4">
          <img className="w-8 h-8" src={img} alt="like"/>
        </div>
      </div>
      {expanded && <div className={`text-dark-green text-sm w-320 ml-[60px] pb-3 transition-all`}>{content}</div>}
    </div>
  );
}
