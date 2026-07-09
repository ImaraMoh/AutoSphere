import React, {useState} from 'react';
import {View, Text, Switch} from 'react-native';
import styles from './styles';
import {colors} from '../../theme';

export default function NotificationSettings(){
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Settings</Text>
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
