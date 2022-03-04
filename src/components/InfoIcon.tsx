export interface Props {
  width?: string;
  height?: string;
  color?: string;
}

export default function InfoIcon({width = "16px", height= "16px", color}: Props) {
  return (
    <svg width={`${width}`} height={`${height}`} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.99968 7.33337C7.82287 7.33337 7.6533 7.40361 7.52827 7.52864C7.40325 7.65366 7.33301 7.82323 7.33301 8.00004V10.6667C7.33301 10.8435 7.40325 11.0131 7.52827 11.1381C7.6533 11.2631 7.82287 11.3334 7.99968 11.3334C8.17649 11.3334 8.34606 11.2631 8.47108 11.1381C8.59611 11.0131 8.66634 10.8435 8.66634 10.6667V8.00004C8.66634 7.82323 8.59611 7.65366 8.47108 7.52864C8.34606 7.40361 8.17649 7.33337 7.99968 7.33337ZM8.25301 4.72004C8.0907 4.65336 7.90865 4.65336 7.74634 4.72004C7.66451 4.75177 7.58975 4.79935 7.52634 4.86004C7.46746 4.92484 7.42011 4.99925 7.38634 5.08004C7.34902 5.15916 7.33076 5.24592 7.33301 5.33337C7.3325 5.42111 7.34932 5.50809 7.3825 5.58931C7.41567 5.67054 7.46456 5.74441 7.52634 5.80671C7.59114 5.86559 7.66555 5.91295 7.74634 5.94671C7.84734 5.9882 7.95699 6.00425 8.06564 5.99345C8.1743 5.98265 8.27863 5.94532 8.36949 5.88475C8.46034 5.82419 8.53492 5.74223 8.58668 5.64609C8.63845 5.54995 8.6658 5.44256 8.66634 5.33337C8.66389 5.15686 8.59483 4.9878 8.47301 4.86004C8.40961 4.79935 8.33484 4.75177 8.25301 4.72004ZM7.99968 1.33337C6.68114 1.33337 5.3922 1.72437 4.29588 2.45691C3.19955 3.18945 2.34506 4.23064 1.84048 5.44882C1.3359 6.66699 1.20387 8.00744 1.46111 9.30064C1.71834 10.5938 2.35328 11.7817 3.28563 12.7141C4.21798 13.6464 5.40587 14.2814 6.69908 14.5386C7.99228 14.7958 9.33273 14.6638 10.5509 14.1592C11.7691 13.6547 12.8103 12.8002 13.5428 11.7038C14.2753 10.6075 14.6663 9.31858 14.6663 8.00004C14.6663 7.12456 14.4939 6.25765 14.1589 5.44882C13.8238 4.63998 13.3328 3.90505 12.7137 3.286C12.0947 2.66694 11.3597 2.17588 10.5509 1.84084C9.74206 1.50581 8.87516 1.33337 7.99968 1.33337V1.33337ZM7.99968 13.3334C6.94484 13.3334 5.9137 13.0206 5.03664 12.4345C4.15957 11.8485 3.47599 11.0156 3.07232 10.041C2.66865 9.06648 2.56303 7.99412 2.76882 6.95956C2.97461 5.92499 3.48256 4.97468 4.22844 4.2288C4.97432 3.48292 5.92463 2.97497 6.9592 2.76919C7.99376 2.5634 9.06612 2.66902 10.0407 3.07268C11.0152 3.47635 11.8481 4.15994 12.4342 5.037C13.0202 5.91406 13.333 6.94521 13.333 8.00004C13.333 9.41453 12.7711 10.7711 11.7709 11.7713C10.7707 12.7715 9.41417 13.3334 7.99968 13.3334V13.3334Z"
        fill={`${color}`}/>
    </svg>
  );
}