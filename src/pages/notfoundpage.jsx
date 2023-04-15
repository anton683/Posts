import { Card, Grid, Typography } from "@mui/material";

export const NotFoundPage = () => {
  return (
    <Grid container direction="column" alignItems="center" justify="center" className="pagesHeight" >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "65px",
          marginTop: "50px"
        }}
      >
        <Typography variant="h1">404</Typography>
        <Typography variant="h3">Not found page </Typography>
      </Card>
    </Grid>
  );
};
