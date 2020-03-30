import retrieveData from '../retrieveData';
import endpoints from '../endpoints';

export default async newPassword => {
  const response = await retrieveData({
    url: endpoints.urlAnon + endpoints.changePassword,
    method: 'POST',
    body: newPassword
  });

  return response;
};
