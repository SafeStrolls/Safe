import React from 'react';
import { StyleSheet } from 'react-native';
import { Scene, Router, Actions, TabIcon } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ContactList from './components/ContactList';
import ContactCreate from './components/ContactCreate';
import ContactEdit from './components/ContactEdit';
import ContactInfo from './components/ContactInfo';
import SignUp from './components/SignUp';
import Start from './components/Start';
import MyProfile from './components/MyProfile';
import ProfileEdit from './components/ProfileEdit';
import Directions from './components/Directions';
import GetAddress from './components/GetAddress';
import GoingHome from './components/GoingHome';


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
        </Scene>

        <Scene key="main" hideNavBar>

          <Scene
            key="mainTabbar"
            tabs
            tabBarStyle={styles.tabBar}
          >

          <Scene
            key="startTab"
            title="Start"
            icon={TabIcon}
          >
            <Scene
              key="startPage"
              component={Start}
            />
            <Scene
              key="goingHome"
              component={GoingHome}
              title="Walk home"
            />
            <Scene
              key="direction"
              component={Directions}
              title="Go home"
            />
            <Scene
              key="address"
              component={GetAddress}
              title="Search for address"
            />
          </Scene>

            <Scene
              key="networkTab"
              title="My Network"
              icon={TabIcon}
            >

            <Scene
              rightTitle="Add"
              onRight={() => Actions.contactCreate()}
              key="contactList"
              component={ContactList}
              title="My network"
              initial
            />
            <Scene
              key="contactCreate"
              component={ContactCreate}
              title="Create contact"
              hideTabBar
            />
            <Scene
              key="contactInfo"
              component={ContactInfo}
              title="Contact info"
              onRight={() => Actions.contactEdit()}
              rightTitle="Edit"
              hideTabBar

            />
              <Scene
                key="contactEdit"
                component={ContactEdit}
                title="Edit Contact"
                hideTabBar
              />

              <Scene
                      key="start"
                      component={Start}
                      title="Go home"
              />

            </Scene>

            <Scene
              key="myProfile"
              title="My Profile"
              icon={TabIcon}
            >
            <Scene
                    key="myProfile"
                    component={MyProfile}
                    title="My profile"
                    onRight={() => Actions.profileEdit()}
                    rightTitle="Edit password"
            />
                  <Scene
                    key="profileEdit"
                    component={ProfileEdit}
                    title="Edit my profile"
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
    //backgroundColor: '#d1d1d1',
    borderTopWidth: 1,
    padding: 5,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 }
  }
});

export default RouterComponent;
