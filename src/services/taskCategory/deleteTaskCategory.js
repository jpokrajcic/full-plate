import endpoints from '../endpoints';
import retrieveData from '../retrieveData';

export default async taskCategoryId => {
  const response = await retrieveData({
    url: endpoints.urlBase + endpoints.deleteTaskCategory,
    method: 'POST',
    body: taskCategoryId
  });
  return response;
};
