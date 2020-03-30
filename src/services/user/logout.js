import endpoints from '../endpoints';
import retrieveData from '../retrieveData';

export default async () => {
  const response = await retrieveData({
    url: endpoints.urlAnon + endpoints.logout,
    method: 'POST',
    body: {}
  });

  return response;
};
