import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contactUpdate, contactCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import ContactForm from './ContactForm';


class ContactCreate extends Component {
  onButtonPress() {
    const { name, phone } = this.props;

    this.props.contactCreate({ name, phone });
  }

  render() {
    return (
      <Card>
        <ContactForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
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

export default connect(mapStateToProps,
  { contactUpdate, contactCreate })(ContactCreate);
