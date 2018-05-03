import _ from 'lodash';
import React, { Component } from 'react';
//import getDirections from 'react-native-google-maps-directions';
import RNGooglePlaces from 'react-native-google-places';
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';
import {
  Text,
  ListView,
  View,
  TouchableOpacity,
  Dimensions
 } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button, Input } from './common';
import { contactsFetch } from '../actions';
import ListItemPosition from './ListItemPosition';
import SearchBarPosition from './SearchBarPosition';
import {} from './GoingHome';

class Directions extends Component {
  state = {
    originDetails: {},
    destinationDetails: {},
    originDefined: false,
    destinationDefined: false
  }

  componentWillMount() {
    this.props.contactsFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ contacts }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(contacts);
  }
  originCallback = (detailsFromSearch) => {
    this.setState({ originDetails: detailsFromSearch, originDefined: true });
    console.log('originDetails: ', this.state.originDetails);
  };

  destinationCallback = (detailsFromSearch) => {
    this.setState({ destinationDetails: detailsFromSearch, destinationDefined: true });
    console.log('destinationDetails: ', this.state.destinationDetails);
  }


 renderRow(contact) {
   return (
     <ListItemPosition
       contact={contact}
     />
   );
 }
 // openSearchModal() {
 //   RNGooglePlaces.openAutocompleteModal()
 //   .then((place) => {
 //   console.log(place);
 //   // place represents user's selection from the
 //   // suggestions and it is a simplified Google Place object.
 //   })
 //   .catch(error => console.log(error.message));  // error is a Javascript Error object
 // }

  render() {
    return (

      <Card>
        <CardSection style={{ height: 50 }}>
        <SearchBarPosition callbackFromParent={this.originCallback} placeholder={'Where from?'} />
          {// <Input>
          //   label="From"
          //   placeholder="Hi, where from?"
          //   onChangeText={this.originCallback.bind(this, 'WhereFrom')}
            //value={this.props.direction}
        // </Input>
        // </SearchBarPosition>
      }
        </CardSection>

        <CardSection style={{ height: 50 }}>
        <SearchBarPosition callbackFromParent={this.destinationCallback} placeholder={'Where to?'} />
        </CardSection>
      {  // <CardSection>
        //   <Input
        //     label="To"
        //     placeholder="Where to?"
        //     onChangeText={this.destinationCallback.bind(this, 'WhereTo')}
        //     //value={this.props.direction}
        //   />
        // </CardSection>
      }
        <CardSection style={{ backgroundColor: 'transparent' }}>
          <Button onPress={() => Actions.goingHome()}>
            Start going home
          </Button>
        </CardSection>

        <CardSection style={{ backgroundColor: 'transparent' }}>
          <Text style={styles.textStyle}>
            Choose contacts who will see your position:
          </Text>
        </CardSection>

        <CardSection>
        <ListView
          removeClippedSubviews={false}
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
        </CardSection>
      </Card>

    );
  }
}
const styles = {
  textStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'black',
    paddingTop: 10
  }
};
const mapStateToProps = (state) => {
  // const inputData = _.map(state.inputData, (key, value) => {
  //   return { ...key, value };
  // });
  //   return { inputData };
  const contacts = _.map(state.contacts, (val, uid) => {
    return { ...val, uid };
  });

  return { contacts };
};

export default connect(mapStateToProps, { contactsFetch })(Directions);

//
// <View style={styles.container}>
//  <TouchableOpacity
//    style={styles.button}
//    onPress={() => this.openSearchModal()}
//  >
//    <Text>Pick a Place</Text>
//  </TouchableOpacity>
// </View>
