import { FunctionComponent } from 'react'
import PropTypes from "prop-types";
import { DatePicker as MuiDatePicker } from 'mui-rff';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import Grid from '../shared/Grid'

const DatePicker: FunctionComponent<any> = (props) => (
  <Grid item xs={props.xs} md={props.md}>
    <MuiDatePicker
      label={props.label} 
      name={props.name} 
      required={props.required} 
      dateFunsUtils={DateFnsUtils} 
      {...props}
    />
  </Grid>
);

DatePicker.defaultProps = {
  label: 'Pick a date',
  name: '',
  xs: 12,
  required: false,
};

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default DatePicker;
