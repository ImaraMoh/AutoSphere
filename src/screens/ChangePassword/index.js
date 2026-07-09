import React, {useState} from 'react';
import {View, Text, TextInput, Alert, ScrollView, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import styles from './styles';
import Button from '../../components/Button';

export default function ChangePassword({navigation}){
  const [current, setCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  function handleChange(){
    if(password.length < 6){
      Alert.alert('Error','Password must be at least 6 characters');
      return;
    }
    if(password !== confirm){
      Alert.alert('Error','Passwords do not match');
      return;
    }
    Alert.alert('Success','Password changed');
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{
          flexDirection:"row",
          alignItems:"center",
          gap:10,
          marginBottom:20
        }}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Ionicons name="arrow-back" size={25} color="#0D1117" />
          </TouchableOpacity>
          <Text style={styles.title}>Change Password</Text>
        </View>
        <Text style={styles.label}>Current password</Text>
        <TextInput secureTextEntry value={current} onChangeText={setCurrent} style={styles.input} />
        <Text style={styles.label}>New password</Text>
        <TextInput secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
        <Text style={styles.label}>Confirm new password</Text>
        <TextInput secureTextEntry value={confirm} onChangeText={setConfirm} style={styles.input} />

        <View style={{marginTop:20}}>
          <Button title="Change Password" onPress={handleChange} />
        </View>
      </ScrollView>
    </View>
  );
}
