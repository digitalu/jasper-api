import { API } from './sdk';

API.user.getMe({ headers: { token: 'euthj' } }).then((res) => {
  if (res.data) {
    res.data;
  } else {
    res.error;
  }
});
