import axios from 'axios';

const data: { name: string } = {
  name: 'HAs',
};

var dataString = JSON.stringify(data);

var config = {
  method: 'get',
  url: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
  data: dataString,
};

axios(config)
  .then(function (response) {
    const res: { sub: { text: string } } = response.data;

    console.log(res.sub.text);
  })
  .catch(function (error) {
    console.log(error);
  });
