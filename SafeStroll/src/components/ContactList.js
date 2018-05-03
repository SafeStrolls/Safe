import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
//import firebase from 'firebase';
import { Container, Item, Input, Icon } from 'native-base';
import { contactsFetch } from '../actions';
import { Card, CardSection } from './common';
import ListItem from './ListItem';
//import SearchBar from './SearchBar';


class ContactList extends Component {
  componentWillMount() {
    this.props.contactsFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  formatData(data) {
    // We're sorting by alphabetically so we need the alphabet
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Need somewhere to store our data
    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    // Each section is going to represent a letter in the alphabet so we loop over the alphabet
    for (let sectionId = 0; sectionId < alphabet.length; sectionId++) {
      // Get the character we're currently looking for
      const currentChar = alphabet[sectionId];

      // Get users whose first name starts with the current letter
      const users = data.filter((contact) => contact.name.toUpperCase().indexOf(currentChar) === 0);

      // If there are any users who have a first name starting with the current letter then we'll
      // add a new section otherwise we just skip over it
      if (users.length > 0) {
        // Add a section id to our array so the listview knows that we've got a new section
        sectionIds.push(sectionId);

        // Store any data we would want to display in the section header.
        // In our case we want to show
        // the current character
        dataBlob[sectionId] = { character: currentChar };

        // Setup a new array that we can store the row ids for this section
        rowIds.push([]);

        // Loop over the valid users for this section
        for (let i = 0; i < users.length; i++) {
          // Create a unique row id for the data blob that the listview can use for reference
          const rowId = `${sectionId}:${i}`;

          // Push the row id to the row ids array. This is what listview will reference to pull
          // data from our data blob
          rowIds[rowIds.length - 1].push(rowId);

          // Store the data we care about for this row
          dataBlob[rowId] = users[i];
        }
      }
    }

    return { dataBlob, sectionIds, rowIds };
  }
  createDataSource({ contacts }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(contacts);
  }

/////////////

listenForItems(itemsRef) {
  itemsRef.on('value', (snap) => {
    const items = [];
    snap.forEach((child) => {
      items.push({
        name: child.val().name,
        phone: child.val().phonecall,
      });
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items)
    });
});
}

  firstSearch() {
    this.searchDirectory(this.itemsRef);
    console.log('inne i firstSearch');
  }

  searchDirectory(itemsRef) {
    const searchText = this.state.searchText.toString();

    if (searchText === '') {
      this.listenForItems(itemsRef);
    } else {
itemsRef.orderByChild('name').on('value', (snap) => {   //denna rad funkar ej
        console.log(snap.val());
        const items = [];
        snap.forEach((child) => {
          items.push({
            name: child.val().name,
            phone: child.val().phone,
          });
        });


        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items)
        });
      });
    }
  }

  ///////

  renderRow(contact) {
    return <ListItem contact={contact} />;
  }

  render() {
    return (
      <Card>
        <CardSection style={{ height: 70, backgroundColor: 'transparent' }}>
          <Container searchBar rounded>
          <Item style={{ backgroundColor: '#d1d1d1', borderRadius: 15 }}>
          <Icon name="ios-search" style={{ paddingLeft: 5 }} />
          <Input
            returnKeyType='search'
            onChangeText={(text) => this.setState({ searchText: text })}
            onSubmitEditing={() => this.firstSearch()}
            placeholder="Search"
          />
          </Item>
          {  // <Button transparent>
            //   <Text>Search</Text>
            // </Button>
          }
          </Container>
        </CardSection>
        <CardSection style={{ height: 450 }}>
            <ListView
                  removeClippedSubviews={false}
                  enableEmptySections
                  dataSource={this.dataSource}
                  renderRow={this.renderRow}
            />
        </CardSection>

      </Card>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     backgroundColor: '#C1C1C1',
//     borderRadius: 15
//   },
//   input: {
//     height: 30,
//     flex: 1,
//     paddingHorizontal: 8,
//     fontSize: 15,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 2,
//   }
//
// });

const mapStateToProps = state => {
  const contacts = _.map(state.contacts, (val, uid) => {
    return { ...val, uid };
  });

  return { contacts };
};

export default connect(mapStateToProps, { contactsFetch })(ContactList);
