import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { SquareButton, BubbleButton}  from './SquareButton';
import { NavigationContainer } from '@react-navigation/native';
import MainViewModel from './MainViewModel'; 
import CustomTabBar from '../CustomTabBar/CustomTabBar.js';
import { LinearGradient } from 'expo-linear-gradient';


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
        <CustomTabBar />
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
          onPress={() => setSearchQuery(searchQuery)}
          title="대화목록 보기"
          imageSource={require('../assets/images/primary.png')}  // 프로젝트 루트를 기준으로 한 상대 경로
        />
        <SquareButton
          onPress={onButtonPress}
          title="오늘의 포춘쿠키"
          imageSource={require('../assets/images/primary.png')}  // 프로젝트 루트를 기준으로 한 상대 경로
        />
      </View>
      <BubbleButton
        onPress={onButtonPress}
        bubbleText="오늘은 어떤 꿈을 꾸셨나요?"
        buttonText="꾸미와 이야기하기"
        bubbleImageSource={require('../assets/images/TalkBtn.png')}  // 프로젝트 루트를 기준으로 한 상대 경로
      />
      <View style={styles.square}></View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  linearGradient: {
    flex: 1,
    position: 'relative',
    width: 430,
    height: 932
  },
  BtnContainer: {
    flex: 1,
  },
  TopBtnContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 50,
    marginBottom: 60,
    width: '100%'
  },
  square: {
    width: 207,
    height: 246,
    backgroundColor: '#D9D9D9',
    marginLeft: 115
  }
});

export default MainView;
