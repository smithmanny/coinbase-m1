import { useMutation, Link } from "blitz"
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";

import accountPopoverStyles from "./styles";
import logoutMutation from 'app/auth/mutations/logout';

import Popover from "app/core/components/shared/Popover";

const routes = [
  {
    id: 0,
    icon: AddIcon,
    name: "Account",
    route: "/account",
  },
];

const AccountPopover = ({ ...props }) => {
  const classes = accountPopoverStyles();
  const [logout] = useMutation(logoutMutation);

  return (
    <Popover {...props}>
      <List>
        {routes.map((link) => (
          <Link key={link.id} href={link.route}>
            <ListItem button key={link}>
              <ListItemAvatar>
                <PersonIcon fontSize="large" />
              </ListItemAvatar>
              <ListItemText primary={link.name} className={classes.text} />
            </ListItem>
          </Link>
        ))}
        <ListItem button onClick={() => logout()}>
          <ListItemText primary="Sign out" className={classes.text} />
        </ListItem>
      </List>
    </Popover>
  );
};

AccountPopover.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default AccountPopover;
