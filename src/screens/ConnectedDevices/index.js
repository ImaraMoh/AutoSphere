import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import styles from './styles';
import {Ionicons} from '@expo/vector-icons';
import {colors} from '../../theme';

const devices = [
  {id:'1', name:'iPhone 14'},
  {id:'2', name:'OBD-II Dongle'},
  {id:'3', name:'CarPlay'}
];

export default function ConnectedDevices(){
  function handleRemove(item){
    Alert.alert('Remove device', `Remove ${item.name}?`, [{text:'Cancel',style:'cancel'},{text:'Remove',style:'destructive'}]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connected Devices</Text>
      <FlatList
        data={devices}
        keyExtractor={d=>d.id}
        renderItem={({item})=> (
          <View style={styles.row}>
            <Text style={styles.rowText}>{item.name}</Text>
            <TouchableOpacity onPress={()=>handleRemove(item)}>
              <Ionicons name="trash-outline" size={20} color={colors.red} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
