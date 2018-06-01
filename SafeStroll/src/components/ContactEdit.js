import _ from 'lodash';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { contactUpdate, contactSave, contactDelete } from '../actions';
import { Card, CardSection, Button, Input } from './common';

class ContactEdit extends Component {
  componentWillMount() {
    _.each(this.props.contact, (value, prop) => {
      this.props.contactUpdate({ prop, value });
    });
  }

onButtonPress() {
  const { name, phone, uid } = this.props;
  this.props.contactSave({ name, phone, uid: this.props.uid });
  Actions.pop(2);
}

onAccept() {
  const { name, phone, uid } = this.props;
  this.props.contactDelete({ name, phone, uid: this.props.uid });
  Actions.pop(2); 
}

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Name:"
            placeholder="Jane"
            editable={false}
            value={this.props.name}
            onChangeText={value => this.props.contactUpdate({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone:"
            placeholder="123-123-123"
            value={this.props.phone}
            onChangeText={value => this.props.contactUpdate({ prop: 'phone', value })}
          />
        </CardSection>

          <CardSection style={{ backgroundColor: 'transparent' }}>
            <Button onPress={this.onButtonPress.bind(this)}>
              Save Changes
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
  const { name, phone, uid } = state.contactForm;

  return { name, phone, uid };
};

export default connect(mapStateToProps, {
  contactUpdate, contactSave, contactDelete })(ContactEdit);
