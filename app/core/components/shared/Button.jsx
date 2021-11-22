import { default as MuiButton } from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';

const Button = ({ children, ...props }) => {
  const { ariaLabel, type } = props;
  switch(type) {
    case 'icon':
      return (
        <IconButton
          aria-label={ariaLabel}
          {...props}
        >
          {children}
        </IconButton>
      )
    default:
      return (
        <MuiButton
          aria-label={ariaLabel}
          {...props}
        >
          {children}
        </MuiButton>
      )
  }
}

Button.defaultProps = {
  "aria-label": 'button',
  type: 'default',
  variant: "contained"
}

Button.propTypes = {
  ariaLabel: PropTypes.string,
  type: PropTypes.oneOf(["icon", "default", "submit"]),
  variant: PropTypes.oneOf(["text", "outlined", "contained", undefined])
}

export default Button;
