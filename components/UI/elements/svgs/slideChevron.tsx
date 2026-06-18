interface Props {
  fill?: string;
  size?: number;
  direction?: 'left' | 'right';
}

export const SlideChevron = ({ fill = 'var(--col-info-400)', size = 20, direction = 'left' }: Props): JSX.Element => {
  return (
    <svg
      style={{ transform: direction === 'right' ? 'rotate(180deg)' : 'rotate(0deg)' }}
      width={size}
      height={size}
      viewBox="0 0 23 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_3640_47047)">
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M18.1456 3L20 5.02356L11.6544 14.0852L9.8 12.0616L18.1456 3Z"
          fill={fill}
          shapeRendering="crispEdges"
        />
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M18.1456 21.1333L20 19.1098L11.6544 10.0481L9.8 12.0717L18.1456 21.1333Z"
          fill={fill}
          shapeRendering="crispEdges"
        />
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M11.3456 3L13.2 5.02356L4.85439 14.0852L3 12.0616L11.3456 3Z"
          fill={fill}
          shapeRendering="crispEdges"
        />
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M11.3456 21.1333L13.2 19.1098L4.85439 10.0481L3 12.0717L11.3456 21.1333Z"
          fill={fill}
          shapeRendering="crispEdges"
        />
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M18.3299 2.8311L18.1461 2.63047L17.9617 2.83064L11.6544 9.67911L11.6539 9.67861L11.4703 9.87903L11.4701 9.87923L9.61611 11.8923L9.46052 12.0612L9.46552 12.0667L9.46052 12.0721L9.61611 12.2411L11.47 14.254L11.4701 14.2541L11.6539 14.4547L11.6544 14.4542L17.9617 21.3027L18.1461 21.5029L18.3299 21.3022L20.1843 19.2787L20.3395 19.1094L20.1839 18.9404L13.8533 12.0667L20.1839 5.19293L20.3395 5.02399L20.1843 4.85466L18.3299 2.8311ZM11.5299 2.8311L11.3461 2.63047L11.1617 2.83064L4.85439 9.67911L4.85393 9.67861L4.67032 9.87897L4.67008 9.87923L2.81611 11.8923L2.66052 12.0612L2.66552 12.0667L2.66052 12.0721L2.81611 12.2411L4.67008 14.2541L4.85393 14.4547L4.85439 14.4542L11.1617 21.3027L11.3461 21.5029L11.5299 21.3022L13.3843 19.2787L13.5395 19.1094L13.3839 18.9404L7.05329 12.0667L13.3839 5.19293L13.5395 5.02399L13.3843 4.85466L11.5299 2.8311Z"
          stroke="black"
          strokeOpacity="0.4"
          strokeWidth="0.5"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3640_47047"
          x="0.320801"
          y="0.260986"
          width="22.3584"
          height="23.6113"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.72549 0 0 0 0 0.882353 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3640_47047" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3640_47047" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};
