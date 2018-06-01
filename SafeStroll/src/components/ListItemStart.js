import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ListItemStart extends Component {
  onRowPress() {
    Actions.contactInfo({ contact: this.props.contact });
  }

  render() {
    const { userName } = this.props.contact;

    return (
        <View>
          <CardSection>
            <Icon name="ios-person" />
            <Text style={styles.titleStyle}>
              {userName}
            </Text>
          </CardSection>
        </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default ListItemStart;
