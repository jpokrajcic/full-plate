import endpoints from '../endpoints';
import retrieveData from '../retrieveData';

export default async buildingId => {
  const response = await retrieveData({
    url: endpoints.urlBase + endpoints.getBuildingTaskCategories,
    method: 'POST',
    body: buildingId
  });
  return response;
};
