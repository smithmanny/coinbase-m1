import React, { useState } from 'react';
import { Image, useMutation } from "blitz"
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'

import { makeStyles } from 'integrations/material-ui'
import addMenuItemToCartMutation from 'app/chefs/mutations/createMenuItemOnCart';

import Modal from 'app/core/components/shared/Modal'
import Button from 'app/core/components/shared/Button'
import Typography from 'app/core/components/shared/Typography'

const styles = makeStyles((theme) => ({
  container: {
    minHeight: 500
  },
  logo: {
    marginBottom: theme.spacing(2),
    position: 'relative',
    height: 250,
    width: '100%'
  },
  description: {
    margin: theme.spacing(2, 0)
  },
  sectionName: {
    fontWeight: 'bold',
    fontSize: '.95rem',
  }, 
  quantity: {
    padding: theme.spacing(0, 1),
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2)
  }
}))

const MenuItemModal = ({ show, onClose, menuItem, ...props }) => {
  const classes = styles();
  const [addMenuItemToCart] = useMutation(addMenuItemToCartMutation);
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity(prev => prev === 1 ? 1 : prev -= 1)
  }

  const increaseQuantity = () => {
    setQuantity(prev => prev += 1)
  }

  const updateCart = async () => {
    const values = {
      id: uuidv4(),
      name: menuItem.name,
      price: menuItem.price,
      quantity,
    }

    try {
      await addMenuItemToCart(values);
    } catch (e) {
      console.error('Error adding menu item to cart', e)
    } finally {
      onClose();
    }
  }

  if (!menuItem) {
    return null
  };
  return (
    <Modal
      closeModal={onClose}
      show={show}
      size="xs"
      actions={(
        <React.Fragment>
          <div className={classes.quantityContainer}>
            <Button
              variant="text"
              onClick={decreaseQuantity}
            >
              -
            </Button>
            <Typography className={classes.quantity}>{quantity}</Typography>
            <Button
              variant="text"
              onClick={increaseQuantity}
            >
              +
            </Button>
          </div>
          <Button
            color="primary"
            variant="contained"
            onClick={updateCart}
          >
            {menuItem && `Add To Cart - $${menuItem.price * quantity}`}
          </Button>
        </React.Fragment>
      )}
      {...props}
    >
      <div className={classes.container}>
        <div className={classes.logo}>
          <Image src="/logo.png" layout="fill" />
        </div>
        <Typography variant="h6">{menuItem.name}</Typography>
        <Typography className={classes.description}>
          There was a feature request in my current company, product
          team requested a table component which should order columns in
          ascending or descending way when clicking the column’s title.
          At the end of this post, you’ll see the working POC. There may
          be so many things to improve in the aspect of code quality but
          do not forget, this is just a POC. I’m looking forward to your responses to the code.
        </Typography>

        <section>
          <Typography variant="subtitle1" className={classes.sectionName}>What's Included:</Typography>
          <Typography>3 Course meal</Typography>
        </section>
      </div>
    </Modal>
  )
}

MenuItemModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default MenuItemModal;