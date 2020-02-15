import endpoints from '../endpoints';
import retrieveData from '../retrieveData';

export default async task => {
  const response = await retrieveData({
    url: endpoints.urlBase + endpoints.updateTask,
    method: 'POST',
    body: task
  });
  return response;
};
