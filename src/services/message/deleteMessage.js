import endpoints from '../endpoints';
import retrieveData from '../retrieveData';

export default async messageId => {
  const response = await retrieveData({
    url: endpoints.urlBase + endpoints.deleteMessage,
    method: 'POST',
    body: messageId
  });
  return response;
};
