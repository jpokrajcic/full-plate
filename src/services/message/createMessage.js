import endpoints from '../endpoints';
import retrieveData from '../retrieveData';

export default async message => {
  const response = await retrieveData({
    url: endpoints.urlBase + endpoints.createMessage,
    method: 'POST',
    body: message
  });
  return response;
};
