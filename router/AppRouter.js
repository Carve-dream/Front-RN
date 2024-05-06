import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  DiaryList  from '../views/DiaryListView/DiaryList'; // DiaryList 뷰 임포트
import  MainView  from '../views/mainView/MainView'; // MainView 임포트
import CustomTabBar from '../CustomTabBar/CustomTabBar'; // CustomTabBar 컴포넌트 임포트
import EmotionMapView from '../views/emotionMap/EmotionMapView';
import MyPageView from '../views/myPage/MyPageView';
import DiaryWriteView from '../views/DiaryWriteView/DiaryWrite';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();




function TabNavigator() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />} initialRouteName="홈">
      <Tab.Screen name="홈" component={MainView} options={{ tabBarIcon: { active: require('../assets/images/homePush.png'), default: require('../assets/images/home.png') } }} />
      <Tab.Screen name="꿈일기 목록" component={DiaryList} options={{ tabBarIcon: { active: require('../assets/images/notePush.png'), default: require('../assets/images/note.png') } }} />
      <Tab.Screen 
        name="일기 작성" 
        component={DiaryWriteView} // 이 컴포넌트는 실제로 렌더링되지 않습니다.
        options={{ tabBarIcon: { active: require('../assets/images/plus.png'), default: require('../assets/images/plus.png') } }}
        listeners={{
          tabPress: e => {
            // 탭 버튼 클릭을 중단합니다.
            e.preventDefault();
            // 'DiaryWriteView' 스크린을 새로운 스택으로 열어서 탭바가 보이지 않게 합니다.
            navigation.navigate('DiaryWriteStackModal');
          }
        }}
      />

      <Tab.Screen name="감정지도" component={EmotionMapView} options={{ tabBarIcon: { active: require('../assets/images/chartPush.png'), default: require('../assets/images/chart.png') } }} />
      <Tab.Screen name="마이페이지" component={MyPageView} options={{ tabBarIcon: { active: require('../assets/images/myPage.png'), default: require('../assets/images/myPage.png') } }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
