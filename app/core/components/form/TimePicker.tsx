import { FunctionComponent } from 'react'
import PropTypes from "prop-types";
import { TimePicker as MuiTimePicker } from 'mui-rff';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import Grid from '../shared/Grid'

const TimePicker: FunctionComponent<any> = (props) => (
  <Grid item xs={props.xs} md={props.md}>
    <MuiTimePicker
      label={props.label}
      name={props.name}
      required={props.required}
      dateFunsUtils={DateFnsUtils}
      {...props}
    />
  </Grid>
);

TimePicker.defaultProps = {
  label: 'Pick a time',
  name: '',
  xs: 12,
  required: false,
};

TimePicker.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default TimePicker;
