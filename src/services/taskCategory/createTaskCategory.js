import endpoints from '../endpoints';
import retrieveData from '../retrieveData';

export default async taskCategory => {
  const response = await retrieveData({
    url: endpoints.urlBase + endpoints.createTaskCategory,
    method: 'POST',
    body: taskCategory
  });
  return response;
};
