import { FunctionComponent } from 'react'
import { TextField as MuiTextField } from "mui-rff"

import Grid from '../shared/Grid'

const TextField: FunctionComponent<any> = (props) => (
  <Grid item xs={props.xs} md={props.md}>
    <MuiTextField {...props} />
  </Grid>
);

TextField.defaultProps = {
  xs: 12,
}

export default TextField;