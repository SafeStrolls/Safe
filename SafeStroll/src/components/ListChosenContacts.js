import React, { Component } from 'react';
import Communications from 'react-native-communications';
import SendSMS from 'react-native-sms';
import { Text, View } from 'react-native';
import { Icon } from 'native-base';
import { CardSection } from './common';


class ListChosenContacts extends Component {
  sendMessage() {
  const { phone } = this.props.chosenContacts;
  console.log(phone);
	// SendSMS.send({
	// 	body: 'The default body of the SMS!',
	// 	recipients: [phone],
	// 	successTypes: ['sent', 'queued']
	// }, (completed, cancelled, error) => {
	// 	console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
	// });
}
  // sendMessage() {
  //   const { phone } = this.props.chosenContacts;
  //   console.log(phone);
  //
  //   Communications.text(phone, Hi, I'm home! <3);
  //   //DETTA OVAN ÄR FÖR ATT SKICKA SMS TILL EN KONTAKT...
  // }

  render() {
    const { userName } = this.props.chosenContacts;

    return (

        <View>

            <Text style={styles.titleStyle}>
              {userName}
            </Text>
            {this.sendMessage()}

        </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default ListChosenContacts;
