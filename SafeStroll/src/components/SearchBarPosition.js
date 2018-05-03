import React, { Component } from 'react';
//import { View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';


// const availabilityArena = {
//     description: 'Tillgänglighetsarenan',
//     geometry: { location: { lat: 57.641380, lng: 18.292853 } }
// };
// const scandicHotel = {
//     description: 'Scandic Visby',
//     geometry: { location: { lat: 57.6317496, lng: 18.2800916 } }
// };
// const toilets = {
//     description: 'Tillgängliga toaletter',
//     geometry: { location: { lat: 57.6402041, lng: 18.2892483 } }
// };
// const parkingLots = {
//     description: 'Parkeringsplats',
//     geometry: { location: { lat: 57.6376372, lng: 18.288044 } }
// };

class SearchBarPosition extends Component {
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
        console.log('Searchbar component will mount');
        Geolocation.getCurrentPosition(
            position => {
                this.setState({
                    currentPosition: {
                    geometry: { location: { lat: position.coords.lat, lng: position.coords.lng } }
                    }
                });
                console.log(this.state);
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    someFunction(details) {
        this.props.callbackFromParent({ longitude: details.lng, latitude: details.lat });
    }

    render() {
        const label = this.props.placeholder;
        const currentLocation = this.state.currentPosition;


        return (
            <GooglePlacesAutocomplete
                placeholder={label}
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'default'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed={false}    // true/false/undefined
                fetchDetails
                renderDescription={row => row.description} // custom description render
                //onPress={(data, details = null) => this.someFunction(details.geometry.location)};

            //}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    { this.someFunction(details.geometry.location) };
                }
            }

                getDefaultValue={() => ''}

                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyDWcrP6dzqCqfavvimwKCQSAkSJW_Rf6T0',
                    language: 'sv', // language of the results
                    types: 'address' // default: 'geocode'
                }}

                styles={{
                    textInputContainer: {
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        backgroundColor: 'white'
                    },
                    // description: {
                    //     fontWeight: 'bold',
                    //     //position: 'absolute'
                    // },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                        //position: 'absolute'
                        //backgroundColor: 'blue'
                    }
                }}

                //currentLocation
                // Will add a 'Current location' button at the top of the predefined places list
                //currentLocationLabel="Current location"
                nearbyPlacesAPI='GoogleReverseGeocoding'
                // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    types: 'food'
                }}

                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                predefinedPlaces={[currentLocation]}

                debounce={200}
                // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            //   renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
            //   renderRightButton={() => <Text>Custom text after the input</Text>}

            />
        );
    }
}
export default SearchBarPosition;
