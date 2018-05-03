import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold', //stog 600 förut?
    padding: 10
    // paddingTop: 10,
    // paddingBotton: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#252579',
    borderRadius: 5,
    borderWidth: 0,
    borderColor: '#fff', //#007aff is the old blue color
    marginLeft: 5,
    marginRight: 5
  }
};

export { Button };
