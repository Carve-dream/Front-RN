import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  DiaryList  from '../views/DiaryListView/DiaryList'; // DiaryList 뷰 임포트
import  MainView  from '../views/mainView/MainView'; // MainView 임포트
import CustomTabBar from '../CustomTabBar/CustomTabBar'; // CustomTabBar 컴포넌트 임포트
import EmotionMapView from '../views/emotionMap/EmotionMapView';
import MyPageView from '../views/myPage/MyPageView';
import ChatView from '../ChatView/ChatView';
import fortuneCookieView from '../views/FortuneCookie/fortuneCookieView';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainView} />
      <Stack.Screen name="ChatView" component={ChatView}  options={{tabBarStyle: {display: 'none'}}} />
      <Stack.Screen name="CookieView" component={fortuneCookieView}  options={{tabBarStyle: {display: 'none'}}}/>
    </Stack.Navigator>
  );
}



const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />} initialRouteName="홈">
      <Tab.Screen name="홈" component={HomeStack} options={{ tabBarIcon: { active: require('../assets/images/homePush.png'), default: require('../assets/images/home.png') } }} />
      <Tab.Screen name="꿈일기 목록" component={DiaryList} options={{ tabBarIcon: { active: require('../assets/images/notePush.png'), default: require('../assets/images/note.png') } }} />
      <Tab.Screen name="일기 작성" component={MainView} options={{ tabBarIcon: { active: require('../assets/images/plus.png'), default: require('../assets/images/plus.png') } }} />
      <Tab.Screen name="감정지도" component={EmotionMapView} options={{ tabBarIcon: { active: require('../assets/images/chartPush.png'), default: require('../assets/images/chart.png') } }} />
      <Tab.Screen name="마이페이지" component={MyPageView} options={{ tabBarIcon: { active: require('../assets/images/myPage.png'), default: require('../assets/images/myPage.png') } }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
