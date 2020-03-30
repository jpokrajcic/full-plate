import endpoints from '../endpoints';
import retrieveData from '../retrieveData';

export default async messageId => {
  const response = await retrieveData({
    url: endpoints.urlBase + endpoints.markMessageAsRead,
    method: 'POST',
    body: messageId
  });
  return response;
};
