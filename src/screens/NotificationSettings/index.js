import React, {useState} from 'react';
import {View, Text, Switch, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import styles from './styles';
import {colors} from '../../theme';

export default function NotificationSettings({navigation}){
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{
        flexDirection:"row",
        alignItems:"center",
        gap:10,
        marginBottom:20
      }}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Notification Settings</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowText}>Push notifications</Text>
        <Switch value={push} onValueChange={setPush} />
      </View>
      <View style={styles.row}>
        <Text style={styles.rowText}>Email notifications</Text>
        <Switch value={email} onValueChange={setEmail} />
      </View>
    </View>
  );
}
