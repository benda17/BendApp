import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './app/screens/WelcomeScreen.js';
import UserScreen from './app/screens/UserScreen.js';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ title: "כניסת משתמש" }} />
                <Stack.Screen name="UserScreen" component={UserScreen} options={{ title: "דף המשתמש" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
