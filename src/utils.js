import Geocoder from 'react-native-geocoding';
import config from '../config';

Geocoder.init(config.apiKeyGoogle);

export function getForecast(latitude, longitude, callback){
    const apiKey = config.apiKeyDarkSky;

    fetch(`https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`)
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

export function getHumidity(forecast) {
    humidity = forecast.currently.humidity * 100
    precipP = forecast.currently.precipProbability * 100
    return((humidity + precipP)/2)
}

export function getCityName(lat, long, callback) {
    Geocoder.from(lat, long)
        .then(json => {
            var addressComponent = json.results[0].address_components;
            console.log('Geocoder api results')
            console.log(json)
            console.log(addressComponent);
            const address = addressComponent.find((item) => {
                if(item.types[0] === 'administrative_area_level_1' || item.types[0] === 'country') {
                    return item;
                }  
            });

            callback(address.long_name);
            console.log('cityName', address.long_name)
        })
        .catch(error => console.warn(error));
}