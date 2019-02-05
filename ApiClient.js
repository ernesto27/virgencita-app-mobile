import config from './config';

export default class ApiCient {

    static getForecast(data, callback){
        const apiKey = config.apiKeyDarkSky;
        const lat = data.coords.latitude;
        const long = data.coords.longitude;
        // const lat = '-34.603683';
        // const long = '-58.381557';

        fetch(`https://api.darksky.net/forecast/${apiKey}/${lat},${long}`)
            .then((response) => {
                console.log(response)

                response.json().then(function(data) {
                    console.log(data);
                    callback(data)
                });
            })
            .catch((error) => {
                console.log(error);
            });
    } 

    static getHumidity(forecast) {
        humidity = forecast.currently.humidity * 100
        precipP = forecast.currently.precipProbability * 100

        return((humidity + precipP)/2)
    }
}