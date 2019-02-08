
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Badge, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';

const cards = [
	{
	  image: require('./images/imageVirgen.png'),
	},
	{
		image: require('./images/lobo_marino.png'),
	},
	{
		image: require('./images/fragata.png'),
	},

  ];

export default class ViewScreen extends Component {
	constructor(props){
    	super(props);
	}
	  
	render() {
    	return (
			<Container
				style={{
					marginTop: 80,
				}}
			>

				<View>
					<DeckSwiper
						dataSource={cards}
						renderItem={item =>
							<Card style={{ elevation: 3 }}>
								<CardItem 
									cardBody
									style={{
										justifyContent:'center'
									}}	
								>
								<Image 
									style={{ 
										width: 262, 
										height: 320, 
										resizeMode: 'contain',
										
									}} 
									source={item.image} 
								/>
								</CardItem>
						</Card>
						}
					/>
				</View>

				<View style={{ 
					flexDirection: "column", 
		 
					position: "absolute", 
					bottom: 50, 
					left: 0, 
					right: 0, 
					
					padding: 15 }}>
					
					<Text
						style={{textAlign: 'center'}}
					>
						El souvenir del clima dice: 33% de probabilidad de precipitaciones
					</Text>


					<View
						style={{
							marginTop: 10,
						}}
					>
						<Badge 
							primary
							style={{
								alignSelf: 'center'
							}}	
						>
							<Text>3333</Text>
						</Badge>
					</View>
						
				
				</View>
		  </Container>
    	);
  	}
}

