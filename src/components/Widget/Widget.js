import React from "react";
import {
  Paper,
  //IconButton,
  // Menu,
  // MenuItem,
  Typography,
} from "@material-ui/core";
//import { MoreVert as MoreIcon } from "@material-ui/icons";
import classnames from "classnames";

// styles
import useStyles from "./styles";

export default function Widget({
  children,
  title,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  //...props
}) {
  var classes = useStyles();

  // local
  // var [ setMoreButtonRef] = useState(null);
  // var [ setMoreMenuOpen] = useState(false);

  return (
    <div >
      <Paper className={classes.paper} classes={{ root: classes.widgetRoot }}>
        < >
          {header ? (
            header
          ) : (
            <React.Fragment>
              <Typography variant="h5" color="textSecondary">
                {title}
              </Typography>
            </React.Fragment>
          )}
        </>
        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [bodyClass]: bodyClass,
          })}
        >
          {children}
        </div>
      </Paper>
    </div>
  );
}
