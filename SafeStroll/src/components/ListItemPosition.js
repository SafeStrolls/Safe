import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Checkbox from 'react-native-check-box';
import { Right } from 'native-base';
//import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ListItemPosition extends Component {
  // onRowPress() {
  //   Actions.contactInfo({ contact: this.props.contact });
  // }
  onClick(name) {
    name.checked = !name.checked;
  }

  render() {
    const { name } = this.props.contact;

    return (
      //<TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
            <Right>
            <Checkbox
              style={{ flex: 1, padding: 10 }}
              onClick={() => this.onClick(name)}
              isChecked={name.checked}
            />
            </Right>
          </CardSection>
        </View>
      //</TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default ListItemPosition;
