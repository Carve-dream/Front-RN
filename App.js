import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store } from './store';
import TabNavigator from './router/AppRouter';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StartPageView from './views/StartPageView/StartPageView';
import ChatView from './ChatView/ChatView';
import CookieView from './views/FortuneCookie/fortuneCookieView';
import DiaryWriteView from './views/DiaryWriteView/DiaryWrite';

const Stack = createStackNavigator();



function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Loading">
      <Stack.Screen name="Loading" component={StartPageView} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ChatView" component={ChatView} options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
      <Stack.Screen name="CookieView" component={CookieView} options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
      <Stack.Screen name="DiaryWriteStackModal" component={DiaryWriteStack} options={{ headerShown: false }} />
    </Stack.Navigator>
    );
  }
  

  const DiaryWriteStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DiaryWriteView" component={DiaryWriteView}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    );
  };
  
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppStack/>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}


