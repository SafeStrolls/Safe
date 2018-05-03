import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, ListView, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Card, CardSection, Button } from './common';
import { contactsFetch } from '../actions';
import ListItemStart from './ListItemStart';

//const GOOGLE_MAPS_APIKEY = 'AIzaSyCwHlnSMUxkXsqrMHrzX0KnAlJ-Z6tORlc';

class Start extends Component {
  state = {
    mapRegion: null,
    lastLat: null,
    lastLong: null,
  }
  componentWillMount() {
    navigator.geolocation.clearWatch(this.watchID);
    this.props.contactsFetch();

    this.createDataSource(this.props);
  }
  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5
      };
      this.onRegionChange(region, region.latitude, region.longitude);
    });
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }
  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set use the the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }
  onMapPress(e) {
    console.log(e.nativeEvent.coordinate.longitude);
    const region = {
    conststatitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5
    };
    this.onRegionChange(region, region.latitude, region.longitude);
  }

  createDataSource({ contacts }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(contacts);
  }
  renderRow(contact) {
    return <ListItemStart contact={contact} />;
  }

  render() {
    return (
      <Card>
          <CardSection style={{ height: 300 }} >
          <View style={{ flex: 1 }}>
            <MapView
              style={styles.map}
              region={this.state.mapRegion}
              showsUserLocation
              followUserLocation
              onRegionChange={this.onRegionChange.bind(this)}
              onPress={this.onMapPress.bind(this)}
            >
              {// <MapView.Marker
              //   coordinate={{
              //     latitude: (this.state.lastLat + 0.00050) || -36.82339,
              //     longitude: (this.state.lastLong + 0.00050) || -73.03569,
              //   }}
              // >
              //   {// <View>
              //   //   <Text style={{ color: '#000' }} >
              //   //     { this.state.lastLong } / { this.state.lastLat }
              //   //   </Text>
              //   // </View>
              // }
              // </MapView.Marker>
            }
            </MapView>
          </View>
          </CardSection>

          <CardSection style={{ backgroundColor: 'transparent' }}>
            <Text style={styles.titleStyle}>Contacts that are nearby:</Text>
          </CardSection>
          <CardSection style={{ height: 150 }}>
              <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
              />
          </CardSection>

          <CardSection style={{ backgroundColor: 'transparent' }}>
            <Button onPress={() => Actions.direction()}>
              Go home
            </Button>
          </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  map: {
    //...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%'
  }
});


const mapStateToProps = state => {
  const contacts = _.map(state.contacts, (val, uid) => {
    return { ...val, uid };
  });

  return { contacts };
};

export default connect(mapStateToProps, { contactsFetch })(Start);
