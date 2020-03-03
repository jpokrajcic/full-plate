import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withStyles, makeStyles} from '@material-ui/styles';
import {
  ExpansionPanelActions,
  Typography,
  Button,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanel
} from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// const ExpansionPanel = withStyles({
//   root: {
//     borderBottom: '1px solid rgba(0, 0, 0, .125)',
//     borderTop: '1px solid rgba(0, 0, 0, .125)',
//     // boxShadow: 'none',
//     '&:not(:last-child)': {
//       borderBottom: 0
//     },
//     '&:before': {
//       display: 'none'
//     },
//     '&$expanded': {
//       margin: 'auto 0px'
//     }
//   }
//   // expanded: {}
// })(MuiExpansionPanel);

// const ExpansionPanelSummary = withStyles({
//   root: {
//     // borderBottom: '1px solid rgba(0, 0, 0, .125)',
//     marginBottom: -1,
//     minHeight: 56,
//     '&$expanded': {
//       minHeight: 56
//     }
//   },
//   content: {
//     '&$expanded': {
//       margin: '12px 0'
//     }
//   },
//   expanded: {}
// })(MuiExpansionPanelSummary);

// const ExpansionPanelDetails = withStyles(theme => ({
//   root: {
//     padding: theme.spacing(2)
//   }
// }))(MuiExpansionPanelDetails);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px'
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 0px'
  },
  listItem: {
    border: '2px solid red',
    boxSizing: 'content-box',
    padding: '8px'
  },
  panelSummary: {
    display: 'flex'
  },
  panelSummaryInfo: {
    display: 'flex',
    flexDirection: 'column',
    margin: '8px'
  },
  panelSummaryIsReadIndicator: {
    backgroundColor: props =>
      props.message.read === false
        ? theme.palette.primary.main
        : 'rgba(0, 0, 0, 0)',
    width: '10px'
  },
  creationDate: {
    fontSize: '12px'
  }
}));

function MessageListItem({message, onReply, onDelete, onOpened}) {
  const classes = useStyles({message});

  // Flag for rendering expanded content only when panel actually expanded
  const [expanded, setExpanded] = useState(false);

  const expandHandler = () => {
    setExpanded(true);

    if (message.read === false) onOpened(message);
  };

  return (
    <ExpansionPanel
      className={classes.ep}
      onClick={expandHandler}
      TransitionProps={{unmountOnExit: true}}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.panelSummary}>
          <div className={classes.panelSummaryIsReadIndicator} />
          <div className={classes.panelSummaryInfo}>
            <Typography>{message.title}</Typography>
            <Typography variant="body2">{message.dateCreated}</Typography>
          </div>
        </div>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails className={classes.epd}>
        {expanded && <Typography>{message.body}</Typography>}
      </ExpansionPanelDetails>

      <ExpansionPanelActions>
        <Button size="small" color="primary" onClick={() => onReply(message)}>
          Reply
        </Button>
        <Button size="small" color="primary" onClick={() => onDelete(message)}>
          Delete
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}

MessageListItem.propTypes = {
  onReply: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onOpened: PropTypes.func.isRequired,
  message: PropTypes.shape({
    id: PropTypes.number,
    buildingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    apartmentId: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    read: PropTypes.bool,
    dateCreated: PropTypes.string
  }).isRequired
};
export default MessageListItem;
