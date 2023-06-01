import * as React from 'react';
import Button from "@mui/material/Button";
import {
  AppBar,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import { useForm } from 'react-hook-form';

function Header({ onAdd }) {
  const currentUser = useContext(UserContext)
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    reset();
  };
  const onSubmit = (data) => {
    onAdd(data);
    handleClose();
    reset();
  };
  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar position="fixed">
        <Container fixed>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Posts
            </Typography>

            <Typography mr={3}>
              {currentUser?.name}<br />{currentUser?.email}
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <Button
              color="inherit"
              variant="outlined" sx={{ marginLeft: "30px" }}
              onClick={handleOpen}
            >
              New post
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle id="form-dialog-title">Создать новый пост</DialogTitle>
                <DialogContent>
                  <Box mb={2}>
                    <TextField
                      autoFocus
                      autoComplete="image"
                      {...register("image", {
                        required: true,
                        pattern: {
                          value:
                            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
                        },
                      })}
                      margin="dense"
                      id="url"
                      label="Вставьте ссылку на изображение"
                      type="text"
                      fullWidth
                      error={!!errors.image}
                      helperText={errors?.image ? errors.image.message : null}
                    />
                  </Box>
                  <TextField
                    {...register("title", { required: true })}
                    margin="dense"
                    id="title"
                    label="Добавьте заголовок"
                    type="text"
                    fullWidth
                  />
                  <TextField
                    {...register("text", { required: true })}
                    margin="dense"
                    id="text"
                    label="Добавьте описание"
                    type="text"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Отмена</Button>
                  <Button type="submit">Отправить</Button>
                </DialogActions>
              </form>
            </Dialog>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Header;
