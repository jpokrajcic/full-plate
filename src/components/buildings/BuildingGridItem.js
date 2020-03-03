import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Grid, makeStyles, Button} from '@material-ui/core';
import Domain from '@material-ui/icons/Domain';
import LocationOn from '@material-ui/icons/LocationOn';
import useHover from '../../utils/hooks/useHover';
import routes from '../../router/routes';

const useStyles = makeStyles(theme => ({
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '386px',
    borderRadius: '4px',
    boxShadow:
      '0 1px 10px 0 rgba(0, 0, 0, 0.2), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14)',
    backgroundColor: 'rgb(255, 255, 255)',
    margin: '20px',
    '&:hover, &:focus': {
      cursor: 'pointer'
    }
  },
  itemPicture: {
    width: '100%',
    height: '244px',
    borderRadius: '4px 4px 0px 0px'
  },
  itemTitle: {
    height: '24px',
    fontSize: '24px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1',
    letterSpacing: '0.2px',
    color: '#212121',
    margin: '16px 24px'
  },
  itemInfoContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-betweenn',
    // padding: '0px 24px 16px 24px',
    alignItems: 'center'
  },
  itemInfoSubContainer: {
    width: '100%',
    display: 'flex',
    padding: '0px 24px 16px 24px',
    alignItems: 'center'
  },
  itemInfo: {
    width: '100%',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1',
    letterSpacing: '0.15px',
    color: '#212121',
    paddingLeft: '8px'
  },
  editButton: {
    marginRight: '16px',
    zIndex: '1000',
    color: theme.palette.primary.main
  }
}));

function BuildingGridItem({
  id,
  name,
  street,
  city,
  avatar,
  capacity,
  occupied
}) {
  const classes = useStyles();
  const history = useHistory();
  const [hovering, attributes] = useHover();

  const selectHandler = (event, buildingId) => {
    history.push({
      pathname: routes.tasks,
      search: `?buildingId=${buildingId}`
    });
  };

  const editHandler = event => {
    event.stopPropagation();
    console.log('editHandler');
  };

  return (
    <Grid
      item
      md={4}
      lg={4}
      xl={4}
      key={id}
      onClick={event => selectHandler(event, id)}
      {...attributes}
    >
      <div className={classes.itemContainer}>
        <img
          src={avatar}
          className={classes.itemPicture}
          alt={`This is ${name}`}
        />
        <span className={classes.itemTitle}>{name}</span>
        <div className={classes.itemInfoSubContainer}>
          <LocationOn fontSize="small" />
          <span className={classes.itemInfo}>{`${street},${city}`}</span>
        </div>

        <div className={classes.itemInfoContainer}>
          <div className={classes.itemInfoSubContainer}>
            <Domain fontSize="small" />
            <span
              className={classes.itemInfo}
            >{`${occupied}/${capacity}`}</span>
          </div>
          {hovering === true ? (
            <Button
              id="editButton"
              onClick={editHandler}
              className={classes.editButton}
            >
              Edit
            </Button>
          ) : null}
        </div>
      </div>
    </Grid>
  );
}

BuildingGridItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  capacity: PropTypes.number.isRequired,
  occupied: PropTypes.number.isRequired
};

export default BuildingGridItem;
