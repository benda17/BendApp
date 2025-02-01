import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import * as Notifications from 'expo-notifications';
import ProgressBar from 'react-native-progress/Bar';
import { useClientsData } from '../../ClientsDataContext.js';
import { SafeAreaView } from 'react-native-safe-area-context';

function UserScreen() {
    const { clientData, userName } = useClientsData();

    if (!clientData) {
        return <Text style={styles.loadingText}>טוען נתונים...</Text>;
    }

    // Convert values to numbers for progress calculation
    const totalHours = Number(clientData.HoursPurchased) || 0;
    const hoursRemaining = Number(clientData.HoursLeftInBundle) || 0;
    const hoursWorked = totalHours - hoursRemaining; // Calculate hours worked
    const usagePercentage = totalHours > 0 ? hoursWorked / totalHours : 0; // Progress (0 - 1)

    // ✅ Send Notification if Hours Remaining < 5
    useEffect(() => {
        if (hoursRemaining > 0 && hoursRemaining < 5) {
            sendLowHoursNotification(hoursRemaining);
        }
    }, [hoursRemaining]); // Run when hoursRemaining changes

    // ✅ Function to send notification
    const sendLowHoursNotification = async (remainingHours) => {
        await Notifications.requestPermissionsAsync();
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "⏳ שעות נותרות נמוכות!",
                body: `נותרו לך רק ${remainingHours} שעות. מומלץ לחדש את החבילה שלך.`,
            },
            trigger: null, // Immediate notification
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
            </View>    
            <Text style={styles.welcomeText}>ברוך הבא, {userName}!</Text>

            <View style={styles.metricContainer}>
                <MetricCard title="סך כל המכירות 💰" value={clientData.SumOfSales} />
            </View>

            {/* ✅ Usage Bar Section */}
            <View style={styles.usageContainer}>
                <Text style={styles.usageTitle}>שימוש בשעות</Text>
                <ProgressBar progress={usagePercentage} width={300} height={15} color="#007FFD" borderRadius={10} />
                <Text style={styles.usageText}>{totalHours} / {hoursWorked} שעות נוצלו</Text>
            </View>

            <View style={styles.metricContainer}>
                <MetricCard title="תאריך חבילה אחרון 📆" value={clientData.DatePurchased} />
            </View>
            <View style={styles.signContainer}>
                <Image style={styles.sign} source={require('../assets/sign.png')} />
            </View>
        </ScrollView>
    );
}

// ✅ Reusable Metric Card Component
const MetricCard = ({ title, value }) => (
    <View style={styles.metricCard}>
        <Text style={styles.metricTitle}>{title}</Text>
        <Text style={styles.metricValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { 
        flexGrow: 1, 
        alignItems: 'center', 
        backgroundColor: '#f5f5f5', 
        padding: 50, 
        justifyContent: 'center' 
    },
    welcomeText: { 
        fontSize: 26, 
        fontWeight: 'bold', 
        color: '#333', 
        marginBottom: 20, 
        textAlign: 'center' 
    },

    logoContainer: { 
        alignItems: "center", 
        marginBottom: 20 
    },
    logo: { 
        width: 200, 
        height: 100, 
        marginBottom: 10 
    },

    // ✅ Fix for the SIGN Image (Center & Reduce Size)
    signContainer: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%', // Ensures it takes the full width for centering
        marginTop: 20, 
    },
    sign: { 
        width: 80, // ✅ Adjust to make it smaller
        height: 80, 
        resizeMode: 'contain', // ✅ Prevents unwanted stretching
        transform: [{ rotate: '0deg' }], // ✅ Ensures it’s not rotated sideways
    },

    // ✅ Metric Cards
    metricContainer: { 
        width: '100%', 
        alignItems: 'center' 
    },
    metricCard: {
        backgroundColor: '#fff',
        width: '90%',
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    metricTitle: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#444', 
        textAlign: 'center' 
    },
    metricValue: { 
        fontSize: 24, 
        fontWeight: '600', 
        color: '#007FFD', 
        marginTop: 8, 
        textAlign: 'center' 
    },

    // ✅ Usage Bar Styling
    usageContainer: { 
        marginTop: 20, 
        marginBottom: 20, 
        alignItems: 'center', 
        width: '90%' 
    },
    usageTitle: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#444', 
        marginBottom: 10 
    },
    usageText: { 
        fontSize: 18, 
        fontWeight: '600', 
        color: '#333', 
        marginTop: 5, 
        marginBottom: 5 
    },

    loadingText: { 
        fontSize: 18, 
        color: 'gray', 
        marginTop: 20 
    },
});



export default UserScreen;
