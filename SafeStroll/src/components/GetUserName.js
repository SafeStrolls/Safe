import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  userNameChanged,
  setUsersName,
  setIDUserName,
  userNameIDChanged,
  phoneChanged,
  setPhone,
  setUsersInfo
} from '../actions';
import { Card, CardSection, Button, Input } from './common';

class GetUserName extends Component {

  onUserNameChange(text) {
    console.log(text);
    this.props.userNameChanged(text);
  }
  onPhoneChange(text) {
    this.props.phoneChanged(text);
  }

  setUserInfo() {
    const { userName, phone } = this.props;
    //const { phone } = this.props;

    this.props.setIDUserName({ userName, phone });
    this.props.setUsersInfo({ userName, phone });

    console.log(userName);
  }
  setPhone() {
    const { phone } = this.props;
    this.props.setPhone({ phone });
  }

  renderError() {
    if (this.props.error) {
      console.log('there is an error');
      return (
        <View style={{ backgroundColor: 'transparent' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }


  render() {
    return (
      <Card>
      <CardSection>
        <Input
          label="Username"
          placeholder="username"
          onChangeText={this.onUserNameChange.bind(this)}
          value={this.props.userName}
        />
        </CardSection>
        <CardSection>
          <Input
            label="Phone"
            placeholder="123-123-123"
            onChangeText={this.onPhoneChange.bind(this)}
            value={this.props.phone}
          />
          </CardSection>
          {this.renderError()}

        <CardSection style={{ backgroundColor: 'transparent' }}>
          <Button onPress={this.setUserInfo.bind(this)}>
            Create account
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};


const mapStateToProps = ({ auth }) => {
  const { error, userName, phone } = auth;
  return { error, userName, phone };
};

export default connect(mapStateToProps, {
  userNameChanged, setUsersName, setIDUserName, userNameIDChanged, phoneChanged, setPhone, setUsersInfo
})(GetUserName);
