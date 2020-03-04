/* eslint-disable no-shadow */
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {useSnackbar} from 'notistack';
import {Grid, makeStyles, Button, CircularProgress} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import {
  getBuildings,
  cleanUpBuildingErrors
} from '../../redux/actionCreators/BuildingActionCreators';
import BuildingGridItem from './BuildingGridItem';

const useStyles = makeStyles(() => ({
  addNewButton: {
    margin: '32px 20px 12px 20px',
    width: '200px',
    height: '48px'
  },
  loaderContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: '100px'
  }
}));

function Buildings({
  getBuildings,
  cleanUpBuildingErrors,
  storeBuildings,
  loadingError,
  isLoading
}) {
  const classes = useStyles();
  const {enqueueSnackbar} = useSnackbar();

  function addNewHandler() {
    // const newBuilding = {
    //   id: -1,
    //   name: '',
    //   street: '',
    //   city: '',
    //   isSmart: '',
    //   picture: ''
    // };
    // setSelectedBuilding(newBuilding);
    // setDrawerOpen(true);
  }

  function showSnackBar(message) {
    enqueueSnackbar(message, {
      variant: 'error',
      onClose: () => cleanUpBuildingErrors()
    });
  }

  useEffect(() => {
    getBuildings();
  }, []);

  // Show snack bar notifications (if any)
  useEffect(() => {
    if (loadingError !== '') showSnackBar(loadingError);
  }, [loadingError]);

  return (
    <div>
      <Button
        disableElevation
        variant="contained"
        color="primary"
        startIcon={<Add />}
        className={classes.addNewButton}
        onClick={addNewHandler}
      >
        New building
      </Button>

      {isLoading ? (
        <div className={classes.loaderContainer}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container>
          {storeBuildings.map(
            ({id, name, street, city, avatar, capacity, occupied}) => (
              <BuildingGridItem
                key={id}
                id={id}
                name={name}
                street={street}
                city={city}
                avatar={avatar}
                capacity={capacity}
                occupied={occupied}
              />
            )
          )}
        </Grid>
      )}
    </div>
  );
}

Buildings.propTypes = {
  getBuildings: PropTypes.func.isRequired,
  cleanUpBuildingErrors: PropTypes.func.isRequired,
  storeBuildings: PropTypes.instanceOf(Array).isRequired,
  loadingError: PropTypes.string,
  isLoading: PropTypes.bool.isRequired
};
Buildings.defaultProps = {
  loadingError: ''
};

const mapStateToProps = state => ({
  storeBuildings: state.buildingReducer.buildings,
  loadingError: state.buildingReducer.loadingError,
  isLoading: state.buildingReducer.isLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({getBuildings, cleanUpBuildingErrors}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Buildings);
