import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'app/core/components/shared/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from 'integrations/material-ui'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Modal = ({ actions, children, size, title, show, closeModal, dialogProps }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={show}
      onClose={closeModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      fullWidth={true}
      maxWidth={size}
      scroll="paper"
      {...dialogProps}
    >
      {title && <DialogTitle id="modal-title">{title}</DialogTitle>}
      <DialogContent>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  )
}

Modal.defaultProps = {
  actions: null,
  size: 'sm',
  title: ''
}

Modal.propTypes = {
  actions: PropTypes.element,
  closeModal: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
}

export default Modal;