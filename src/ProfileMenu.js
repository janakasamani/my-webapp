import React from 'react';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    localStorage.clear();
  };

  return (
    <div>
      <Avatar
        onClick={handleClick}
        sx={{ cursor: 'pointer' }}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My Account</MenuItem>
        <Link component={Link} to="/" >
        <MenuItem onClick={handleClose}>
            Logout
        </MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
