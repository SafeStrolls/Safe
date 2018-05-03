import React, { Component } from 'react';
//import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, signUpUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  signUpButton() {
    // if (this.props.loading) {
    //   return <Spinner size="large" />;
    // }
    return (
      <Text style={{ color: 'white' }}>
      Do you not have an account yet? {' '}
        <Text style={style.signUp}>
          <Text onPress={() => Actions.signUp()}>
            Sign Up
          </Text>
        </Text>
      </Text>

    );
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'transparent' }}>
          <Text style={style.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <ImageBackground
        source={require('./common/img/streetBackground.jpg')}
        style={style.container}
      >
      <Card>
      {  // <View style={{ alignItems: 'center', opacity: 0.8 }}>
        // <Image
        //     source={{ uri: 'https://4vector.com/i/free-vector-street-lamp-clip-art_107509_Street_Lamp_clip_art_hight.png' }}
        //     style={{ resizeMode: 'contain', width: 200, height: 170 }}
        // />
        // </View>
      }
        <CardSection style={style.cardSectionStyle}>
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

        <CardSection style={{ backgroundColor: 'transparent', marginTop: 10 }}>
          {this.renderButton()}
        </CardSection>

        <CardSection style={{ backgroundColor: 'transparent' }}>
            {this.signUpButton()}
        </CardSection>
    </Card>
    </ImageBackground>
    );
  }
}

// const styles = {
//   errorTextStyle: {
//     fontSize: 20,
//     alignSelf: 'center',
//     color: 'red'
//   },
//   textStyle: {
//     fontSize: 18,
//     alignSelf: 'center',
//     color: 'black',
//     paddingTop: 10
//   },
//   cardSectionStyle: {
//     width: 200
//   }
// };

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  textStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'black',
    paddingTop: 10
  },
  cardSectionStyle: {
    width: 300,
    marginTop: 10,
    marginBottom: 2
  },
  signUp: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
  };

export default connect(mapStateToProps,
  { emailChanged, passwordChanged, loginUser, signUpUser
 })(LoginForm);
