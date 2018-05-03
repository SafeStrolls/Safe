import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner, Confirm } from './common';
import { logoutUser, deleteUser } from '../actions';

class MyProfile extends Component {
    state = { showModal: false }
    //const user = firebase.auth().currentUser;

    onLogoutButtonPress() {
      const { email, password } = this.props;

      this.props.logoutUser({ email, password });
    }

    onDeleteAccountButtonPress() {
      // this.setState({ showModal: !this.state.showModal });
      //
      // const { email, password } = this.props;
      //
      // this.props.deleteUser({ email, password });
    }

    onDecline() {
      this.setState({ showModal: false });
    }

    onAccept() {
      this.setState({ showModal: !this.state.showModal });

      const { email, password } = this.props;

      this.props.deleteUser({ email, password });
    }

    logoutButton() {
      if (this.props.loading) {
        return <Spinner size="large" />;
      }

      return (
        <Button onPress={this.onLogoutButtonPress.bind(this)}>
          Log out
        </Button>
      );
    }

    deleteAccountButton() {
      return (
        <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
        Delete Account
        </Button>
      );
    }


  render() {
    const user = firebase.auth().currentUser;
    const email = user.email;
    // const password = user.password;

        return (
          <Card>
            <CardSection style={{ height: 50 }}>
              <Text style={styles.titleStyle}>
                Email:
              </Text>
              <Text style={styles.emailStyle}>
                {email}
              </Text>
            </CardSection>
            <CardSection style={{ height: 50 }}>
              <Text style={styles.titleStyle}>
                Password: ******
              </Text>
            </CardSection>

            <CardSection style={{ backgroundColor: 'transparent' }}>
              {this.logoutButton()}
            </CardSection>

            <CardSection style={{ backgroundColor: 'transparent' }}>
              {this.deleteAccountButton()}
            </CardSection>

            <Confirm
              visible={this.state.showModal}
              onAccept={this.onAccept.bind(this)} //lägg till NÅTSOMREFTILLKONTAKTENIFRÅGA?
              onDecline={this.onDecline.bind(this)}
            >
              Are you sure you want to delete your account?
            </Confirm>

          </Card>
        );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    padding: 10
  },
  emailStyle: {
    fontSize: 18,
    padding: 10,
    color: '#007aff'
  }
};

const mapStateToProps = () => {
  // console.log('auth:');
  // console.log({ auth });
  const { email, password, error } = '';
  const { loading } = false;

  return { email, password, error, loading };
  };

export default connect(mapStateToProps,
  { logoutUser, deleteUser })(MyProfile);

//export default MyProfile;
