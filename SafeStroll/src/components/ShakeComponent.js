import React, { Alert } from 'react-native';
import RNShakeEvent from 'react-native-shake-event';

class ShakeComponent extends React.Component {
  componentWillMount() {
    RNShakeEvent.addEventListener('shake', () => {
      Alert.alert('Phone Shaked!');
    });
  }

  componentWillUnmount() {
    RNShakeEvent.removeEventListener('shake');
  }
}

export default ShakeComponent;
