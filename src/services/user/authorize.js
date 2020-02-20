import endpoints from '../endpoints';
import retrieveData from '../retrieveData';

export default async authData => {
  const response = await retrieveData({
    url: endpoints.urlAnon + endpoints.login,
    method: 'POST',
    body: authData,
    includeSessionToken: false
  });
  return response;
};
