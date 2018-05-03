import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ListItemStart extends Component {
  onRowPress() {
    Actions.contactInfo({ contact: this.props.contact });
  }

  render() {
    const { name } = this.props.contact;

    return (
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {name}
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
