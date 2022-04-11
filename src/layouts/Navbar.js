import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import LoginIcon from "@mui/icons-material/Login";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useAuth from "../hooks/useAuth";
import useFavorite from "../hooks/useFavorite";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const navBarItems = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Browser",
    url: "/browser",
  },
];

export default function PrimarySearchAppBar() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const { movieIds } = useFavorite();
  const numberOfFavoriteMovies = movieIds?.length || 0;

  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
  };
  const handleLogIn = () => {
    navigate("/login");
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!isAuthenticated ? (
        <MenuItem
          onClick={handleLogIn}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <LoginIcon />
          </IconButton>
          <Typography variant="span">Log in</Typography>
        </MenuItem>
      ) : (
        <div>
          <MenuItem divider>
            <IconButton size="medium" color="inherit">
              <AccountCircle />
            </IconButton>

            <Typography variant="span">{user.username}</Typography>
          </MenuItem>
          <MenuItem>
            <IconButton size="medium" color="inherit">
              {numberOfFavoriteMovies > 0 ? (
                <Badge badgeContent={numberOfFavoriteMovies} color="error">
                  <FavoriteIcon />
                </Badge>
              ) : (
                <FavoriteIcon />
              )}
            </IconButton>
            <Typography variant="span">Favorites</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogOut}>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
            <Typography variant="span">Log out</Typography>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, mr: 1 }}
          >
            Four-movies
          </Typography>

          <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
            {navBarItems.map(({ url, label }) => (
              <Button
                size="small"
                sx={{ color: "white", display: "inline-block" }}
                onClick={() => navigate(url)}
                key={url}
              >
                {label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!isAuthenticated ? (
              <Box
                onClick={handleLogIn}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <LoginIcon />
                </IconButton>
                <Typography variant="span">Log in</Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton size="medium" color="inherit">
                  <AccountCircle />
                </IconButton>
                <Typography>{user.username}</Typography>
                <IconButton size="large" color="inherit">
                  {numberOfFavoriteMovies > 0 ? (
                    <Badge badgeContent={numberOfFavoriteMovies} color="error">
                      <FavoriteIcon />
                    </Badge>
                  ) : (
                    <FavoriteIcon />
                  )}
                </IconButton>
                <IconButton
                  size="medium"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleLogOut}
                  color="inherit"
                >
                  <LogoutIcon />
                </IconButton>
              </Box>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
