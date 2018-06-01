import React, { Component } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';
import geolib from 'geolib';

const homeAddress = { description: 'Home Address',
                    geometry: { location: { lat: 59.841401,
                                            lng: 17.650235 } } };

class GooglePlacesInput extends Component {
  constructor() {
      super();
      this.state = {
          currentPosition: {
              description: 'Current location',
              geometry: { location: { lat: 57, lng: 18, } },
          },
      };
  }

  componentWillMount() {
      Geolocation.getCurrentPosition(
          position => {
              this.setState({
                  currentPosition: {
                  geometry: { location: { lat: position.coords.lat, lng: position.coords.lng } }
                  }
              });
          },
          (error) => console.log(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
  }

  someFunction(details) {
      this.props.callbackFromParent({ longitude: details.lng, latitude: details.lat });
  }

  render() {
    return (
    <GooglePlacesAutocomplete
      placeholder='Where are you going?'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        { this.someFunction(details.geometry.location) };
      }}

      getDefaultValue={() => ''}

      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyDWcrP6dzqCqfavvimwKCQSAkSJW_Rf6T0',
        language: 'sv', // language of the results
        types: 'address' // default: 'geocode'
      }}

      styles={{
        textInputContainer: {
          width: '100%',
          backgroundColor: 'white'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}

      //currentLocation // Will add a 'Current location' button at the top of the predefined places list
      //currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        types: 'food'
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

      predefinedPlaces={[homeAddress]}
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    />
  );
}
}

export default GooglePlacesInput;
