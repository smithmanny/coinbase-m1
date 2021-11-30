import { useCallback, useState } from 'react';
import { Image, Link, useSession } from "blitz";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import { default as MuiAppBar } from "@material-ui/core/AppBar";

import Logo from "app/assets/svg/tiny-logo.svg"
import styles from './styles';

import AccountPopover from "app/core/components/accountPopover"

const Appbar = (props) => {
  const classes = styles(props);
  const session = useSession();
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const isAccountOpen = Boolean(accountAnchorEl);
  const accountId = isAccountOpen ? "account-popover" : null;
  const closeAccountModal = useCallback(() => setAccountAnchorEl(null), [])
  const handleAccountModalClick = useCallback(event => setAccountAnchorEl(event.currentTarget), [])

  const renderLoggedOutLinks = () => (
    <>
      <Grid item>
        <Link href="/api/auth/coinbase">
          <Button variant="contained" color="primary">Log In</Button>
        </Link>
      </Grid>
    </>
  );
  const renderLoggedInLinks = () => (
    <Grid item>
      <IconButton
        aria-label="account"
        disableRipple
        onClick={handleAccountModalClick}
      >
        <PersonIcon fontSize="large" />
      </IconButton>
    </Grid>
  );
  return (
    <MuiAppBar
      position="static"
      className={classes.appBar}
      {...props}
    >
      <Toolbar>
        <Grid container alignItems="center">
          <Grid container item xs>
            <Link href="/">
              <Image
                className={classes.logo}
                alt="Logo"
                src={Logo}
                height={50}
                width={50}
              />
            </Link>
          </Grid>

          <Grid container item xs spacing={2} justifyContent="flex-end">
            {session.userId ? renderLoggedInLinks() : renderLoggedOutLinks()}
          </Grid>
        </Grid>

        {session.userId && (
          <AccountPopover
            id={accountId}
            open={isAccountOpen}
            onClose={closeAccountModal}
            anchorEl={accountAnchorEl}
          />
        )}
      </Toolbar>
    </MuiAppBar>
  )
};

export default Appbar;
