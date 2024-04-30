import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 쿠키 화면 컴포넌트
const CookieView = () => {
  const navigation = useNavigation();

  const handleGoHome = () => {
    navigation.navigate('Main'); // 홈으로 이동
  };

  return (
    <View>
      <Button title="홈으로 가기" onPress={handleGoHome} />
    </View>
  );

}

export default CookieView;