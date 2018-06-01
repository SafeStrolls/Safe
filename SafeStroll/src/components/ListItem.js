import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon, Right } from 'native-base';
import { CardSection } from './common';


class ListItem extends Component {
  onRowPress() {
    Actions.contactInfo({ contact: this.props.contact });
  }

  render() {
    const { userName } = this.props.contact;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
          <Icon name="ios-person" />
            <Text style={styles.titleStyle}>
              {userName}
            </Text>
            <Right>
            <Icon name="arrow-forward" />
            </Right>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default ListItem;
