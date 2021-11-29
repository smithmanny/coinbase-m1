import classNames from 'classnames';
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
    <Container {...props} className={classNames(classes.container, props.className)}>
      {children}
    </Container>
  )
}

export default ConsumerContainer