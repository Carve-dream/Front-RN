import React from 'react';
import { View, Text } from 'react-native';

const StartPageView = () => {
  return (
    <View>
      <Text>Welcome to the Start Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

export default StartPageView;
