import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';

export default function Privacy(){
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Privacy</Text>
        <Text style={styles.paragraph}>We take your privacy seriously. This app collects only the data necessary to provide services and improve your experience. You can manage permissions and data sharing settings here.</Text>

        <Text style={[styles.subtitle,{marginTop:16}]}>Data collected</Text>
        <Text style={styles.paragraph}>Vehicle data, diagnostic codes, usage analytics, and basic profile information (name, email).</Text>

        <Text style={[styles.subtitle,{marginTop:12}]}>How we use data</Text>
        <Text style={styles.paragraph}>Provide personalized insights, send maintenance reminders, and improve AI suggestions. We do not share data with third parties except as required for functionality.</Text>

      </ScrollView>
    </View>
  );
}
