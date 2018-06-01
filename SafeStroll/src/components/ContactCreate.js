import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contactUpdate, contactCreate } from '../actions';
import { Card, CardSection, Button, Input } from './common';

class ContactCreate extends Component {
  onButtonPress() {
    const { name, phone } = this.props;

    this.props.contactCreate({ name, phone });
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
