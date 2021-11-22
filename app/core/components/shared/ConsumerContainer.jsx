import Container from './Container'
import { makeStyles } from 'integrations/material-ui'

const styles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4)
  },
}));


const ConsumerContainer = ({ children, ...props }) => {
  const classes = styles();
  return (
    <Container {...props} className={classes.container}>
      {children}
    </Container>
  )
}

export default ConsumerContainer