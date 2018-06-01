import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { setUsersLocation,
         updateUsersLatitude,
         updateUsersLongitude,
         chosenContactDelete
       } from '../actions';
import { CardSection, Button, Card } from './common';

//START PAGE

class UpdateCurrentLocation extends Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
    };
  }

  componentDidMount() {
    this.props.chosenContactDelete();
    this.UpdateCurrentLocation();
  }

  setLocation() {
    const latitude = this.state.latitude;
    const longitude = this.state.longitude;

      this.props.setUsersLocation({ latitude, longitude });
  }

  UpdateCurrentLocation() {
  if (firebase.auth().currentUser !== null) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 50 },
    );

    console.log(this.state.latitude, this.state.longitude);
    console.log('coordinates in UpdateCurrentLocation');


    this.updateLatitude(this.state.latitude);
    this.updateLongitude(this.state.longitude);
    this.setLocation();

    setTimeout(() => this.UpdateCurrentLocation(), 3000);
  }
  }

  updateLatitude(latitude) {
    this.props.updateUsersLatitude(latitude);
  }

  updateLongitude(longitude) {
    this.props.updateUsersLongitude(longitude);
  }

    render() {
      return (
        <ImageBackground
          source={require('./common/img/streetBackground.jpg')}
          style={style.container}
        >
        <Card>
          <CardSection style={{ margin: 10, height: 185, width: 320, padding: 8, borderRadius: 15 }}>
            <Text style={{ fontSize: 16 }}>Welcome to SafeStroll! 👋
             The purpose of this app is to make people feel safe when walking home.
             Remember to choose your contacts wisely, they will be able to see where you are.
             Be careful and have a Safe Stroll! Kind Regards from the developer team. ♥
            </Text>
          </CardSection>

          <CardSection style={{ margin: 10, height: 115, width: 320, padding: 8, borderRadius: 15 }}>
            <Text style={{ fontSize: 16, color: 'red' }}>⚠️ ATTENTION! Important message! ⚠️
             At all times, when inside the SafeStroll application, you can call SOS by shaking your phone.

            </Text>
          </CardSection>

          <CardSection style={{ backgroundColor: 'transparent' }}>
            <Button onPress={() => Actions.startTab()}> Continue </Button>
          </CardSection>
      </Card>
      </ImageBackground>
      );
    }
  }

  const style = StyleSheet.create({
    container: {
      flex: 1,
      width: undefined,
      height: undefined,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

const mapStateToProps = ({ users }) => {
  const { latitude, longitude, uid } = users;

  return { latitude, longitude, uid };
  };

export default connect(mapStateToProps,
  { setUsersLocation, updateUsersLatitude, updateUsersLongitude, chosenContactDelete
 })(UpdateCurrentLocation);
