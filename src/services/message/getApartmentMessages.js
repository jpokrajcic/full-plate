import endpoints from '../endpoints';
import retrieveData from '../retrieveData';

export default async apartmentId => {
  const response = await retrieveData({
    url: endpoints.urlBase + endpoints.getApartmentMessages,
    method: 'POST',
    body: apartmentId
  });
  return response;
};
