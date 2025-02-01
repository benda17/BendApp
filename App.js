import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ClientsDataProvider } from './ClientsDataContext';
import WelcomeScreen from './app/screens/WelcomeScreen.js';
import UserScreen from './app/screens/UserScreen.js';

const Stack = createStackNavigator();

export default function App() {
    return (
        <ClientsDataProvider> 
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                    <Stack.Screen name="UserScreen" component={UserScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </ClientsDataProvider>
    );
}
