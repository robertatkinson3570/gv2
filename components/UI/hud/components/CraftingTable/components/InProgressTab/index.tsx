import { IndentedPanel } from 'components/UI/component';
import { Loader } from 'components/UI/elements';
import styles from './styles';

export const InProgressTab = (): JSX.Element => {
  return (
    <IndentedPanel hideSides={{ top: true }} padding={1.2}>
      <div className="tab-inner">
        <div>
          <Loader size={0.3} color="white" />
        </div>
        <div className="in-progress">
          <p className="label">Crafting now:</p>
          <p className="total">3 items</p>
        </div>
      </div>
      <style jsx>{styles}</style>
    </IndentedPanel>
  );
};
