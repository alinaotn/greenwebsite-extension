import React, {FC, ReactElement} from 'react';
import plus from "../icons/plus.svg";
import like from "../icons/like.svg";

interface BadgeProps {
  value: number;
  name: string;
}

export const Badge: FC<BadgeProps> = ({value, name}): ReactElement => {
  const [borderColor, setBorderColor] = React.useState('border-green');
  const [textColor, setTextColor] = React.useState('text-green');
  const [hexColor, setHexColor] = React.useState('#67837E');

  React.useEffect(() => {
    if (value < 30) {
      setBorderColor('border-red');
      setTextColor('text-red');
      setHexColor('#D09887')
    } else if (value >= 30 && value < 60) {
      setBorderColor('border-yellow');
      setTextColor('text-yellow');
      setHexColor('#F0C97F')
    } else if (value >= 60) {
      setBorderColor('border-green');
      setTextColor('text-green');
      setHexColor('#67837E')
    }
  }, [value])


  return (
    <div className={`bg-mint h-11 flex items-center rounded-medium w-400`}>
      <div className="ml-4 mr-4">
        <img className="w-8 h-8 cursor-pointer" src={plus} alt="plus"/>
      </div>
      <span className={`text-dark-green text-lg w-320`}>{name}</span>
      <div className="ml-4 mr-4">
        <img className="w-8 h-8" src={like} alt="like"/>
      </div>
    </div>
  );
}
