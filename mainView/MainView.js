import React, {useState} from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { SquareButton, BubbleButton}  from './SquareButton';
import { NavigationContainer } from '@react-navigation/native';
import MainViewModel from './MainViewModel'; 
import CustomTabBar from '../CustomTabBar/CustomTabBar.js';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width; // 전체 화면 너비 가져오기
const screenHeight = Dimensions.get('window').height; // 전체 화면 높이 가져오기

const MainView = () => {
  const { searchQuery, setSearchQuery, handleSearch } = MainViewModel();

  return (
    <NavigationContainer>
      <LinearGradient
        colors={['rgba(41, 32, 100, 0.80)', 'rgba(203, 157, 221, 0.80)', 'rgba(244, 191, 168, 0.80)', 'rgba(255, 255, 255, 0.80)']}
        style={styles.linearGradient}
      >
        <View style={styles.container}>
          <ButtonsView
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onButtonPress={handleSearch}
          />
          </View>
          <View style={styles.customTabBarContainer}>
            <CustomTabBar />
          </View>
      </LinearGradient>
    </NavigationContainer>
  );
};


//MARK:- bottomView
const ButtonsView = ({ searchQuery, setSearchQuery, onButtonPress }) => {
  return (
    <View style={styles.BtnContainer}>
      <View style={styles.TopBtnContainer}>
        <SquareButton
          onPress={onButtonPress}
          title="오늘의 포춘쿠키"
          imageSource={require('../assets/images/cookie.png')}  
        />
      </View>
      <View style={styles.ggumiContainer}>
      <BubbleButton
        onPress={onButtonPress}
        bubbleText="오늘은 어떤 꿈을 꾸셨나요?"
        buttonText="꾸미와 이야기하기"
        bubbleImageSource={require('../assets/images/TalkBtn.png')} 
      />
      <View style={styles.square}>
        <Image source = {require('../assets/images/ggumi.png')}/>
      </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    marginBottom: 150
  },
  customTabBarContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 0, 
  },
  linearGradient: {
    flex: 1,
    position: 'relative',
    width: screenWidth,
    height: screenHeight,
  },
  BtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  TopBtnContainer: {
    flexDirection: 'row',
    marginTop: 50,
    width: '100%',
    marginBottom: 140,
    marginLeft: 190
  },
  ggumiContainer : {
    maxHeight: 436,
    maxWidth: 258,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 44,
    paddingTop: 140
  },
  square: {
    width: 207,
    height: 246,
    alignSelf: 'center' 
  }
});

export default MainView;