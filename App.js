import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import WelcomeScreen from './app/screens/WelcomeScreen';
import UserScreen from './app/screens/UserScreen';
import DashboardScreen from './app/screens/DashboardScreen';
import { ClientsDataProvider } from './app/context/ClientsDataContext';
import BankTransferScreen from './app/screens/BankTransferScreen';
import PayoneerPaymentScreen from './app/screens/PayoneerTransferScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Do not show header on each tab screen
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'DashboardScreen') {
            iconName = 'bar-chart'; // Dollar sign icon (or bar-chart as before)
          } else if (route.name === 'UserScreen') {
            iconName = 'person';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="DashboardScreen" component={DashboardScreen} options={{ tabBarLabel: 'דשבורד' }} />
      <Tab.Screen name="UserScreen" component={UserScreen} options={{ tabBarLabel: 'משתמש' }} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
        {/* WelcomeScreen is used only for sign in and is not shown in the tab bar */}
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="BankTransferScreen" component={BankTransferScreen} />
        <Stack.Screen name="PayoneerTransferScreen" component={PayoneerPaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ClientsDataProvider>
      <AppNavigator />
    </ClientsDataProvider>
  );
}