
const authentication =
  'Basic ' +
  Buffer.from(
    `${process.env.ELASTIC_USER}:${process.env.HAWKEYE_ELASTIC_PASS}`
  ).toString('base64');

const myHeaders = new Headers();
myHeaders.append("Authorization", authentication);

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("ssapi.shipstation.com/customers", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


