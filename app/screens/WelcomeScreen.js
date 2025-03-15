import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useClientsData } from '../context/ClientsDataContext';
import { WebView } from 'react-native-webview';

function WelcomeScreen() {
  const [email, setEmail] = useState('');
  const [showWebView, setShowWebView] = useState(false);
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

    navigation.replace('Main', { screen: 'UserScreen', params: { email: email.trim() } });  
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.background}>
      <ImageBackground source={require('../assets/backgroundwhite.png')} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
              <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/sign.png')} />
                <Text style={styles.tagline}>לוקחים את עולם האי-קומרס לגבהים חדשים.</Text>
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
                <TouchableOpacity style={styles.signUpButton} onPress={() => setShowWebView(true)}>
                  <Text style={styles.signUpText}>הרשמה לניהול החנויות</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>

      {/* WebView Modal */}
      <Modal visible={showWebView} animationType="slide">
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowWebView(false)}>
            <Text style={styles.closeButtonText}>✖</Text>
          </TouchableOpacity>
          <WebView source={{ uri: 'https://wa.link/nuj0ca' }} />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  overlay: { flex: 1, width: "100%", height: "100%", justifyContent: "center", alignItems: "center" },
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center" },
  logoContainer: { alignItems: "center", marginBottom: 20 },
  logo: { width: 200, height: 100, marginBottom: 10 },
  tagline: { fontSize: 16, fontWeight: "600", color: "#000", textAlign: "center" },
  inputContainer: { width: "100%", alignItems: "center" },
  input: { width: "100%", height: 50, backgroundColor: "grey", borderRadius: 25, paddingHorizontal: 15, fontSize: 16, color: "white", marginBottom: 10, textAlign: 'center' },
  signInButton: { width: "100%", height: 50, backgroundColor: "#007FFD", borderRadius: 25, justifyContent: "center", alignItems: "center" },
  signUpButton: { marginTop: 15, width: "100%", height: 50, borderWidth: 1, borderColor: "black", backgroundColor: 'white', borderRadius: 25, justifyContent: "center", alignItems: "center" },
  signInText: { fontSize: 18, fontWeight: "bold", color: "white" },
  signUpText: { fontSize: 18, color: "black" },
  closeButton: { position: "absolute", top: 40, right: 20, zIndex: 10, backgroundColor: "#000", padding: 10, borderRadius: 20 },
  closeButtonText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});

export default WelcomeScreen;
