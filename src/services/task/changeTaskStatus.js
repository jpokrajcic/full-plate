import endpoints from '../endpoints';
import retrieveData from '../retrieveData';

export default async data => {
  const response = await retrieveData({
    url: endpoints.urlBase + endpoints.changeTaskStatus,
    method: 'POST',
    body: data
  });
  return response;
};
