import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Alert, ScrollView, ListView, Text } from 'react-native';
import MapView from 'react-native-maps';
import geolib from 'geolib';
import { Actions } from 'react-native-router-flux';
import Communications from 'react-native-communications';
import MapViewDirections from 'react-native-maps-directions';
import { Card, CardSection, SOSButton } from './common';
import { locationFetch } from '../actions';
import GooglePlacesInput from './GooglePlacesInput';
import GooglePlacesInputOrigin from './GooglePlacesInputOrigin';
import MapTiles from './MapTiles';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCwHlnSMUxkXsqrMHrzX0KnAlJ-Z6tORlc';

class GoingHome extends Component {
  constructor() {
    super();
      this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      tiles: [],
      mapStyle: {},
      originDetails: {},
      destinationDetails: { latitude: 1, longitude: 1 },
      routeTile: [],
      // loading: true
      originDefined: false,
      destinationDefined: false,
      currentLatitude: 0,
      currentLongitude: 0
    };
  }

  componentWillMount() {
    navigator.geolocation.clearWatch(this.watchID);
    this.state.originDefined = true;

    this.createDataSource(this.props);
  }

  componentDidMount() {

    this.getDistance();
    this.mounted = true;
    this.watchID = navigator.geolocation.watchPosition((position) => {

      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5
      };
      const regionLatLong = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      };

      this.onRegionChange(region, region.latitude, region.longitude, regionLatLong);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  onRegionChange(region, lastLat, lastLong, regionLatLong) {
    this.setState({
      mapRegion: region,
      mapRegionLatLong: regionLatLong,
      // If there are no new values set use the the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  getDistance() {
    this.props.locationFetch();
    this.createDataSource(this.props);

    if (!this.alertPresent) {
      this.alertPresent = true;
    if (geolib.getDistance({ latitude: this.state.currentLatitude,
      longitude: this.state.currentLongitude }, {
      latitude: this.state.destinationDetails['latitude'],
      longitude: this.state.destinationDetails['longitude']
    }) < 20) {
      Alert.alert('You have arrived', 'A message will be sent to your chosen contacts!',
      [
        { text: 'Ok', onPress: () => Actions.sendMessage() },
      ]
      );
    }

    else {
      this.alertPresent = false;
    }
    setTimeout(() => this.getDistance(), 5000);
  }
}

createDataSource({ currentLatitude, currentLongitude }) {
  this.setState({
    currentLatitude,
    currentLongitude
  });
}

  originCallback = (detailsFromSearch) => {
    //this.setState({ originDetails: detailsFromSearch, originDefined: true });
    this.setState({ originDetails: { latitude: this.state.lastLat,
                                     longitude: this.state.lastLong },
                                     originDefined: true });
  };


  destinationCallback = (detailsFromSearch) => {
    this.setState({ destinationDetails: detailsFromSearch, destinationDefined: true });
  }

  renderOriginMarker() {
    if (this.state.originDefined) {
      return (
        <MapView.Marker
          style={{ height: 1 }}
          coordinate={this.state.originDetails}
          pinColor={'red'}
        />
      );
    }
  }

  renderDestinationMarker() {
    if (this.state.destinationDefined) {
      return (
        <MapView.Marker
          style={{ height: 1 }}
          coordinate={this.state.destinationDetails}
          pinColor={'green'}
        />
      );
    }
  }
  renderTiles() {
    return this.state.tiles.map(tile =>
      <MapTiles key={tile.origin} tile={tile} />
    );
  }

renderRoute() {
  if (this.state.destinationDefined) {
    return (
      <MapViewDirections
        origin={this.state.originDetails}
        destination={this.state.destinationDetails}
        apikey="AIzaSyA9Byks-4BNqpvXaon-vrYpF2uBRn6FSKQ"
        strokeWidth={5}
        strokeColor='#252579'
        mode='walking'
      />
    );
  }
}

render() {
    return (
      <ScrollView>
      <Card>
          <CardSection style={{ backgroundColor: 'transparent' }}>
            <SOSButton onPress={() => Communications.phonecall('112', true)}>
            SOS
            </SOSButton>
          </CardSection>
          <CardSection style={{ marginBottom: 10, backgroundColor: 'white' }}>
            <GooglePlacesInputOrigin callbackFromParent={this.originCallback} />
          </CardSection>
          <CardSection style={{ marginBottom: 10, backgroundColor: 'white' }}>
            <GooglePlacesInput callbackFromParent={this.destinationCallback} />
          </CardSection>
          <CardSection style={{ height: 350 }}>
          <View style={{ flex: 1 }}>
            <MapView
              style={styles.map}
              region={this.state.mapRegion}
              showsUserLocation
              followUserLocation
              onRegionChange={this.onRegionChange.bind(this)}
            >

            {this.renderOriginMarker()};
            {this.renderDestinationMarker()};
            {this.renderRoute()};
            {this.renderTiles()};

              </MapView>
            </View>
          </CardSection>
      </Card>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  map: {
    height: '100%',
    width: '100%'
  }
});

const mapStateToProps = state => {
  const currentLatitude = state.currentLoc.latitude;
  const currentLongitude = state.currentLoc.longitude;

    return { currentLatitude, currentLongitude };
};

export default connect(mapStateToProps, { locationFetch })(GoingHome);
