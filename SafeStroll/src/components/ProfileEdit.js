import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { emailChanged, passwordChanged, profileSave } from '../actions';
import { Card, CardSection, Button, Input } from './common';

class ProfileEdit extends Component {

  onButtonPress() {
    const { email, password } = this.props;

    this.props.profileSave({ email, password });
    Alert.alert(
    'Password Changed',
    'Your password was successfully changed!',
  [
    { text: 'Ok' }
  ],
  { cancelable: false });
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <CardSection style={{ backgroundColor: 'transparent' }}>
        <Button onPress={this.onButtonPress.bind(this)}>
          Save Changes
        </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password } = auth;

  return { email, password };
  };

export default connect(mapStateToProps,
  { emailChanged, passwordChanged, profileSave
 })(ProfileEdit);
