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
import DiaryList from './views/DiaryListView/DiaryList';
import DiaryDetail from './views/DiaryDetailView/DiaryDetail';
import DiaryModify from './views/DiaryModifyView/DiaryModify';
import DiaryImageCreate from './views/DiaryImageView/DiaryImageCreate';
import DiaryImageProduce from './views/DiaryImageView/DiaryImageProduce';
import DreamInterpret from './views/DreamInterpretView/DreamInterpret';

const Stack = createStackNavigator();



function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Loading">
      <Stack.Screen name="Loading" component={StartPageView} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ChatView" component={ChatView} options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
      <Stack.Screen name="CookieView" component={CookieView} options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
      <Stack.Screen name="DiaryWriteStackModal" component={DiaryWriteStack} options={{ headerShown: false }} />
      <Stack.Screen name="DiaryList" component={DiaryList} options={{ headerShown: false }}/>
      <Stack.Screen name="DiaryDetail" component={DiaryDetail} options={{headerShown: false}}/>
      <Stack.Screen name="DiaryModify" component={DiaryModify} options={{headerShown: false}}/>
      <Stack.Screen name="DiaryImageStack" component={DiaryImageStack} options={{headerShown: false}}/>  
      <Stack.Screen name="DreamInterpret" component={DreamInterpret} options={{headerShown: false}}/>    
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

  const DiaryImageStack = () => {
    return(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DiaryImageCreate" component={DiaryImageCreate}  options={{ headerShown: false }}/>
        <Stack.Screen name="DiaryImageProduce" component={DiaryImageProduce}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    );
  }
  
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


