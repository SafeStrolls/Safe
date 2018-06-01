import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  ListView
 } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from './common';
import { contactsFetch } from '../actions';
import ListItemPosition from './ListItemPosition';
import {} from './GoingHome';

class ChooseContacts extends Component {
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


 renderRow(contact) {
   return (
     <ListItemPosition
       contact={contact}
     />
   );
 }


  render() {
    return (

      <Card>
        <CardSection style={{ backgroundColor: 'transparent' }}>
          <Text style={styles.textStyle}>
            Choose contacts who will see your position:
          </Text>
        </CardSection>

        <CardSection style={{ height: 300 }}>
        <ListView
          removeClippedSubviews={false}
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
        </CardSection>

        <CardSection style={{ backgroundColor: 'transparent' }}>
          <Button onPress={() => Actions.goingHome()}>
            Continue
          </Button>
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
  const contacts = _.map(state.contacts, (val, uid) => {
    return { ...val, uid };
  });

  return { contacts };
};

export default connect(mapStateToProps, { contactsFetch })(ChooseContacts);
