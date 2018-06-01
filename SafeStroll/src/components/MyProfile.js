import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, Alert, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Icon, Right } from 'native-base';
import { Card, CardSection, Button, Spinner } from './common';
import { logoutUser, deleteUser, removeUser } from '../actions';

class MyProfile extends Component {
    state = { showModal: false }

    onLogoutButtonPress() {
      const { email, password } = this.props;

      this.props.logoutUser({ email, password });
    }

    onAccept() {
      const { email, password } = this.props;

      this.props.deleteUser({ email, password });
      this.props.removeUser();
    }

    logoutButton() {
      if (this.props.loading) {
        return <Spinner size="large" />;
      }
      return (
        <Button onPress={this.onLogoutButtonPress.bind(this)}>
          Log Out
        </Button>
      );
    }

    deleteAccountButton() {
      if (this.props.loading) {
        return <Spinner size="large" />;
      }
      return (
        <Button
        onPress={() => Alert.alert(
          'Delete Account',
          'Are you sure you want to delete your account?',
        [
          { text: 'Yes', onPress: () => this.onAccept() },
          { text: 'Cancel' },
        ],
        { cancelable: false }
      )}>
        Delete Account
        </Button>
      );
    }


  render() {
    const user = firebase.auth().currentUser;
    const email = user.email;
    const userName = user.userName;

        return (
          <Card>
            <CardSection style={{ backgroundColor: 'transparent', height: 180, alignSelf: 'center' }}>
              <Image
              source={require('./common/img/profilePic.png')}
              style={{ borderRadius: 90, height: 200, width: 200, marginTop: -20, opacity: 0.5 }}
              />
            </CardSection>

            <CardSection style={{ height: 50 }}>
              <Text style={styles.titleStyle}>
                Username:
              </Text>
              <Text style={styles.emailStyle}>
                {userName}
              </Text>
            </CardSection>

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
                Password: *****
              </Text>
              <Right><Icon
                      name="md-create" onPress={() => Actions.profileEdit()}
              />
            </Right>
            </CardSection>

            <CardSection style={{ backgroundColor: 'transparent' }}>
              {this.logoutButton()}
            </CardSection>

            <CardSection style={{ backgroundColor: 'transparent' }}>
              {this.deleteAccountButton()}
            </CardSection>

          </Card>
        );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingTop: 7,
    paddingLeft: 10
  },
  emailStyle: {
    fontSize: 18,
    paddingTop: 7,
    paddingLeft: 10,
    color: 'black'
  }
};

const mapStateToProps = () => {
  const { email, password, error } = '';
  const { loading } = false;

  return { email, password, error, loading };
  };

export default connect(mapStateToProps,
  { logoutUser, deleteUser, removeUser })(MyProfile);
