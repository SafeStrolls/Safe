import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text, View } from 'react-native';
import { Container, Item, Input, Icon } from 'native-base';
import { contactsFetch } from '../actions';
import { Card, CardSection } from './common';
import ListItem from './ListItem';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

class ContactList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchedContacts: []
    };
  }

  state = {
    pressedSearch: false
  } ;

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

  createDataSource({ contacts }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(contacts);
    console.log(this.dataSource);
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      const items = [];
      snap.forEach((child) => {
        items.push({
          username: child.val().userName,
          phone: child.val().phone,
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }

  firstSearch() {
    this.searchDirectory(this.itemsRef);
  }

  searchDirectory(itemsRef) {
    const searchText = this.state.searchText.toString();

    if (searchText === '') {
      this.listenForItems(itemsRef);
    } else {
      itemsRef.orderByChild('name').on('value', (snap) => {
        console.log(snap.val());
        const items = [];
        snap.forEach((child) => {
          items.push({
            username: child.val().userName,
            phone: child.val().phone,
          });
        });


        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items)
        });
      });
    }
  }

  searchedContacts = (searchedText) => {
    this.state.pressedSearch = true;
    const searchedContacts = this.props.contacts.filter(
      (contact) => {
        return contact.userName.indexOf(searchedText) > -1;
      });
      this.setState({ searchedContacts });
    };

    renderRow(contact) {
      return <ListItem contact={contact} />;
    }

    returnSearchView() {
      return (
        <Card>
          <CardSection style={{ height: 70, backgroundColor: 'transparent' }}>
            <Container searchBar rounded>
              <Item style={{ backgroundColor: '#d1d1d1', borderRadius: 10 }}>
                <Icon name="ios-search" style={{ paddingLeft: 5 }} />
                <Input
                returnKeyType='search'
                onChangeText={this.searchedContacts.bind(this)}
                placeholder="Search"
                value={this.state.value}
                />
              </Item>
            </Container>
          </CardSection>
        <CardSection style={{ height: 450 }}>
          <ListView
            removeClippedSubviews={false}
            enableEmptySections
            dataSource={ds.cloneWithRows(this.state.searchedContacts)}
            renderRow={this.renderRow}
          />
        </CardSection>

        </Card>
      );
    }

    render() {
      if (!this.state.pressedSearch) {
        return (
          <Card>
            <CardSection style={{ height: 70, backgroundColor: 'transparent' }}>
              <Container searchBar rounded>
                <Item style={{ backgroundColor: '#d1d1d1', borderRadius: 10 }}>
                  <Icon name="ios-search" style={{ paddingLeft: 5 }} />
                  <Input
                    style={{ fontFamily: 'Heiti TC' }}
                    returnKeyType='search'
                    onChangeText={this.searchedContacts.bind(this)}
                    placeholder="Search"
                    value={this.state.value}
                  />
                </Item>
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
      return this.returnSearchView();
    }
  }

  const mapStateToProps = state => {
    const contacts = _.map(state.contacts, (val, uid) => {
      return { ...val, uid };
    });

    return { contacts };
  };

  export default connect(mapStateToProps, { contactsFetch })(ContactList);
