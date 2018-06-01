import _ from 'lodash';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Communications from 'react-native-communications';
import ContactForm from './ContactForm';
import { contactUpdate, contactDelete } from '../actions';
import { Card, CardSection, Button } from './common';

class ContactInfo extends Component {
  componentWillMount() {
    _.each(this.props.contact, (value, prop) => {
      this.props.contactUpdate({ prop, value });
    });
  }

onTextPress() {
  const { phone } = this.props;

  //SKICKA SMS TILL EN KONTAKT
  //Communications.text(phone, `Hi, I'm home! <3`);
}
onAccept() {
  const { userName, phone, uid } = this.props;
  this.props.contactDelete({ userName, phone, uid: this.props.uid });
  //Actions.pop(); 
}

  render() {
    return (
      <Card>
        <ContactForm {...this.props} />

          <CardSection style={{ backgroundColor: 'transparent' }}>
            <Button onPress={this.onTextPress.bind(this)}>
              Send Message
            </Button>
          </CardSection>
          <CardSection style={{ backgroundColor: 'transparent' }}>
            <Button
            onPress={() => Alert.alert(
              'Delete Contact',
              'Are you sure you want to delete the contact?',
            [
              { text: 'Yes', onPress: () => this.onAccept() },
              { text: 'Cancel' },
            ],
            { cancelable: false }
            )}
            >
            Delete Contact
            </Button>
          </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { userName, phone, uid } = state.contactForm;

  return { userName, phone, uid };
};

export default connect(mapStateToProps, {
  contactUpdate, contactDelete })(ContactInfo);
