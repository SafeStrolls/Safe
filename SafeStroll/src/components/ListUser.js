import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Right } from 'native-base';
import { contactCreate } from '../actions';
import { CardSection } from './common';


class ListUser extends Component {
  onIconPress() {
    const { userName, phone } = this.props.usernames;

    this.props.contactCreate({ userName, phone });
  }

  render() {
    const { userName } = this.props.usernames;
    console.log(this.props);

    return (
      <View>
      <CardSection>
        <Text style={styles.titleStyle}>
          {userName}
        </Text>
        <Right>
        <Icon name="ios-add-circle-outline" onPress={this.onIconPress.bind(this)} />
        </Right>
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
const mapStateToProps = (state) => {
  const { userName, phone } = state.contactForm;
    return { userName, phone };
};

export default connect(mapStateToProps,
  { contactCreate })(ListUser);
