import React, { useState } from 'react';
import { 
    Image, 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    Platform, 
    KeyboardAvoidingView, 
    ScrollView, 
    TouchableWithoutFeedback, 
    Keyboard, 
    ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function WelcomeScreen() {
    const [email, setEmail] = useState('');
    const navigation = useNavigation(); // Fix: Use navigation inside NavigationContainer

    const GOOGLE_SHEET_ID = "1P1lAEVPunCl9Bg1ZAEP9Y0uUkT0jhP2uAty6ZYO5h_U";
    const API_KEY = "AIzaSyDkcDWp4fyIcs2uvj6mXD6DKCLlzLJzCTw";
    const RANGE = "Sheet1!F:F"; // Fetch Email (F) & Name (G)

    const handleSignIn = async () => {
        if (!email.trim()) {
            Alert.alert("טעות רצינית", "בבקשה להכניס כתובת מייל");
            return;
        }

        try {
            console.log(`Fetching from Google Sheets: ${RANGE}`);
            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${RANGE}?key=${API_KEY}`
            );
            const data = await response.json();
            console.log("Google Sheets API Response:", data);

            if (data.error) {
                console.error("API Error:", data.error);
                Alert.alert("שגיאה", "API Error: " + (data.error.message || "שגיאה לא ידועה"));
                return;
            }

            if (data.values) {
                const users = data.values.map(row => ({ email: row[0]?.trim(), name: row[1]?.trim() }));
                console.log("User List:", users);

                const user = users.find(user => user.email === email.trim());
                if (user) {
                    Alert.alert("הצלחת", `ברוך הבא, ${user.name}`);
                    navigation.navigate('UserScreen', { userName: user.name }); // Navigate to UserScreen with name
                } else {
                    Alert.alert("שגיאה", "האימייל לא נמצא במערכת.");
                }
            } else {
                Alert.alert("שגיאה", "לא ניתן לבדוק את המייל כעת.");
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            Alert.alert("שגיאה", "בעיה בחיבור למערכת.");
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={styles.background}
        >
            <ImageBackground 
                source={require('./t.jpg')} 
                style={styles.backgroundImage} 
                resizeMode="cover">
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                            <View style={styles.logoContainer}>
                                <Image style={styles.logo} source={require('./BENDA - logo black.png')} />
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
                                    <Text style={styles.signInText}>הרשמה</Text>
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
    overlay: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        justifyContent: "center",
        alignItems: "center",
    },
    container: { flexGrow: 1, justifyContent: "center", alignItems: "center" },
    logoContainer: { alignItems: "center", marginBottom: 20 },
    logo: { width: 200, height: 100, marginBottom: 10 },
    tagline: { fontSize: 16, fontWeight: "600", color: "#000", textAlign: "center" },
    inputContainer: { width: "90%", alignItems: "center" },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "grey",
        borderRadius: 25,
        paddingHorizontal: 15,
        fontSize: 16,
        color: "white",
        marginBottom: 10,
        textAlign: 'center',
    },
    signInButton: {
        width: "100%",
        height: 50,
        backgroundColor: "#007FFD",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    signInText: { fontSize: 18, fontWeight: "bold", color: "white" },
});

export default WelcomeScreen;
