import * as React from "react";
import {
  Toolbar,
  Box,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavLinks from "../Buttons/Button";
import { Link } from "react-scroll";
import { theme } from "../../App";
import FrontEnd from "../FrontEnd/Cards";
import BackEnd from "../BackEnd/Cards";
import DataAnalysis from "../Data/DataAnalysis";

export default function SkillNav({ setComponent, setChecked, checked }) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  let pages = [
    { component: <BackEnd checked={checked} />, page: "BackEnd", index: 1 },
    {
      component: <FrontEnd checked={checked} />,
      page: "FrontEnd & 3D",
      index: 2,
    },
    {
      component: <DataAnalysis checked={checked} />,
      page: "ML & Data",
      index: 4,
    },
  ];
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {isMobile ? (
        <>
          <AppBar position="fixed" elevation={0}>
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{
                m: "1rem 1rem 1rem auto",
                p: "0.25rem 0.75rem 0.25rem 0.75rem",
                color: theme.palette.primary.text.heading,
                bgcolor: theme.palette.primary.text.underline,
                borderRadius: "16px",
                "&:hover": {
                  bgcolor: "#435e85",
                },
                "&:active": {
                  bgcolor: "#435e85",
                },
                "&:focus": {
                  bgcolor: "#435e85",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              sx={{
                m: "1rem",
                ".MuiDrawer-paper": {
                  borderRadius: "16px",
                  width: "calc(100% - 2rem)",
                  bgcolor: theme.palette.primary.main,
                  m: "1rem",
                },
              }}
              anchor="top"
              open={open}
              onClose={handleDrawerToggle}
            >
              <List>
                {pages.map((page, index) => (
                  <ListItemButton
                    key={index}
                    sx={{
                      textAlign: "center",
                      color: theme.palette.primary.text.heading,
                    }}
                    onClick={() => {
                      setComponent(page.component);
                    }}
                  >
                    <Link
                      to="magic-box"
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      onClick={() => {
                        setComponent(page.component);
                      }}
                    >
                      <ListItemText primary={page.page} />
                    </Link>
                  </ListItemButton>
                ))}
              </List>
            </Drawer>
          </AppBar>
        </>
      ) : (
        <Toolbar
          sx={{
            width: "100%",
            position: "sticky",
            padding: "0 !important",
            marginBottom: "1.5rem",
            top: 0,
            zIndex: 999,
            transform: { md: "translateY(-1rem)", sm: "translateY(1rem)" },

            backgroundColor: theme.palette.primary.main,
          }}
          disableGutters
        >
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "space-evenly",
              display: { xs: "none", md: "flex" },
              backgroundColor: theme.palette.primary.main,
            }}
          >
            {pages.map((page) => (
              <NavLinks
                disableRipple
                key={page.index}
                // onClick={handleCloseNavMenu}
                onClick={() => {
                  setComponent(page.component);
                }}
                sx={{
                  fontSize: { md: "0.9rem", xs: "12px" },
                  mx: 2,
                  color: `${theme.palette.primary.text.heading}`,
                  display: "block",
                }}
              >
                {page.page}
              </NavLinks>
            ))}
          </Box>
        </Toolbar>
      )}
    </>
  );
}
