import React, { Component } from 'react';
import { View, Text } from 'react-native';
//import firebase from 'firebase';
import { connect } from 'react-redux';
import {
  emailChanged,
  passwordChanged,
  signUpUser
} from '../actions';
import { Card, CardSection, Button, Input } from './common';
//import EmployeeForm from './EmployeeForm';

class SignUp extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  // onNameChange(text) {
  //   this.props.nameChanged(text);
  // }
  // onLastNameChange(text) {
  //   this.props.lastNameChanged(text);
  // }
  // onPhoneChange(text) {
  //   this.props.phoneChanged(text);
  // }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onSignButtonPress() {
    const { email, password } = this.props;

    this.props.signUpUser({ email, password });
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
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </CardSection>

          {this.renderError()}

        <CardSection style={{ backgroundColor: 'transparent' }}>
          <Button onPress={this.onSignButtonPress.bind(this)}>
            Create
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
  const { email, password, error } = auth;
  return { email, password, error };
};

export default connect(mapStateToProps, {
   emailChanged, passwordChanged, signUpUser
})(SignUp);
