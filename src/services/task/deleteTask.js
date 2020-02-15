import endpoints from '../endpoints';
import retrieveData from '../retrieveData';

export default async taskId => {
  const response = await retrieveData({
    url: endpoints.urlBase + endpoints.deleteTask,
    method: 'POST',
    body: taskId
  });
  return response;
};
