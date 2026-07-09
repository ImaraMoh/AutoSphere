import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import {colors} from '../../theme';

export default function EditProfile({navigation}){
  const [name, setName] = useState('Imara');
  const [email, setEmail] = useState('imara@example.com');

  function handleSave(){
    Alert.alert('Saved','Profile changes saved');
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Edit Profile</Text>
        <Text style={styles.label}>Full name</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} />
        <Text style={styles.label}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />

        <View style={{marginTop:20}}>
          <Button title="Save changes" onPress={handleSave} />
        </View>
      </ScrollView>
    </View>
  );
}
