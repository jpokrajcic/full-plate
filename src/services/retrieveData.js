// import {useHistory} from 'react-router-dom';
import getSessionToken from './getSessionToken';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export default async ({url, method, body, includeSessionToken = true}) => {
  // console.log('Retrieve data: ', {url, method, body});
  if (!url || !method || !body)
    throw new Error('/global/retreveData -> url, method or body null !');

  //   const history = useHistory();

  try {
    let sessionToken = {};
    const resp = getSessionToken();
    if (resp && resp.sessionToken && typeof resp.sessionToken !== 'undefined')
      sessionToken = {...resp};

    let sendBody;
    if (includeSessionToken) {
      sendBody = {...body, ...sessionToken};
    } else {
      sendBody = {...body};
    }

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(sendBody)
    });

    if (!response.ok) {
      throw new Error(response.statusText || response.status);
    }

    const responseJson = await response.json();

    if (responseJson.status === 100) {
      // console.log('No open session, redirect to login page');
      localStorage.removeItem('token'); // if not valid token is stored
      //   history.push({
      //     pathname: '/',
      //     search: '',
      //     state: undefined,
      //     hash: '#/login'
      //   });
      window.location.reload(true); // wild fix
      throw new Error(responseJson.message);
    } else if (responseJson.status !== 0) {
      // console.log('Response status issue: ', responseJson);
      throw new Error(responseJson.message);
    }
    console.log('SUCCESS', responseJson.data);
    return responseJson.data;
  } catch (error) {
    console.log('Server communication issue: ', error);
    throw error;
  }
};
