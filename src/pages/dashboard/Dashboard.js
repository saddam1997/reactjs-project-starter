import React, { Component } from 'react';
import {
  Grid,
  //LinearProgress,
  // Select,
  // OutlinedInput,
  // MenuItem,
} from "@material-ui/core";
//import { userActions } from '../../_actions';
import { connect } from 'react-redux';
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.markerClicked = this.markerClicked.bind(this);
    this.state = {
      markers: [],
      places: [],
    }
  }
  componentDidMount() {
    //this.props.dispatch(userActions.statics());
  }

  markerClicked(marker) {
    console.log("The marker that was clicked is", marker);
  }

  render() {
    let classes = {};
    let { users } = this.props;
    let { statics} = users;
    return (
      <>
        <PageTitle title="Dashboard"/>
        <Grid container spacing={4}>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <Widget
              title="Total User"
              upperTitle
              disableWidgetMenu={false}
              bodyClass={classes.fullHeightBody}
              className={classes.card}
            >
              <div className={classes.visitsNumberContainer}>
                <Typography size="xl" weight="medium">
                  {statics?statics.totalRestaurant:0}
              </Typography>
              </div>
            </Widget>
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <Widget
              title="Total RPC"
              upperTitle
              disableWidgetMenu={false}
              bodyClass={classes.fullHeightBody}
              className={classes.card}
            >
              <div className={classes.visitsNumberContainer}>
                <Typography size="xl" weight="medium">
                {statics?statics.totalItem:0}
              </Typography>
              </div>
            </Widget>
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <Widget
              title="Total Notification"
              upperTitle
              disableWidgetMenu={false}
              bodyClass={classes.fullHeightBody}
              className={classes.card}
            >
              <div className={classes.visitsNumberContainer}>
                <Typography size="xl" weight="medium">
                {statics?statics.totalNotification:0}
              </Typography>
              </div>
            </Widget>
          </Grid>
        </Grid>
        
      </>
    );
  }
}
Dashboard.defaultProps = {
  center: { lat: 26.953021, lng: 75.739797 },
  zoom: 15
};
function mapStateToProps(state) {
  console.log("state  ", state);
  const { loggingIn } = state.authentication;
  const { users } = state;
  return {
    loggingIn,
    users
  };
}
export default connect(mapStateToProps)(Dashboard);
