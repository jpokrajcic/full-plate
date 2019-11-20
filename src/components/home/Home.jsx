import React from 'react';
import {GET_BUILDINGS} from '../../redux/actionTypes';

export default function Home() {
  const nv = GET_BUILDINGS;

  return <div>{nv}</div>;
}
