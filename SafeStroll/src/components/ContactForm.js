import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { contactUpdate } from '../actions';
import { CardSection } from './common';

class ContactForm extends Component {
  render() {
    return (
      <View>
        <CardSection style={{ height: 50 }}>
          <Text style={styles.titleStyle}>
            Username:
          </Text>
          <Text style={styles.titleStyle}>
            {this.props.userName}
          </Text>
        </CardSection>

        <CardSection style={{ height: 50 }}>
          <Text style={styles.titleStyle}>
            Phone:
          </Text>
          <Text style={styles.titleStyle}>
            {this.props.phone}
          </Text>
        </CardSection>
  </View>
    );
  }
}

const styles = {
  titleStyle: {
    color: 'black',
    fontSize: 18,
    padding: 10,
    paddingLeft: 10,
    paddingTop: 7
  }
};

const mapStateToProps = (state) => {
  const { userName, phone } = state.contactForm;

  return { userName, phone };
};

export default connect(mapStateToProps, { contactUpdate })(ContactForm);
