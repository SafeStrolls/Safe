import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Right, Icon } from 'native-base';
import { connect } from 'react-redux';
import { setChosenContatcs } from '../actions';
import { CardSection } from './common';
import CheckBox from 'react-native-checkbox';


class ListItemPosition extends Component {

  onClick(userName) {
    const { phone } = this.props.contact;
    userName.checked = !userName.checked;


    if (!userName.checked) {
      this.props.setChosenContatcs({ userName, phone });
    }
  }

  render() {
    const { userName } = this.props.contact;

    return (
        <View>
          <CardSection>
          <Icon name="ios-person" />
            <Text style={styles.titleStyle}>
              {userName}
            </Text>
            <Right>
            <CheckBox
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  style={{ flex: 1, padding: 10 }}
                  onClick={() => this.onClick(userName)}
                  isChecked={userName.checked}
                  label=''
            />
            </Right>
          </CardSection>
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

const mapStateToProps = ({ users }) => {
  const { userName, phone } = users;
  return { userName, phone };
};

export default connect(mapStateToProps, { setChosenContatcs })(ListItemPosition);
