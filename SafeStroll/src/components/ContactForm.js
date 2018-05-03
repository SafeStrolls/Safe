import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { contactUpdate } from '../actions';
import { CardSection, Input } from './common';

class ContactForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
        <Input
          label="Name"
          placeholder="Jane"
          value={this.props.name}
          onChangeText={value => this.props.contactUpdate({ prop: 'name', value })}
        />
      </CardSection>

      <CardSection>
        <Input
          label="Phone"
          placeholder="123-123-123"
          value={this.props.phone}
          onChangeText={value => this.props.contactUpdate({ prop: 'phone', value })}
        />
      </CardSection>
  </View>
      // <CardSection style={{ flexDirection: 'column' }}>
      //   <Text style={styles.pickerTextStyle}>Shift</Text>
      //     <Picker
      //       style={{ flex: 1 }}
      //       selectedValue={this.props.shift}
      //       onValueChange={value => this.props.contactUpdate({ prop: 'shift', value })}
      //     >
      //       <Picker.Item label="Monday" value="Monday" />
      //       <Picker.Item label="Tuesday" value="Tuesday" />
      //       <Picker.Item label="Wednesday" value="Wednesday" />
      //       <Picker.Item label="Thursday" value="Thursday" />
      //       <Picker.Item label="Friday" value="Friday" />
      //       <Picker.Item label="Saturday" value="Saturday" />
      //       <Picker.Item label="Sunday" value="Sunday" />
      //     </Picker>
      // </CardSection>

    );
  }
}

// const styles = {
//   pickerTextStyle: {
//     fontSize: 18,
//     paddingLeft: 20
//   }
// };

const mapStateToProps = (state) => {
  const { name, phone } = state.contactForm;

  return { name, phone };
};

export default connect(mapStateToProps, { contactUpdate })(ContactForm);
