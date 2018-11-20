import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    height: 400,
    width: 5000
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};


class StoryView extends React.Component {
  render() {
    return (
      <div>
        <Card style={styles.card}>
          <CardActionArea>
            <CardMedia
              style={styles.media}
              image={ this.props.story.BlobImagePath }
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.story.Title}
              </Typography>
              <Typography component="p">
                {this.props.story.Content}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

var mapStateToProps = function (state) {
  return {
    story: state.stories.story
  }
}

var mapDispatchToProps = function (dispatch) {
  return {

  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(StoryView));
