import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Grid, makeStyles, Button, CircularProgress} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import routes from '../../router/routes';
import {getBuildings} from '../../redux/actionCreators/BuildingActionCreators';
import BuildingGridItem from './BuildingGridItem';

const useStyles = makeStyles(theme => ({
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

function Buildings({getBuildings, storeBuildings, loadingError, isLoading}) {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    getBuildings();
  }, []);

  const clickHandler = id => {
    history.push({pathname: routes.tasks, search: `?buildingId=${id}`});
  };

  const addNewHandler = () => {
    const newBuilding = {
      id: -1,
      name: '',
      street: '',
      city: '',
      isSmart: '',
      picture: ''
    };
    console.log('addNewHandler');
    // setSelectedBuilding(newBuilding);
    // setDrawerOpen(true);
  };

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
  bindActionCreators({getBuildings}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Buildings);
