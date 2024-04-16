import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen, DreamListScreen, EmptyScreen, EmotionMapScreen, MyPageScreen } from './TestComponent';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: 'gray',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 3.5,
      elevation: 5
    }}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

const CustomTabBar = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#D9D9D9',
            height: 90,
            paddingBottom: 10,
            paddingHorizontal: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            width: '100%',
          },
          tabBarIcon: ({ focused }) => {
            let icon;
            if (route.name === '홈') {
              icon = require('../assets/images/home.png');
            } else if (route.name === '꿈일기 목록') {
              icon = require('../assets/images/note.png');
            } else if (route.name === '일기작성') {
              icon = require('../assets/images/plus.png');
            } else if (route.name === '감정지도') {
              icon = require('../assets/images/chart.png');
            } else if (route.name === '마이페이지') {
              icon = require('../assets/images/myPage.png');
            }
            return (
              <View style={{ marginBottom: 5 }}> 
                <Image source={icon} resizeMode="contain" style={{ width: 30, height: 30 }} />
              </View>
            );
          },
          tabBarLabelStyle: { // 타이틀 텍스트의 스타일 설정
            fontSize: 10, 
            color: '#434343' 
          },
          tabBarButton: (props) => (
            route.name === '일기작성' ? <CustomTabBarButton {...props} /> : <TouchableOpacity {...props} />
          ),
        })}
      >
        <Tab.Screen name="홈" component={HomeScreen} options={{ title: '홈' }} />
        <Tab.Screen name="꿈일기 목록" component={DreamListScreen} options={{ title: '꿈일기 목록' }} />
        <Tab.Screen name="일기작성" component={EmptyScreen} options={{ title: '' }} />
        <Tab.Screen name="감정지도" component={EmotionMapScreen} options={{ title: '감정지도' }} />
        <Tab.Screen name="마이페이지" component={MyPageScreen} options={{ title: '마이페이지' }} />
      </Tab.Navigator>
    );
  };

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
});

export default CustomTabBar;
