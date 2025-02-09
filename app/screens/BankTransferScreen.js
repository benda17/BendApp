import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { ScrollView } from 'react-native-gesture-handler';

const BankTransferScreen = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setUploadedFile(result);
      Alert.alert('Success', 'File uploaded successfully!');
    }
  };

  const handleSendConfirmation = () => {
    if (uploadedFile) {
      // Logic to send the file (Webhook, Email, WhatsApp API, etc.)
      Alert.alert('Confirmation Sent', 'Your transfer confirmation has been sent.');
    } else {
      Alert.alert('Error', 'Please upload the transfer confirmation file first.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>תשלום שעות בהעברה בנקאית</Text>
          <Text style={styles.details}>בנק: בנק הפועלים</Text>
          <Text style={styles.details}>סניף: 123</Text>
          <Text style={styles.details}>חשבון: 4567890</Text>
          <Text style={styles.details}>שם החשבון: איתן בן דוד השקעות בע״מ</Text>
          <Text style={styles.details}>סכום: ₪1300</Text>

          <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
            <Text style={styles.buttonText}>Upload Transfer Confirmation</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sendButton} onPress={handleSendConfirmation}>
            <Text style={styles.buttonText}>Send Confirmation</Text>
          </TouchableOpacity>

          <Image source={require('../assets/sign.png')} style={{ width: 200, height: 200, alignSelf: 'center' }} />
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center', },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  details: { fontSize: 18, padding: 5, marginBottom: 10, textAlign: 'right', color: '#333' },
  uploadButton: { backgroundColor: '#007FFD', padding: 15, borderRadius: 10, marginBottom: 15 },
  sendButton: { backgroundColor: '#28A745', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});

export default BankTransferScreen;
