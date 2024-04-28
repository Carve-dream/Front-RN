import React from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const screenWidth = Dimensions.get('window').width; 


const CustomTabBarButton = ({ children, onPress, style }) => (
  <TouchableOpacity
    style={[{
      top: 40,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
      width: 56,
      height: 56,
      borderRadius: 35,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 3.5,
      elevation: 5,
    }, style]}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);
 
const CustomTabBar = () => { 
    return (
      <View style={{ height: 130 }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: [styles.tabBar, styles.shadow],
            tabBarShowLabel: false, 
            tabBarIcon: ({ focused }) => {
              const icons = {
                '홈': focused ? require('../assets/images/homePush.png') : require('../assets/images/home.png'),
                '꿈일기 목록': focused ? require('../assets/images/notePush.png') : require('../assets/images/note.png'),
                '일기작성': focused ? require('../assets/images/plus.png') : require('../assets/images/plus.png'),
                '감정지도': focused ? require('../assets/images/chartPush.png') : require('../assets/images/chart.png'),
                '마이페이지': focused ? require('../assets/images/myPage.png') : require('../assets/images/myPage.png')
              };
              const iconSize = route.name === '일기작성' ? { width: 35, height: 35 } : { width: 35, height: 35 };
              const iconStyle = route.name === '일기작성' ? { marginTop: -55 } : {};
              return (
                <View style={styles.iconContainer}>
                  <View style={styles.menuCtn}>
                    <Image source={icons[route.name]} style={[styles.icon , iconSize,iconStyle]} resizeMode="contain" />
                    {route.name !== '일기작성' && <Text style={styles.iconLabel}>{route.name}</Text>}
                  </View>
              </View>
              
              );
            },
            tabBarButton: (props) => (
              route.name === '일기작성' ?
              <CustomTabBarButton {...props} style={{ top: 40 }} /> : // 위치 조정 가능
              <TouchableOpacity {...props} />
            ),
          })}
        >
          <Tab.Screen name="홈" children={() => { console.log('홈 버튼이 눌렸습니다.'); return null; }} />
          <Tab.Screen name="꿈일기 목록" children={() => { console.log('꿈일기 목록 버튼이 눌렸습니다.'); return null; }} />
          <Tab.Screen name="일기작성" children={() => { console.log('일기 작성 버튼이 눌렸습니다.'); return null; }} />
          <Tab.Screen name="감정지도" children={() => { console.log('감정지도 버튼이 눌렸습니다.'); return null; }} />
          <Tab.Screen name="마이페이지" children={() => { console.log('마이페이지 버튼이 눌렸습니다.'); return null; }} />
        </Tab.Navigator>
        </View>
    );
  };

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },
  tabBar: {
    backgroundColor: '#464E82',
    height: 130,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 15,
  },
  icon: {
    width: 36,
    height: 36,
    marginBottom: 5
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 384,
    maxHeight: 54,
    marginTop: 55
  },
  iconLabel: {
    fontSize: 10,
    color: 'white',
    fontWeight: '400',
    alignItems: 'center',
  },
  menuCtn: {
    width: 50,
    maxHeight: 52,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CustomTabBar;
