/* eslint-disable no-shadow */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {parse} from 'query-string';
import {makeStyles} from '@material-ui/styles';
import {useLocation} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import {
  TextField,
  InputAdornment,
  Button,
  Drawer,
  CircularProgress
} from '@material-ui/core';
import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab';
import Search from '@material-ui/icons/Search';
import Send from '@material-ui/icons/Send';
import MessageFilters from '../../enum/MessageFilters';
import MessageEditor from './MessageEditor';
import {
  getBuildingMessages,
  deleteMessage,
  markMessageAsRead,
  cleanUpMessageErrors
} from '../../redux/actionCreators/MessageActionCreators';
import MessageListItem from './MessageListItem';

const useStyles = makeStyles(() => ({
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
  loaderContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: '100px'
  }
}));

function Messages({
  getBuildingMessages,
  deleteMessage,
  markMessageAsRead,
  cleanUpMessageErrors,
  messages,
  isLoading,
  loadingError,
  deleteError,
  markAsReadError,
  createError
}) {
  const [displayMessages, setDisplayMessages] = useState(messages);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(MessageFilters.ALL);
  const [editorMessage, setEditorMessage] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const classes = useStyles();
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const location = useLocation();
  const {buildingId} = parse(location.search);

  function showSnackBar(message) {
    enqueueSnackbar(message, {
      variant: 'error',
      onClose: () => cleanUpMessageErrors()
    });
  }

  function applyFilterAndSearch(searchValue, filterValue) {
    let newList = [];

    if (searchValue !== '') {
      newList = messages.filter(message => {
        const lowerCaseSearchableContent = (
          message.title +
          message.body +
          message.apartmentNumber +
          message.apartmentLastName
        ).toLowerCase();
        const lowerCaseSearch = searchValue.toLowerCase();

        return (
          lowerCaseSearchableContent.includes(lowerCaseSearch) &&
          (filterValue === MessageFilters.ALL ||
            (filterValue === MessageFilters.RECEIVED && !message.sentBySeer) ||
            (filterValue === MessageFilters.SENT && message.sentBySeer))
        );
      });
    } else {
      newList = messages.filter(message => {
        return (
          filterValue === MessageFilters.ALL ||
          (filterValue === MessageFilters.RECEIVED && !message.sentBySeer) ||
          (filterValue === MessageFilters.SENT && message.sentBySeer)
        );
      });
    }

    setDisplayMessages(newList);
  }

  function searchChangesHandler(event) {
    setSearch(event.target.value);
    applyFilterAndSearch(event.target.value, filter);
  }

  function filterSelectionHandler(event, newFilter) {
    setFilter(newFilter);
    applyFilterAndSearch(search, newFilter);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  function sendNewHandler() {
    const newMessage = {
      id: -1,
      buildingId,
      apartmentId: '',
      title: '',
      body: ''
    };
    setEditorMessage(newMessage);
    setDrawerOpen(true);
  }

  function replyHandler(message) {
    const replyMessage = {...message};
    replyMessage.title = `Re:${replyMessage.title}`;
    replyMessage.body = '';
    setEditorMessage(replyMessage);
    setDrawerOpen(true);
  }

  function deleteHandler(message) {
    closeSnackbar();
    deleteMessage({id: message.id});
  }

  function messageOpenedHandler(message) {
    markMessageAsRead({id: message.id});
  }

  useEffect(() => {
    getBuildingMessages({buildingId});
  }, []);

  useEffect(() => {
    setDisplayMessages(messages);
    setDrawerOpen(false);
    applyFilterAndSearch(search, filter);
  }, [messages]);

  // Show snack bar notifications (if any)
  useEffect(() => {
    if (createError !== '') showSnackBar(createError);

    if (markAsReadError !== '') showSnackBar(markAsReadError);

    if (deleteError !== '') showSnackBar(deleteError);

    if (loadingError !== '') showSnackBar(loadingError);
  }, [createError, deleteError, markAsReadError, loadingError]);

  return (
    <div className={classes.root}>
      <TextField
        label="Search messages"
        type="search"
        variant="outlined"
        value={search}
        onChange={e => searchChangesHandler(e)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          )
        }}
      />

      <div className={classes.actionsContainer}>
        <Button
          disableElevation
          variant="contained"
          color="primary"
          startIcon={<Send />}
          onClick={sendNewHandler}
        >
          New message
        </Button>

        <ToggleButtonGroup
          exclusive
          onChange={filterSelectionHandler}
          value={filter}
        >
          <ToggleButton
            size="small"
            value={MessageFilters.ALL}
            aria-label="all"
          >
            All
          </ToggleButton>
          <ToggleButton
            size="small"
            value={MessageFilters.RECEIVED}
            aria-label="received"
          >
            Received
          </ToggleButton>
          <ToggleButton
            size="small"
            value={MessageFilters.SENT}
            aria-label="sent"
          >
            Sent
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {isLoading ? (
        <div className={classes.loaderContainer}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {displayMessages.map(message => (
            <MessageListItem
              key={message.id}
              message={message}
              onReply={replyHandler}
              onDelete={deleteHandler}
              onOpened={messageOpenedHandler}
            />
          ))}
        </>
      )}

      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
        <MessageEditor message={editorMessage} onCancel={closeDrawer} />
      </Drawer>
    </div>
  );
}

Messages.propTypes = {
  getBuildingMessages: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired,
  markMessageAsRead: PropTypes.func.isRequired,
  cleanUpMessageErrors: PropTypes.func.isRequired,
  messages: PropTypes.instanceOf(Array).isRequired,
  loadingError: PropTypes.string,
  deleteError: PropTypes.string,
  markAsReadError: PropTypes.string,
  createError: PropTypes.string,
  isLoading: PropTypes.bool.isRequired
};
Messages.defaultProps = {
  loadingError: '',
  createError: '',
  deleteError: '',
  markAsReadError: ''
};

const mapStateToProps = state => ({
  messages: state.messageReducer.messages,
  loadingError: state.messageReducer.loadingError,
  createError: state.messageReducer.createError,
  deleteError: state.messageReducer.deleteError,
  markAsReadError: state.messageReducer.markAsReadError,
  isLoading: state.messageReducer.isLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBuildingMessages,
      deleteMessage,
      markMessageAsRead,
      cleanUpMessageErrors
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
