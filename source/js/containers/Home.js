import React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { storiesGet as storiesGetApiCall } from '../apiCalls';
import { storiesGet } from '../redux/modules/stories';

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//History can't SSR
//import { history } from '../history';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class StoryList extends React.Component {
  componentWillMount() {
    const {
      stories,
    } = this.props;

    if (!stories) {
       this.props.storiesGet(storiesGetApiCall);
    }
  }
  navigateToStory(id ) {
    //history.push(`/story/${ id }`);
  }
  render() {
    const stories = this.props.stories || [];
    return (
      <div>
        <h1>
          Stories
        </h1>
        <List>
          {stories.map((story, i) => {
            return (
              <ListItem key={ i } onClick={ this.navigateToStory(story.Id) } >
                <ListItemText key={ story.Id } primary={story.Title} secondary={story.Content} />
              </ListItem>
            )
          })}
        </List>
      </div>
    );
  }
}

var mapStateToProps = function (state) {
  return {
    stories: state.stories.stories,
    filter: state.stories.filter
  }
}

var mapDispatchToProps = function (dispatch) {
    return {
        storiesGet(apiCall) {
            dispatch(storiesGet(apiCall));
        }
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(StoryList));
