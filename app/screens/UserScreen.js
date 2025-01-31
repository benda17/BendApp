import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function UserScreen({ route }) {
    const { userName } = route.params; // Get the user's name from navigation

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>ברוך הבא, {userName}!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
    welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
});

export default UserScreen;
