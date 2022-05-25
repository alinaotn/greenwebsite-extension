export interface Props {
  text: string;
  arrowPosition?: 'bottom' | 'left';
  textColor?: string;
  backgroundColor?: string;
  hexColor?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  maxWidth?: string
}

export default function Tooltip({
                                  text,
                                  arrowPosition = 'bottom',
                                  textColor,
                                  backgroundColor = 'bg-mint',
                                  hexColor = '#E2F0DA',
                                  top = "top-[0]",
                                  right = "right-[0]",
                                  bottom = "bottom-[0]",
                                  left = "left-[0]",
                                  maxWidth
                                }: Props) {
  return (
    <div
      className={` ${backgroundColor} p-2 w-fit h-fit flex items-center justify-center rounded-medium absolute ${maxWidth} ${top} ${right} ${bottom} ${left}`}>
      <p className={`${textColor} leading-none text-gray-800 text-lg`}>{text}</p>
      {arrowPosition === 'bottom' ?
        <svg className="absolute z-10 right-[10%] bottom-[-10px] " width={16} height={10} viewBox="0 0 16 10" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M8 10L0 0L16 1.41326e-06L8 10Z" fill={hexColor}/>
        </svg>
        :
        <svg className="absolute z-10  left-[-10px] " width="10" height="16" viewBox="0 0 10 16" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M0 8L10 0L10 16L0 8Z" fill={hexColor}/>
          </g>
        </svg>
      }
    </div>
  );
}
