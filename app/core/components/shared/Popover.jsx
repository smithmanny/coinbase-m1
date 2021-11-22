import { default as PopoverMUI } from "@material-ui/core/Popover";
import PropTypes from "prop-types";

const Popover = ({ anchorEl, children, handleClose, name, ...props }) => {
  const open = Boolean(anchorEl);
  const id = open ? name : undefined;
  return (
    <PopoverMUI
      aria-labelledby={name}
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      {...props}
    >
      {children}
    </PopoverMUI>
  );
};

Popover.defaultProps = {
  name: "Popover",
};

Popover.propTypes = {
  anchorEl: PropTypes.element.isRequired,
  handleClose: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default Popover;
