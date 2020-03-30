import endpoints from '../endpoints';
import retrieveData from '../retrieveData';

export default async apartment => {
  const response = await retrieveData({
    url: endpoints.urlBase + endpoints.updateApartment,
    method: 'POST',
    body: apartment
  });
  return response;
};
