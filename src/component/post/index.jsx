import * as React from "react";
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from '@mui/material/CardActions';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import dayjs from "dayjs";
import { isLiked } from '../../utils/posts';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from "react";
import { UserContext } from "../../contexts/current-user-context";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export function Post({ author, created_at, image, title, text, likes, _id, onPostLike, onDelete, onEdit, heightImg }) {
  const currentUser = useContext(UserContext)
  const like = isLiked(likes, currentUser?._id)
  const canDelete = currentUser?._id === author?._id;
  const [open, setOpen] = useState(false);
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
    onEdit({ _id, ...data });
    handleClose();
    reset();
  };

  function handleClickButtonLike() {
    onPostLike({ likes, _id })
  }

  function handleClickDelete() {
    if (canDelete) {
      onDelete({ _id })
    }
  }

  return (
    <>
      <Grid sx={{ display: "flex" }} item xs={12} sm={6} lg={4} >
        <Card sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%"
        }}>
          <CardHeader
            avatar={<Avatar aria-label="recipe" src={author?.avatar}></Avatar>}
            action={
              (
                <>
                  <IconButton onClick={handleOpen}>
                    <EditIcon sx={{ color: "lightgray" }} />
                  </IconButton>
                  <IconButton aria-label="settings" onClick={handleClickDelete}>
                    <DeleteIcon sx={{ color: "lightgray" }} />
                  </IconButton>
                </>
              )
            }
            title={author?.name}
            subheader={dayjs(created_at).format("DD MMM YYYY")}
          />
          <Link to={`/postpage/${_id}`} style={{ textDecoration: "none" }}>
            <CardMedia component="img" height="194" image={image} alt={title} sx={{ height: heightImg }} />
            <CardContent>
              <Typography variant="h6" color="black">
                {title}
              </Typography>
              <Typography paragraph variant="body2"
                color="text.secondary" noWrap >{text}</Typography>
            </CardContent>
          </Link>
          <CardActions disableSpacing sx={{ marginTop: "auto" }}>
            <IconButton aria-label="add to favorites" onClick={handleClickButtonLike}>
              <FavoriteIcon sx={{ color: like ? "red" : "grey" }} />
            </IconButton>
            <Typography sx={{ marginLeft: "8px" }}>
              {likes?.length}
            </Typography>

          </CardActions>
        </Card>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">Изменить пост</DialogTitle>
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
            <Button type="submit">Изменить</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
