import endpoints from '../endpoints';
import retrieveData from '../retrieveData';

export default async taskCategory => {
  const response = await retrieveData({
    url: endpoints.urlBase + endpoints.updateTaskCategory,
    method: 'POST',
    body: taskCategory
  });
  return response;
};
