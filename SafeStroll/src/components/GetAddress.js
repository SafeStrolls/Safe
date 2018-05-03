import React, { Component } from 'react';
//import RNGooglePlaces from 'react-native-google-places';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, CardSection } from './common';


class GetAddress extends Component {

  // openSearchModal() {
  //   RNGooglePlaces.openPlacePickerModal()
  //   .then((place) => {
  //       console.log(place);
  //   })
  //   .catch(error => console.log(error.message));
  // }

  render() {
    return (
      <Card>
      <CardSection>
        <View style={{ width: 100, height: 20 }}>
          <TouchableOpacity
            onPress={() => this.openSearchModal()}
          >
          <Text>Open Place Picker</Text>
        </TouchableOpacity>
        </View>
      </CardSection>
      </Card>
    );
  }
}

export default GetAddress;
