//import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, profileSave } from '../actions';
import { Card, CardSection, Button, Input } from './common';

class ProfileEdit extends Component {

  // componentWillMount() {
  //   _.each(this.props.user, (prop, value) => {
  //     this.props.profileUpdate({ prop, value });
  //   });
  // }

  onButtonPress() {
    const { email, password } = this.props; //removed shift after phone

    this.props.profileSave({ email, password });
    //, uid: this.props.user.uid
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

        <CardSection>
        <Button onPress={this.onButtonPress.bind(this)}>
          Save Changes
        </Button>
        </CardSection>
      </Card>
        // <CardSection>
        //   <Input
        //     label="Email"
        //     placeholder="email@gmail.com"
        //     onChangeText={this.onEmailChange.bind(this)}
        //     value={this.props.email}
        //   />
        // </CardSection>

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
