import React from 'react';
import {useHistory} from 'react-router-dom';
import {Grid, makeStyles} from '@material-ui/core';
import {GET_BUILDINGS} from '../../redux/actionTypes';
import {BUILDINGS} from '../../services/mock';
import routes from '../../router/routes';

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

function Home() {
  const classes = useStyles();
  const history = useHistory();

  const clickHandler = id => {
    console.log(id);
    if (id === -1) {
      // create new building
    } else {
      history.push(`${routes.tasks  }/${  id}`);
    }
  };

  return (
    <Grid container>
      {BUILDINGS.map(({id, name, address, avatar, capacity, occupied}) => (
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
              <span className={classes.homeGridText}>{address}</span>
              <span className={classes.homeGridText}>
                {occupied}/{capacity}
              </span>
            </div>
          ) : (
            <span className={classes.homeGridText}>+</span>
          )}
        </Grid>
      ))}
    </Grid>
  );
}

export default Home;
