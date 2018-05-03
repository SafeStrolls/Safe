import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const SOSButton = ({ onPress, children }) => {
  const { SOSbuttonStyle, SOStextStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={SOSbuttonStyle}>
      <Text style={SOStextStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  SOStextStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10
  },
  SOSbuttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'red',
    borderRadius: 5,
    borderWidth: 0,
    borderColor: '#fff',
    marginLeft: 5,
    marginRight: 5,
    marginTop: -10
  }
};

export { SOSButton };
