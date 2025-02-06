import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import UserScreen from './app/screens/UserScreen';
import { Ionicons } from '@expo/vector-icons';
import { ClientsDataProvider } from './app/context/ClientsDataContext';
import DashboardScreen from './app/screens/DashboardScreen';

const Tab = createBottomTabNavigator();

function HiddenTabBar({ state, navigation }) {
  const [visible, setVisible] = useState(new Animated.Value(1));

  useEffect(() => {
    // Check the current route's name
    const currentRouteName = state.routes[state.index].name;

    if (currentRouteName === "WelcomeScreen") {
      // On the WelcomeScreen, auto-hide the tab bar after 3 seconds
      let timeout = setTimeout(() => {
        Animated.timing(visible, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 3000);
      return () => clearTimeout(timeout);
    } else {
      // On any other screen (e.g., UserScreen), ensure the tab bar is visible
      Animated.timing(visible, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [state.index]);

  return (
    <Animated.View style={[styles.tabBar, { opacity: visible }]}>
      {state.routes.map((route, index) => {
        const iconName = route.name === "UserScreen" ? "person" : "home";
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.name}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tabButton}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? "#007FFD" : "#888"}
            />
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}

export default function App() {
  return (
    <ClientsDataProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="WelcomeScreen"  // Set WelcomeScreen as the initial route
          screenOptions={{ headerShown: false }}
          tabBar={(props) => <HiddenTabBar {...props} />}
        >
          <Tab.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Tab.Screen name="UserScreen" component={UserScreen} />
          <Tab.Screen name="Dashboard" component={DashboardScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ClientsDataProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 25,
    elevation: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
});