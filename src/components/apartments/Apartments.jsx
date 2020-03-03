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
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  Button,
  Drawer,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress
} from '@material-ui/core';
import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab';
import Search from '@material-ui/icons/Search';
import Phone from '@material-ui/icons/Phone';
import Add from '@material-ui/icons/Add';
import CommentIcon from '@material-ui/icons/Comment';
import ApartmentFilters from '../../enum/ApartmentFilters';
import ApartmentEditor from './ApartmentEditor';
import MessageEditor from '../messages/MessageEditor';
import {
  getBuildingApartments,
  cleanUpApartmentErrors
} from '../../redux/actionCreators/ApartmentActionCreators';
import {cleanUpMessageErrors} from '../../redux/actionCreators/MessageActionCreators';

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
  apartmentNumber: {
    minWidth: '56px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'rgb(117, 117, 117)'
  },
  listItemSecondatyText: {
    display: 'flex',
    alignContent: 'center'
  },
  emptySpace: {
    margin: '0px',
    padding: '0px',
    height: '0px'
  },
  loaderContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: '100px'
  }
}));

function Apartments({
  getBuildingApartments,
  cleanUpApartmentErrors,
  cleanUpMessageErrors,
  apartments,
  messages,
  isLoading,
  loadingError,
  createApartmentError,
  updateApartmentError,
  deleteApartmentError,
  createMessageError
}) {
  const [displayApartments, setDisplayApartments] = useState(apartments);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(ApartmentFilters.ALL);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [editorMessage, setEditorMessage] = useState(null);
  const [apartmentDrawerOpen, setApartmentDrawerOpen] = useState(false);
  const [messageDrawerOpen, setMessageDrawerOpen] = useState(false);
  const classes = useStyles();
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const location = useLocation();
  const {buildingId} = parse(location.search);

  useEffect(() => {
    getBuildingApartments({buildingId});
  }, []);

  useEffect(() => {
    setDisplayApartments(apartments);
    setApartmentDrawerOpen(false);
    setMessageDrawerOpen(false);
    applyFilterAndSearch(search, filter);
  }, [apartments]);

  useEffect(() => {
    closeMessageDrawer();
  }, [messages]);

  // Show snack bar notifications (if any)
  useEffect(() => {
    if (createApartmentError !== '') {
      showSnackBar(createApartmentError, cleanUpApartmentErrors);
    }

    if (updateApartmentError !== '') {
      showSnackBar(updateApartmentError, cleanUpApartmentErrors);
    }

    if (deleteApartmentError !== '') {
      showSnackBar(deleteApartmentError, cleanUpApartmentErrors);
    }

    if (createMessageError !== '') {
      showSnackBar(createMessageError, cleanUpMessageErrors);
    }
  }, [
    createApartmentError,
    updateApartmentError,
    deleteApartmentError,
    createMessageError
  ]);

  function showSnackBar(message, cleanUpFunction) {
    enqueueSnackbar(message, {
      variant: 'error',
      onClose: () => cleanUpFunction()
    });
  }

  function applyFilterAndSearch(searchValue, filterValue) {
    let newList = [];

    if (searchValue !== '') {
      newList = apartments.filter(apartment => {
        const lowerCaseSearchableContent = (
          apartment.number +
          apartment.lastName +
          apartment.contact
        ).toLowerCase();
        const lowerCaseSearch = searchValue.toLowerCase();

        return (
          lowerCaseSearchableContent.includes(lowerCaseSearch) &&
          (filterValue === ApartmentFilters.ALL ||
            (filterValue === ApartmentFilters.EMPTY && apartment.isOccupied) ||
            (filterValue === ApartmentFilters.OCCUPIED &&
              !apartment.isOccupied))
        );
      });
    } else {
      newList = apartments.filter(apartment => {
        return (
          filterValue === ApartmentFilters.ALL ||
          (filterValue === ApartmentFilters.EMPTY && apartment.isOccupied) ||
          (filterValue === ApartmentFilters.OCCUPIED && !apartment.isOccupied)
        );
      });
    }

    setDisplayApartments(newList);
  }

  const searchChangesHandler = event => {
    setSearch(event.target.value);
    applyFilterAndSearch(event.target.value, filter);
  };

  const filterSelectionHandler = (event, newFilter) => {
    setFilter(newFilter);
    applyFilterAndSearch(search, newFilter);
  };

  const closeApartmentDrawer = () => {
    setApartmentDrawerOpen(false);
  };

  const closeMessageDrawer = () => {
    setMessageDrawerOpen(false);
  };

  const listSelectionHandler = (event, apartment) => {
    setSelectedApartment(apartment);
    setApartmentDrawerOpen(true);
  };

  const replyHandler = (event, apartment) => {
    const newMessage = {
      id: -1,
      buildingId,
      apartmentId: apartment.id,
      title: '',
      body: ''
    };
    setEditorMessage(newMessage);
    setMessageDrawerOpen(true);
  };

  const addNewHandler = () => {
    const newApartment = {
      id: -1,
      buildingId,
      number: '',
      lastName: '',
      contact: '',
      size: 0,
      adultsCount: 0,
      childrenCount: 0,
      email: '',
      phone: '',
      mobile: '',
      isOccupied: false,
      rentEnds: undefined
    };
    setSelectedApartment(newApartment);
    setApartmentDrawerOpen(true);
  };

  return (
    <div className={classes.root}>
      <TextField
        label="Search apartments"
        type="search"
        variant="outlined"
        value={search}
        onChange={searchChangesHandler}
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
          startIcon={<Add />}
          onClick={addNewHandler}
        >
          New apartment
        </Button>

        <ToggleButtonGroup
          exclusive
          onChange={filterSelectionHandler}
          value={filter}
        >
          <ToggleButton
            size="small"
            value={ApartmentFilters.ALL}
            aria-label="all"
          >
            All
          </ToggleButton>
          <ToggleButton
            size="small"
            value={ApartmentFilters.OCCUPIED}
            aria-label="occupied"
          >
            Occupied
          </ToggleButton>
          <ToggleButton
            size="small"
            value={ApartmentFilters.EMPTY}
            aria-label="empty"
          >
            Empty
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {isLoading ? (
        <div className={classes.loaderContainer}>
          <CircularProgress />
        </div>
      ) : (
        <List>
          {displayApartments.map(apartment => (
            <ListItem
              button
              divider
              key={apartment.id}
              onClick={event => listSelectionHandler(event, apartment)}
            >
              <p className={classes.apartmentNumber}>{apartment.number}</p>
              <ListItemText
                classes={{secondary: classes.listItemSecondatyText}}
                primary={apartment.lastName}
                secondary={`${apartment.contact}  (${apartment.mobile})`}
                // secondary={[
                //   `${apartment.contact}`,
                //   <pre className={classes.emptySpace}>{'   '}</pre>,
                //   <Phone fontSize="small" />,
                //   <pre className={classes.emptySpace}> </pre>,
                //   apartment.mobile
                // ]}
              />

              <ListItemSecondaryAction>
                <IconButton
                  edge="start"
                  color="primary"
                  aria-label="comments"
                  onClick={event => replyHandler(event, apartment)}
                >
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      <Drawer
        anchor="right"
        open={apartmentDrawerOpen}
        onClose={closeApartmentDrawer}
      >
        <ApartmentEditor
          apartment={selectedApartment}
          onCancel={closeApartmentDrawer}
        />
      </Drawer>
      <Drawer
        anchor="right"
        open={messageDrawerOpen}
        onClose={closeMessageDrawer}
      >
        <MessageEditor message={editorMessage} onCancel={closeMessageDrawer} />
      </Drawer>
    </div>
  );
}

Apartments.propTypes = {
  getBuildingApartments: PropTypes.func.isRequired,
  cleanUpApartmentErrors: PropTypes.func.isRequired,
  cleanUpMessageErrors: PropTypes.func.isRequired,
  apartments: PropTypes.instanceOf(Array).isRequired,
  messages: PropTypes.instanceOf(Array).isRequired,
  loadingError: PropTypes.string,
  createApartmentError: PropTypes.string,
  updateApartmentError: PropTypes.string,
  deleteApartmentError: PropTypes.string,
  createMessageError: PropTypes.string,
  isLoading: PropTypes.bool.isRequired
};
Apartments.defaultProps = {
  loadingError: '',
  createApartmentError: '',
  updateApartmentError: '',
  deleteApartmentError: '',
  createMessageError: ''
};

const mapStateToProps = state => ({
  apartments: state.apartmentReducer.apartments,
  messages: state.messageReducer.messages,
  loadingError: state.apartmentReducer.loadingError,
  createApartmentError: state.apartmentReducer.createError,
  updateApartmentError: state.apartmentReducer.updateError,
  deleteApartmentError: state.apartmentReducer.deleteError,
  createMessageError: state.messageReducer.createError,
  isLoading: state.apartmentReducer.isLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBuildingApartments,
      cleanUpApartmentErrors,
      cleanUpMessageErrors
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Apartments);
