import React from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width; 


const CustomTabBarButton = ({ children, onPress, style }) => (
  <TouchableOpacity
    style={[{
      top:10,
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
      elevation: 5
    }, style]}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);
 
const CustomTabBar = ({ state, descriptors, navigation }) => {
  if (!state || !descriptors || !navigation) {
    return null;
  }

  const icons = {
    '홈': require('../assets/images/home.png'),
    '꿈일기 목록': require('../assets/images/note.png'),
    '일기작성': require('../assets/images/plus.png'),
    '감정지도': require('../assets/images/chart.png'),
    '마이페이지': require('../assets/images/myPage.png')
  };

  const focusedIcons = {
    '홈': require('../assets/images/homePush.png'),
    '꿈일기 목록': require('../assets/images/notePush.png'),
    '일기작성': require('../assets/images/plus.png'),
    '감정지도': require('../assets/images/chartPush.png'),
    '마이페이지': require('../assets/images/myPage.png')
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          console.log('Press event on ', route.name);

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const icon = isFocused ? focusedIcons[route.name] : icons[route.name];
        const iconSize = { width: 35, height: 35 };

        if (route.name === '일기작성') {
          return (
            <CustomTabBarButton onPress={onPress} style={styles.menuCtn}>
              <Image source={icon} style={[styles.icon, iconSize]} resizeMode="contain" />
            </CustomTabBarButton>
          );
        } else {
          return (
            <TouchableOpacity key={index} onPress={onPress} style={styles.menuCtn}>
              <Image source={icon} style={[styles.icon, iconSize]} resizeMode="contain" />
              <Text style={styles.iconLabel}>{route.name}</Text>
            </TouchableOpacity>
          );
        }
      })}
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
    flexDirection: 'row',
    backgroundColor: '#464E82',
    height: 130,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
    justifyContent: 'center',
  }
});

export default CustomTabBar;
