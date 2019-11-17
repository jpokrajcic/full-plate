import React from 'react';
import {Link} from 'react-router-dom';
import routes from '../../services/routes';

export default function Navigation() {
  return (
    <div>
      <ul>
        <Link to={routes.tasks}>Tasks</Link>
        <Link to={routes.apartments}>Apartments</Link>
        <Link to={routes.posts}>Posts</Link>
        <Link to={routes.dashboard}>Dashboard</Link>
        <Link to={routes.login}>Log out</Link>
      </ul>
    </div>
  );
}
