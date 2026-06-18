interface Props {
  fill?: string;
  checked?: boolean;
  size?: number;
  onChange?: (value: boolean) => void;
}

export const CheckIcon = ({ fill = 'var(--col-pink-400)', checked = false, size = 16, onChange }: Props): JSX.Element => {
  return (
    <div onClick={() => onChange?.(!checked)} style={{ cursor: 'url(\'/cursors/pointer.png\'), pointer' }}>
      {checked
        ? (
        <svg width={size} height={size} viewBox={'0 0 17 18'} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_5550_51188)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.65405 3.6795L10.2892 3.6795L10.2892 1.00016L3.65405 1.00016C2.18826 1.00016 1 2.19974 1 3.6795L1 14.3969C1 15.8767 2.18826 17.0762 3.65405 17.0762L14.2702 17.0762C15.7361 17.0762 16.9243 15.8767 16.9243 14.3969L16.9243 11.7175L14.2702 11.7175L14.2702 14.3969L3.65405 14.3969L3.65405 3.6795ZM17.1233 1.00006L9.62566 8.48328L7.61509 6.58868L5.73839 8.48328L8.68731 11.3251C8.93618 11.5764 9.27371 11.7175 9.62566 11.7175C9.97762 11.7175 10.3151 11.5764 10.564 11.3251L19 2.89465L17.1233 1.00006Z"
              fill={fill}
            />
          </g>
          <defs>
            <filter id="filter0_d_5550_51188" x="0" y="0" width={size} height={size} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.784314 0 0 0 0 0.164706 0 0 0 0 0.760784 0 0 0 1 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5550_51188" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5550_51188" result="shape" />
            </filter>
          </defs>
        </svg>
          )
        : (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            opacity="0.6"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.5 2.50002H7.5H2.5V13.5H13.5V2.50002ZM2 1.52588e-05C0.895431 1.52588e-05 0 0.895446 0 2.00002V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2.00002C16 0.895446 15.1046 1.52588e-05 14 1.52588e-05H2Z"
            fill={fill}
          />
        </svg>
          )
      }
    </div>
  );
};
