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
            <Text style={styles.buttonText}>העלה אסמכתא לכאן</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sendButton} onPress={handleSendConfirmation}>
            <Text style={styles.buttonText}>שלח אסמכתא</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={() => Linking.openURL('https://wa.link/vw3un6')}>
            <Text style={styles.buttonText}>צרו קשר בהודעה ישירה</Text>
          </TouchableOpacity>

          <Image source={require('../assets/sign.png')} style={{ width: 100, height: 50, alignSelf: 'center', marginTop: 15, }} />
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center', },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    description: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center',
    },
    step: {
      padding: 5,
      textAlign: 'right',
      fontSize: 16,
      marginVertical: 3,
    },
    details: { fontSize: 18, padding: 5, marginBottom: 10, textAlign: 'right', color: '#333' },
    contactButton: {
      backgroundColor: '#007FFD',
      padding: 15,
      borderRadius: 20,
      width: '100%',
      alignItems: 'center',
    },
    uploadButton: {
      marginTop: 5,
      backgroundColor: '#34C759',
      padding: 15,
      borderRadius: 20,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
});

export default BankTransferScreen;
