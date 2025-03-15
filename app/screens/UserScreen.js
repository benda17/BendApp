import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated, Linking } from 'react-native';
import * as Notifications from 'expo-notifications';
import ProgressBar from 'react-native-progress/Bar';
import { useClientsData } from '../context/ClientsDataContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

function UserScreen() {
  const { clientData, userName } = useClientsData();
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  if (!clientData) {
    return <Text style={styles.loadingText}>טוען נתונים...</Text>;
  }

  const totalHours = Number(clientData.HoursPurchased) || 0;
  const hoursRemaining = Number(clientData.HoursLeftInBundle) || 0;
  const hoursWorked = totalHours - hoursRemaining;
  const usagePercentage = totalHours > 0 ? hoursWorked / totalHours : 0;

  const toggleExpansion = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300, 
      useNativeDriver: false, 
    }).start();
  };

  return (
    <View style={{ flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
        </View>    
        <Text style={styles.welcomeText}>ברוך הבא, {userName}!</Text>

        <View style={styles.metricContainer}>
          <MetricCard title="סך כל המכירות 💰" value={clientData.SumOfSales} />
        </View>

        <View style={styles.usageContainer}>
          <Text style={styles.usageTitle}>שימוש בשעות</Text>
          <ProgressBar progress={usagePercentage} width={300} height={15} color="#007FFD" borderRadius={10} />
          <Text style={styles.usageText}>{hoursWorked} / {totalHours} שעות נוצלו</Text>
        </View>

        <View style={styles.metricContainer}>
          <MetricCard title="תאריך חבילה אחרון" value={clientData.DatePurchased} />
        </View>
        
        <View style={styles.signContainer}>
          <Image style={styles.sign} source={require('../assets/sign.png')} />
        </View>
      </ScrollView>
    </View>
  );
}


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
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  signUpButton: {
    marginTop: 15,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontSize: 18,
    color: "black",
  },
  paymentButton: {
    marginTop: 10,
    width: "100%",
    height: 50,
    backgroundColor: "#007FFD",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  expandedContainer: {
    overflow: "hidden",
    width: "100%",
    alignItems: 'stretch',
    marginTop: 5,
  },
  logoContainer: { 
    alignItems: "center", 
    marginBottom: 20,
    marginTop: 30,
  },
  logo: { 
    width: 200, 
    height: 100, 
    marginBottom: 10,
  },
  signContainer: { 
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    width: '100%', 
    marginTop: 20, 
  },
  sign: { 
    width: 80, 
    height: 80, 
    resizeMode: 'contain',
  },
  metricContainer: { 
    width: '100%', 
    alignItems: 'center', 
    color: '#fff',
  },
  metricCard: {
    backgroundColor: '#212121',
    color: '#fff',
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
    color: '#fff', 
    textAlign: 'center', 
  },
  metricValue: { 
    fontSize: 24, 
    fontWeight: '600', 
    color: '#007FFD', 
    marginTop: 8, 
    textAlign: 'center', 
  },
  usageContainer: { 
    marginTop: 20, 
    marginBottom: 20, 
    alignItems: 'center', 
    width: '100%',
  },
  usageTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#444', 
    marginBottom: 10, 
  },
  usageText: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#333', 
    marginTop: 5, 
    marginBottom: 5, 
  },
});

export default UserScreen;
