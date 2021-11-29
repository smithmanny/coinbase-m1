import { makeStyles } from 'integrations/material-ui'

export default makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  logo: {
    "&:hover": {
      cursor: "pointer"
    }
  },
}));
