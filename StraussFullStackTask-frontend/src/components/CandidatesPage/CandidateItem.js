import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 300,
    backgroundColor: "#282c34",
    justifyContent: "center",
    color: "white",
    ransition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#1d232e",
      fontWeight: "bold",
    },
  },
  background: {
    backgroundColor: "#282c34",
    color: "white",
  },
  media: {
    height: 250,
    borderRadius: "50%",
    borderColor: "grey",
    borderWidth: "5px",
    borderStyle: "solid",
  },
  jobTitle: {
    color: "grey",
  },
});

const CandidateItem = ({ candidate }) => {
  const classes = useStyles();

  return (
    <Card className={classes.background}>
      <CardActionArea className={classes.background}>
        <CardMedia
          className={classes.media}
          image={candidate.avatar}
          title={candidate.first_name}
        />
        <CardContent className={classes.background}>
          <Typography gutterBottom variant="h5" component="h2">
            {candidate.first_name} {candidate.last_name}
          </Typography>
          <Typography
            variant="body2"
            className={classes.jobTitle}
            component="p"
          >
            {candidate.job_title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link
          to={`/candidate/${candidate.id}`}
          state={{ candidateData: candidate }}
        >
          <Button size="small" color="primary" className={classes.root}>
            Full Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CandidateItem;
