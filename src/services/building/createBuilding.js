import endpoints from '../endpoints';
import retrieveData from '../retrieveData';

export default async building => {
  const response = await retrieveData({
    url: endpoints.urlBase + endpoints.createBuilding,
    method: 'POST',
    body: building
  });
  return response;
};
