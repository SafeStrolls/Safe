//Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

//Make a component
const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#d1d1d1',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 20
  },
  textStyle: {
    fontSize: 32,
    //fontWeight: 'bold',
    fontFamily: 'Arial',
    color: '#252579', //#191970 was the color before (rubrik header?)
    elevation: 2,
    position: 'relative',
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.1
  }

};

//Make the component avilable to other parts of the app
export { Header }; //other files should be able to make use of it
