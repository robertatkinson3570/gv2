import styles from './styles';
import { CloseIcon, ZoomInIcon } from 'components/UI/elements';
import { getThemeColor } from 'helpers/functions';
import _ from 'lodash';
interface Props {
  value: string;
  onChange: (e: string) => void;
  placeholder: string;
  isParcel?: boolean;
  color?: string;
  width?: string;
  height?: string;
  fontFamily?: 'Pixelar' | 'Kimberley Rg';
  fontSize?: string;
  shadow?: boolean;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder,
  isParcel = false,
  color = 'pink',
  width,
  height,
  fontFamily = 'Pixelar',
  fontSize = '2rem',
  shadow = true,
}: Props): JSX.Element => {
  const handleClose = () => {
    onChange('');
  };

  const handleChange = _.debounce((e) => onChange(e.target.value), 500);

  return (
    <>
      <div className={`input-container ${isParcel ? 'parcel' : ''}`}>
        <span className="icon clickable" onClick={() => onChange('')}>
          <ZoomInIcon fill={getThemeColor(color, 400)} size={20} />
        </span>
        <input
          className={`search-input ${getThemeColor(color)} ${shadow ? 'shadow' : ''}`}
          type="search"
          defaultValue={value}
          onChange={handleChange}
          placeholder={placeholder}
          style={{ fontFamily, fontSize }}
        />
        {value && (
          <span className="close-icon clickable" onClick={handleClose}>
            <CloseIcon fill={getThemeColor(color, 400)} size={14} />
          </span>
        )}
      </div>
      <style jsx>{`
        .input-container {
          --width: ${width || '100%'};
          --height: ${height || '4.2rem'};
        }
      `}</style>
      <style jsx>{styles}</style>
    </>
  );
};
