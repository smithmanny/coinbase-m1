import { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { Checkboxes as MuiCheckboxes, CheckboxesProps } from 'mui-rff';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const Checkboxes: FunctionComponent<CheckboxesProps> = (props) => {
  const { data, name, label } = props;
  return (
    <MuiCheckboxes
      {...props}
      // checkedIcon={<RadioButtonCheckedIcon />}
      icon={<RadioButtonUncheckedIcon />}
      label={label}
      name={name}
      required={true}
      data={data}
      inputProps={{ 'aria-label': label || 'Checkbox' }}
    />
  )
}

Checkboxes.defaultProps = {
  label: null
};

Checkboxes.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
}

export default Checkboxes;