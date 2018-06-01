import React from 'react';
import { StyleSheet, Component, Text, Image, Alert } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SearchUsers from './components/SearchUsers';
import ContactList from './components/ContactList';
import ContactEdit from './components/ContactEdit';
import ContactInfo from './components/ContactInfo';
import SignUp from './components/SignUp';
import Start from './components/Start';
import MyProfile from './components/MyProfile';
import ProfileEdit from './components/ProfileEdit';
import ChooseContacts from './components/ChooseContacts';
import GetAddress from './components/GetAddress';
import GoingHome from './components/GoingHome';
import GetUserName from './components/GetUserName';
import UpdateCurrentLocation from './components/UpdateCurrentLocation';
import MessageToChosen from './components/MessageToChosen';

class TabIconStart extends React.Component {
    render() {
        return (
          <Image
            style={{ width: 30, height: 30, opacity: 0.5, marginTop: 5 }}
            source={require('./images/homeicon.png')}
          />
        );
      }
    }

class TabIconMyNetwork extends React.Component {
    render() {
        return (
          <Image
            style={{ width: 28, height: 26, opacity: 0.5, marginTop: 5 }}
            source={require('./images/mynetworkicon.png')}
          />
        );
    }
}
class TabIconMyProfile extends React.Component {
    render() {
        return (
          <Image
            style={{ width: 42, height: 48, opacity: 0.5, marginTop: 2 }}
            source={require('./images/myprofileicon.png')}
          />
        );
    }
}

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>

        <Scene key="auth">
          <Scene
            key="login"
            component={LoginForm}
            hideNavBar
          />
          <Scene
            key="signUp"
            component={SignUp}
            title="Sign up"
          />
          <Scene
            key="GetUserName"
            component={GetUserName}
            title="Choose Username and Phone"
          />
        </Scene>

        <Scene key="main" hideNavBar>

          <Scene
            key="welcomePage"
            component={UpdateCurrentLocation}
            title="Welcome to SafeStroll"
          />

          <Scene
            key="mainTabbar"
            tabs
            tabBarStyle={styles.tabBar}
          >

          <Scene
            key="startTab"
            title="Start"
            icon={TabIconStart}
          >
            <Scene
              key="startPage"
              component={Start}
              backTitle=" "
              rightButtonImage={require('./images/infoicon.png')}
              onRight={() => Alert.alert(
                'Info',
                'Hello and welcome to SafeStroll! \n \n' +
                ' I want to make sure that you and your beloved ones feel as safe as possible. \n' +
                ' To begin your route, press the "Go Home" button and choose' +
                ' all friends who will see your position during your' +
                ' way to your destination. \n \n' +
                ' Remember to be careful, and have a very Safe Stroll!',
                [
                  { text: 'Got it!', onPress: () => console.log('"Got it" pressed') },
                ],
                { cancelable: false }
              )}
            />
            <Scene
              key="goingHome"
              component={GoingHome}
              title="Go Home"
            />
            <Scene
              key="direction"
              component={ChooseContacts}
              title="Choose Contacts"
              rightButtonImage={require('./images/infoicon.png')}
              onRight={() => Alert.alert(
                'Info',
                'The contacts that you choose here will be able to ' +
                'see and follow your position on a map.' +
                ' When you reach your destination, the chosen contacts' +
                ' will automatically be informed that you have arrived. \n \n' +
                ' Choose your contacts wisely!',
                [
                  { text: 'I understand!',
                  onPress: () => console.log('"I undetstand..." pressed') },
                ],
                { cancelable: false }
              )}
            />
            <Scene
              key="address"
              component={GetAddress}
              title="Search for address"
            />

            <Scene
              key="sendMessage"
              component={MessageToChosen}
              title="Messages Sent"
            />

          </Scene>

            <Scene
              key="networkTab"
              title="My Network"
              icon={TabIconMyNetwork}
            >

            <Scene
              leftButtonImage={require('./images/addContact.png')}
              onLeft={() => Actions.contactCreate()}
              rightButtonImage={require('./images/infoicon.png')}
              onRight={() => Alert.alert(
                'Info',
                'This is were your contacts are listed. ' +
                'Your can see and edit their information by clicking ' +
                'on the names and you can add new contacts by ' +
                'clicking the icon to the left.',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
              )}
              key="contactList"
              component={ContactList}
              title="My Network"
              initial
            />
            <Scene
              key="contactCreate"
              component={SearchUsers}
              title="Add Contact"
              hideTabBar
            />
            <Scene
              key="contactInfo"
              component={ContactInfo}
              title="Contact Info"
              hideTabBar

            />

              <Scene
                key="start"
                component={Start}
                title="Go Home"
              />

            </Scene>

            <Scene
              key="myProfile"
              title="My Profile"
              icon={TabIconMyProfile}
            >
            <Scene
                        key="myProfile"
                        component={MyProfile}
                        title="My Profile"
                        rightButtonImage={require('./images/infoicon.png')}
                        onRight={() => Alert.alert(
                          'Info',
                          'It is of great importance that our users are aware of ' +
                          'the fact that their data will be stored in an online database. ' +
                          'You can ask the developers to delete your personal data at any time ' +
                          'by contacting them on the email address safestrollteam@safestroll.com',
                          [
                            { text: 'OK, got it!', onPress: () => console.log('OK Pressed') },
                          ],
                          { cancelable: false }
                        )}
            />
                  <Scene
                    key="profileEdit"
                    component={ProfileEdit}
                    title="New Password"
                    hideTabBar
                  />

            </Scene>

            </Scene>

          </Scene>


        </Scene>
      </Router>


  );
};

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    padding: 5,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 }
  }
});

export default RouterComponent;
