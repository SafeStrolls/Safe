import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { ListView, Text, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { chosenContactsFetch } from '../actions';
import { Card, CardSection, Button } from './common';
import ListChosenContacts from './ListChosenContacts';

class MessageToChosen extends Component {
  componentWillMount() {
    this.props.chosenContactsFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ chosenContacts }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(chosenContacts);
    console.log(this.dataSource);
  }

  sendMessage() {
    const { phone } = this.props.chosenContacts;

    //SKICKA SMS TILL EN KONTAKT
    Communications.text(phone, `X has arrived home!`);
  }
  renderRow(chosenContacts) {
    return <ListChosenContacts chosenContacts={chosenContacts} />;
  }
  render() {
    return (
        <Card>
        <Image
          style={{ width: 60, height: 70, margin: 20, alignSelf: 'center' }}
          source={require('./common/img/check.png')}
        />
        <CardSection style={{ backgroundColor: 'transparent' }}>
          <Text style={{ fontSize: 16 }}>These contacts now know you have arrived: </Text>
        </CardSection>

        <CardSection style={{ height: 240 }}>
          <ListView
            removeClippedSubviews={false}
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
        </CardSection>

        <CardSection style={{ backgroundColor: 'transparent', marginTop: 10 }}>
        <Button onPress={() => Actions.startPage()}>
        Done
        </Button>
        </CardSection>
        </Card>
    );
  }
}

const mapStateToProps = state => {
  const chosenContacts = _.map(state.chosenContacts, (val, uid) => {
    return { ...val, uid };
  });

  return { chosenContacts };
};

export default connect(mapStateToProps, { chosenContactsFetch })(MessageToChosen);
