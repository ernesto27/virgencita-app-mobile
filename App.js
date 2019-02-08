
import React, { Component } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, PermissionsAndroid } from 'react-native';
import { HueRotate } from 'react-native-color-matrix-image-filters';
import { Badge, Text } from 'native-base';
import { getForecast, getHumidity, getCityName } from './src/utils';


Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};

export default class App extends Component {
	constructor(props){
    	super(props);

      	this.state = {
			isLoading: true,
			humidity: 0,
			amount: Math.radians(0),
			cityName: ''
		}
		

		this.requestPermission(() => {
			navigator.geolocation.getCurrentPosition((data) => {
				console.log('coords user', data);
				const latitude = data.coords.latitude;
				const longitude = data.coords.longitude;
	
				getForecast(latitude, longitude, (forecast) => {
					console.log('forecast', forecast);
					const humidity = getHumidity(forecast);
					console.log('humidity', humidity);
					console.log('amount', Math.radians(humidity));
	
					getCityName(latitude, longitude, (cityName) => {
						this.setState({
							isLoading: false,
							humidity: humidity,
							amount: Math.radians(humidity),
							cityName: cityName
						});
					}, (error) => {
						console.log('Error trying to get city name');
					})
				});
			}, (error) => {
				console.log('Error geolocation');
				console.log(error)
			}, { enableHighAccuracy: true });
		}, () => {
			alert('El usuario no acepto permisos')
		});
	}
	  

	requestPermission(grantedCB, deniedDB) {
		(async () => {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
				);
				console.log('granted', granted);
				if(granted === 'granted') {
					grantedCB();
				}

				if(granted === 'denied') {
					deniedDB();
				}
			} catch (err) {
				console.warn(err);
			}
		})();
	}

	render() {
    	return (
      		<View style={styles.container}>
				{(this.state.isLoading) 
					?	<ActivityIndicator size="large" />
					: 	<React.Fragment>
							<HueRotate
								amount={this.state.amount}
							>
								<Image
									source={require('./images/imageVirgen.png')}
								/>
							</HueRotate>

							<Text
								style={{textAlign: 'center'}}
							>
								El souvenir del clima dice: {this.state.humidity}% de probabilidad de precipitaciones
							</Text>

							<View
								style={{
									alignContent:'center',
									marginTop: 10
								}}
							>
								<Badge primary>
									<Text>{this.state.cityName}</Text>
								</Badge>
							</View>
						</React.Fragment>
				}
      		</View>
    	);
  	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
