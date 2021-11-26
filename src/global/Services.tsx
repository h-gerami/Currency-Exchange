import {API_EXCHANGE_PATH} from './Global';

function checkResponse(response: Response) {
  try {
    return response.json();
  } catch (err) {
    return console.log(err, 'catcherr');
  }
}

class Services {
  GetRate(base: string) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: null,
      redirect: 'follow',
    };
    return fetch(`${API_EXCHANGE_PATH}&base_currency=${base}`, requestOptions)
      .then(response => checkResponse(response))
      .catch(err => {
        console.log(err, 'network?');
      });
  }
}
const services = new Services();
export default services;
