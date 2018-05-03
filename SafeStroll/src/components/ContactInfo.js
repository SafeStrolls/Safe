import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import ContactForm from './ContactForm';
import { contactUpdate } from '../actions';
import { Card, CardSection, Button } from './common';

class ContactInfo extends Component {
  // state = { showModal: false }
  componentWillMount() {
    _.each(this.props.contact, (value, prop) => {
      this.props.contactUpdate({ prop, value });
    });
  }

onTextPress() {
  const { phone } = this.props;

  Communications.text(phone, `Hi, I'm home! <3`);
  //DETTA OVAN ÄR FÖR ATT SKICKA SMS TILL EN KONTAKT...
}

  render() {
    return (
      <Card>
        <ContactForm />

          <CardSection style={{ backgroundColor: 'transparent' }}>
            <Button onPress={this.onTextPress.bind(this)}>
              Send Message
            </Button>
          </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone } = state.contactForm;

  return { name, phone };
};

export default connect(mapStateToProps, {
  contactUpdate })(ContactInfo);
