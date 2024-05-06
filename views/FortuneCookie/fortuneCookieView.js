import React from 'react';
import { View, Button,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../../ChatView/TopBar';


// 쿠키 화면 컴포넌트
const CookieView = () => {
  const navigation = useNavigation();

  const handleGoHome = () => {
    navigation.navigate('Main'); // 홈으로 이동
  };

  return (
    <View style={styles.topCtn}>
             <TopBar navigation={navigation} title="포춘쿠키"  />
    </View>
  );

}


const styles = StyleSheet.create({ 
  topCtn : {
      marginTop: 55
  }
});

export default CookieView;