import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TextInput, Button, Menu, Divider, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';

export default function DetailScreen({route, navigation}) {
  const {item} = route.params;

  const [unEditable, setUnEditable] = React.useState(true);
  const [name, setName] = React.useState(item.user.name);
  const [email, setEmail] = React.useState(item.user.email);
  const [phone, setPhone] = React.useState(item.user.phoneNumber);
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const editItem = () => {
    firestore()
      .collection('Contacts')
      .doc(item.id)
      .set({
        email: email,
        name: name,
        phoneNumber: phone,
      })
      .then((res) => {
        console.log(res);
        navigation.navigate('Home');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteItem = () => {
    firestore()
      .collection('Contacts')
      .doc(item.id)
      .delete()
      .then((res) => {
        console.log(res);
        navigation.navigate('Home');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Provider>
      <View>
        <View
          style={{
            height: 60,
            flexDirection: 'row',
            borderBottomWidth: 0.5,
          }}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Icon name="left" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{flex: 8}}></View>
          <View
            style={{
              flex: 3,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            {!unEditable && (
              <TouchableOpacity onPress={editItem}>
                <Icon name="check" size={24} color="green" />
              </TouchableOpacity>
            )}

            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity onPress={openMenu}>
                  <FIcon name="dots-three-vertical" size={24} color="black" />
                </TouchableOpacity>
              }>
              <Menu.Item
                onPress={() => {
                  setUnEditable(false), closeMenu();
                }}
                title="Edit"
              />
              <Divider />
              <Menu.Item
                onPress={() => {
                  closeMenu(),
                  deleteItem()
                }}
                title="Delete"
              />
            </Menu>
          </View>
        </View>
        <View>
          <TextInput
            style={{margin: 10}}
            mode="flat"
            disabled={unEditable}
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={{margin: 10}}
            mode="flat"
            disabled={unEditable}
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={{margin: 10}}
            mode="flat"
            disabled={unEditable}
            label="Phone number"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
      </View>
    </Provider>
  );
}
