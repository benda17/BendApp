import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useClientsData } from '../context/ClientsDataContext';

function WelcomeScreen() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const { loadClientData } = useClientsData();

  const handleSignIn = async () => {
    if (!email.trim()) {
      Alert.alert("טעות", "בבקשה להכניס כתובת מייל");
      return;
    }

    const success = await loadClientData(email);
    if (!success) {
      Alert.alert("שגיאה", "האימייל לא נמצא במערכת.");
      return;
    }

    navigation.navigate('UserScreen');
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.background}>
      <ImageBackground source={require('./t.jpg')} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
              <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
                <Text style={styles.tagline}>E-commerce Management to the Next Level</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="המייל שלך בחברת בנדה בע״מ..."
                  placeholderTextColor="#aaa"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                  <Text style={styles.signInText}>כניסה</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpButton} onPress={() => Linking.openURL('https://wa.link/nuj0ca')}>
                  <Text style={styles.signUpText}>הרשמה לניהול החנויות</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  overlay: { flex: 1, width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.9)", justifyContent: "center", alignItems: "center" },
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center" },
  logoContainer: { alignItems: "center", marginBottom: 20 },
  logo: { width: 200, height: 100, marginBottom: 10 },
  tagline: { fontSize: 16, fontWeight: "600", color: "#000", textAlign: "center" },
  inputContainer: { width: "90%", alignItems: "center" },
  input: { width: "100%", height: 50, backgroundColor: "grey", borderRadius: 25, paddingHorizontal: 15, fontSize: 16, color: "white", marginBottom: 10, textAlign: 'center' },
  signInButton: { width: "100%", height: 50, backgroundColor: "#007FFD", borderRadius: 25, justifyContent: "center", alignItems: "center" },
  signUpButton: { marginTop: 15, width: "100%", height: 50, borderWidth: 1, borderColor: "black", backgroundColor: 'white', borderRadius: 25, justifyContent: "center", alignItems: "center" },
  signInText: { fontSize: 18, fontWeight: "bold", color: "white" },
  signUpText: { fontSize: 18, color: "black" },
  sign: { 
    width: 80,
    height: 80, 
    resizeMode: 'contain',
    transform: [{ rotate: '0deg' }],
  },
});

export default WelcomeScreen;
