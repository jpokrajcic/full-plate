import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Grid, makeStyles} from '@material-ui/core';
import {GET_BUILDINGS} from '../../redux/actionTypes';
import {BUILDINGS} from '../../services/mock';
import routes from '../../router/routes';
import {getBuildings} from '../../redux/actionCreators/BuildingActionCreators';

const useStyles = makeStyles(theme => ({
  container: {},
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid black',
    margin: '10px',
    '&:hover, &:focus': {
      cursor: 'pointer',
      backgroundColor: 'rgba(150, 150, 150, 0.5)',
      color: 'rgb(255, 255, 255)'
    }
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  icon: {
    width: '30%',
    margin: '20px'
  },
  homeGridText: {
    display: 'block',
    textAlign: 'center',
    textJustify: 'bottom'
  }
}));

function Buildings({getBuildings, storeBuildings, loadingError, isLoading}) {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    getBuildings();
  }, []);

  const clickHandler = id => {
    console.log(id);
    if (id === -1) {
      // create new building
    } else {
      history.push(`${routes.tasks}`, {buildingId: id});
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container>
      {storeBuildings.map(
        ({id, name, street, city, avatar, capacity, occupied}) => (
          <Grid
            item
            md={4}
            lg={3}
            xl={4}
            className={classes.item}
            key={id}
            onClick={() => clickHandler(id)}
          >
            {id > -1 ? (
              <div className={classes.itemContainer}>
                <img
                  src={avatar}
                  className={classes.icon}
                  alt={`This is ${name}`}
                />
                <span className={classes.homeGridText}>{name}</span>
                <span className={classes.homeGridText}>
                  {`${street},${city}`}
                </span>
                <span className={classes.homeGridText}>
                  {`${occupied}/${capacity}`}
                </span>
              </div>
            ) : (
              <span className={classes.homeGridText}>+</span>
            )}
          </Grid>
        )
      )}
    </Grid>
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
