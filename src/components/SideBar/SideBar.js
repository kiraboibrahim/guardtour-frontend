import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {
  Sheet,
  ListItem,
  ListItemButton,
  GlobalStyles,
  Box,
  Divider,
  Typography,
  IconButton,
  List,
  ListItemContent,
  listItemButtonClasses,
  Avatar,
  CircularProgress,
  ListItemDecorator,
} from "@mui/joy";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ApartmentIcon from "@mui/icons-material/Apartment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import Toggler from "../Toggler/Toggler";
import siteService from "../../services/site";
import UserContext, { AnonymousUser, removeAccessToken } from "../User/User";
import { SiteContext } from "../SiteDetail/SiteDetail";
import { ErrorContext } from "../Error/Error";

function closeSidebar() {
  if (typeof document !== "undefined") {
    document.documentElement.style.removeProperty("--SideNavigation-slideIn");
    document.body.style.removeProperty("overflow");
  }
}

export default function SideBar() {
  const { user, setUser } = useContext(UserContext);
  const { setSelectedSite } = useContext(SiteContext);
  const { setError } = useContext(ErrorContext);
  const [sites, setSites] = useState([]);
  const [sitesLoading, setSitesLoading] = useState(false);

  function logout() {
    removeAccessToken();
    setUser(AnonymousUser);
    setSelectedSite(undefined);
  }

  useEffect(() => {
    setSitesLoading(true);
    siteService
      .getMySites(user)
      .then((sites) => {
        setSites(sites);
      })
      .catch((reason) => setError(reason.message))
      .finally(() => setSitesLoading(false));
  }, []);

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography level="title-lg">Guard Tour</Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton selected>
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Home</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <ApartmentIcon />
                  <ListItemContent>
                    <Typography level="title-sm">My sites</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                {sitesLoading && (
                  <ListItem sx={{ mt: 1 }}>
                    <ListItemDecorator>
                      <CircularProgress size="sm" thickness={1} />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography level="body-sm">Loading sites</Typography>
                    </ListItemContent>
                  </ListItem>
                )}
                {sites.map((site) => {
                  return (
                    <ListItem key={site.id}>
                      <ListItemButton onClick={() => setSelectedSite(site)}>
                        {site.name}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Toggler>
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Avatar
            variant="outlined"
            size="sm"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
          />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography level="title-sm">
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography level="body-xs">{user.email}</Typography>
            <Typography level="body-xs">{user.role}</Typography>
          </Box>
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onClick={logout}
          >
            <LogoutRoundedIcon />
          </IconButton>
        </Box>
      </Box>
    </Sheet>
  );
}
