import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, Alert, Share, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PayoneerPaymentScreen = () => {
  const handleWhatsAppContact = () => {
    const whatsappLink = 'https://wa.link/vw3un6'; // קישור ליצירת קשר בוואטסאפ
    Linking.openURL(whatsappLink);
  };

  const handleUploadScreenshot = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "יש לאשר גישה לגלריה כדי להעלות צילום מסך.");
      return;
    }
    
    // Launch image picker
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    
    if (pickerResult.cancelled) {
      return;
    }
    
    // Use React Native's built-in Share API to share the selected image
    try {
      await Share.share({
        title: 'Payment Screenshot',
        message: 'Here is my payment screenshot:',
        url: pickerResult.uri,
      });
    } catch (error) {
      console.error("Error sharing screenshot:", error);
      Alert.alert("Error", "Failed to share the screenshot.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>הנחיות לתשלום דרך Payoneer</Text>
        <Text style={styles.description}>
          על מנת לבצע את התשלום, יש להיכנס לחשבון Payoneer שלך ולעקוב אחר השלבים הבאים:
        </Text>
        <Text style={styles.step}>1. היכנס לחשבון Payoneer שלך.</Text>
        <Text style={styles.step}>2. לחץ על האפשרות "Make a Payment".</Text>
        <Text style={styles.step}>3. לחץ על ״העבר תשלום לחשבון פיוניר״</Text>
        <Text style={styles.step}>4. הזן את הסכום המבוקש (180$ או 350$) ובחר במטבע USD.</Text>
        <Text style={styles.step}>5. הזן את הפרטים הבאים:</Text>
        <Text style={styles.details}>אימייל yazambenda@gmail.com</Text>
        <Text style={styles.step}>6. אשר ושלח את התשלום.</Text>
        <Text style={styles.note}>
          לאחר השלמת התשלום, אנא שלח אישור תשלום כדי שנוכל לוודא את קבלתו.
        </Text>

        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadScreenshot}>
          <Text style={styles.buttonText}>העלאת צילום מסך לתשלום</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactButton} onPress={handleWhatsAppContact}>
          <Text style={styles.buttonText}>ליצירת קשר בוואטסאפ</Text>
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
  details: { fontSize: 18, padding: 5, marginBottom: 10, textAlign: 'center', color: '#007ffd', fontStyle: 'italic' },
  note: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  contactButton: {
    marginTop: 10,
    backgroundColor: '#007ffd',
    padding: 15,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  uploadButton: {
    marginTop: 10,
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

export default PayoneerPaymentScreen;