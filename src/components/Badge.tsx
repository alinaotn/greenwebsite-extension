import React, {FC, ReactElement} from 'react';
import InfoIcon from "./InfoIcon";

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
    <div className={`border-2 ${borderColor} h-10 flex items-center rounded-medium w-fit`}>
      <span className={`${textColor} pl-2 pr-2`}>{name}</span>
      <div className="mr-2">
        <InfoIcon color={hexColor} width="20px" height="20spx"/></div>
    </div>
  );
}
