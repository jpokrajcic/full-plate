import endpoints from '../endpoints';
import retrieveData from '../retrieveData';

export default async () => {
  const response = await retrieveData({
    url: endpoints.urlBase + endpoints.getTaskCategories,
    method: 'POST',
    body: {}
  });
  return response;
};
