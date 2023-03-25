import Button from "@mui/material/Button";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";

function Header() {
  return (
    <AppBar position="fixed">
      <Container fixed>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Posts
          </Typography>
          <Box>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => {
                console.log("Есть контакт");
              }}
            >
              Add post
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
