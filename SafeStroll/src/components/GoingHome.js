import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ListView, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import Communications from 'react-native-communications';
import MapViewDirections from 'react-native-maps-directions';
//import Geolocation from 'react-native-geolocation-service';
import { Card, CardSection, SOSButton } from './common';
import { contactsFetch } from '../actions';
import ListItem from './ListItem';
import SearchBarPosition from './SearchBarPosition';
import MapTiles from './MapTiles';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCwHlnSMUxkXsqrMHrzX0KnAlJ-Z6tORlc';

class GoingHome extends Component {

  state = {
    mapRegion: null,
    lastLat: null,
    lastLong: null,
    tiles: [],
    mapStyle: {},
    originDetails: {},
    destinationDetails: {},
    routeTile: [],
    // loading: true
    originDefined: false,
    destinationDefined: false
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
    return <ListItem contact={contact} />;
  }

  originCallback = (detailsFromSearch) => {
    this.setState({ originDetails: detailsFromSearch, originDefined: true });
    console.log('originDetails: ', this.state.originDetails);
  };

  destinationCallback = (detailsFromSearch) => {
    this.setState({ destinationDetails: detailsFromSearch, destinationDefined: true });
    console.log('destinationDetails: ', this.state.destinationDetails);
  }
  renderRoute() {
    console.log('legend');
    if (this.state.originDefined && this.state.destinationDefined) {
      return (
        <MapViewDirections
          origin={this.state.originDetails}
          destination={this.state.destinationDetails}
          apikey="AIzaSyA9Byks-4BNqpvXaon-vrYpF2uBRn6FSKQ"
          strokeWidth={5}
          strokeColor='hotpink'
          mode='walking'
        />
      );
    }
  }
  renderOriginMarker() {
    if (this.state.originDefined) {
      console.log('hej');
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
    console.log(this.state.originDetails);
    return this.state.tiles.map(tile =>
      <MapTiles key={tile.origin} tile={tile} />
    );
  }


  render() {
    const { width, height } = Dimensions.get('window');
    const ratio = width / height;
    const onMap = true;

    return (
      <Card>
          <CardSection style={{ backgroundColor: 'transparent' }}>
            <SOSButton onPress={() => Communications.phonecall('112', true)}>
              SOS
             </SOSButton>
          </CardSection>

          <CardSection style={{ height: 50 }}>
            <SearchBarPosition callbackFromParent={this.originCallback} placeholder={'From?'} />
          </CardSection>

          <CardSection style={{ height: 50 }}>
            <SearchBarPosition callbackFromParent={this.destinationCallback} placeholder={'Where to?'} />
          </CardSection>

          <CardSection style={{ height: 350 }}>
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
            {this.renderOriginMarker()};
            {this.renderDestinationMarker()};
            {this.renderRoute()};
            {this.renderTiles()};
              </MapView>
            </View>
          </CardSection>

          <CardSection style={{ height: 150 }}>
              <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
              />
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

export default connect(mapStateToProps, { contactsFetch })(GoingHome);
