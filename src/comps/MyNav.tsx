import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  InputBase,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { DarkThemeToggle } from "flowbite-react";
import BrandText from "../comps3D/BrandText";
import CapsuleLink from "../comps3D/Links3D";
import { searchActions } from "../slices/searchSlice";
import { userActions } from "../slices/userSlice";
import { RootState } from "../store/store";

const MyNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userSlice.user);
  const keyword = useSelector(
    (state: RootState) => state.searchSlice.searchWord,
  );
  const getNavItems = () => {
    const items = [
      { text: "About", to: "/about", condition: true },
      { text: "Signup", to: "/signup", condition: !user },
      { text: "Login", to: "/login", condition: !user },
      { text: "My Cards", to: "/my-cards", condition: !!user },
      { text: "CRM", to: "/crm", condition: user?.isAdmin },
      { text: "Favorites", to: "/favorites", condition: !!user },
      {
        text: "Logout",
        to: "/",
        condition: !!user,
        onClick: () => dispatch(userActions.logout()),
      },
    ];

    return items.filter((item) => item.condition);
  };
  // Mobile menu state
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleBrandClick = () => {
    navigate("/");
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar style={{ padding: 0 }} position="static">
      <Container
        maxWidth="xl"
        className="bg-blue-400 shadow-lg shadow-gray-700 dark:bg-blue-900"
      >
        <Toolbar disableGutters>
          {/* Logo/Brand - desktop */}
          <Typography
            variant="h6"
            noWrap
            onClick={handleBrandClick}
            sx={{
              display: { xs: "none", md: "flex" },
              cursor: "pointer",
              maxHeight: "unset",
            }}
          >
            <div className="myNav-brand-desktop">
              <BrandText />
            </div>
          </Typography>

          {/* Logo/Brand - mobile */}
          <Typography
            variant="h5"
            noWrap
            onClick={handleBrandClick}
            sx={{
              display: { xs: "flex", md: "none" },
              cursor: "pointer",
            }}
          >
            {window.innerWidth >= 400 ? (
              <div className="myNav-brand-mobile">
                <BrandText />
              </div>
            ) : (
              <div className="-ml-8 mr-fluid-6xl h-fluid-sm w-fluid-lg">
                <BrandText />
              </div>
            )}
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {getNavItems().map((item) => (
              <div key={item.text} className="myNav-links-desktop">
                <CapsuleLink
                  to={item.to}
                  text={item.text}
                  onClick={item.onClick}
                />
              </div>
            ))}
          </Box>

          {/* Search box */}
          <Box
            sx={{
              position: "relative",
              mr: 2,
              flexGrow: { xs: 1, md: 0 },
              ml: { xs: 2, md: 0 },
            }}
          >
            <InputBase
              className="myNav-input"
              placeholder="Enter keyword"
              value={keyword || ""}
              onChange={(e) => {
                dispatch(searchActions.setSearchWord(e.target.value));
              }}
              sx={{
                width: "100%",
                "&.Mui-focused, &:focus, &:focus-within": {
                  outline: "none !important",
                  border: "none !important",
                },

                "& .MuiInputBase-input": {
                  padding: "8px 8px 8px 0",
                  paddingLeft: "30px",
                  transition: "width 0.3s",
                  width: "100%",
                },
              }}
              inputProps={{
                style: {
                  outline: "none",
                  boxShadow: "none",
                },
              }}
            />
            <SearchIcon
              className="my-nav-search"
              sx={{
                fontSize: { xs: 20, sm: 20 },
              }}
            />
          </Box>

          {/* Dark mode toggle */}
          <DarkThemeToggle className="mr-fluid-xs" />

          {user && (
            <Box>
              <Link to="/profile">
                <Avatar
                  className="bg-blue-600 dark:bg-white"
                  style={{ width: "30px", height: "30px" }}
                  alt={user.image?.alt || "User profile"}
                  src={user.image?.url || ""}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: "0 0 8px rgba(255,255,255,0.8)",
                    },
                  }}
                />
              </Link>
            </Box>
          )}
          {/* Mobile menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  maxHeight: "unset",
                  overflow: "hidden",
                },
                "& .MuiList-root": {
                  padding: "0px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0px",
                },
              }}
            >
              {getNavItems().map((item) => (
                <div key={item.text} className="myNav-links-mobile">
                  <CapsuleLink
                    to={item.to}
                    text={item.text}
                    onClick={item.onClick}
                  />
                </div>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MyNav;
