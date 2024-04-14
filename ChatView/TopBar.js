import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // 뒤로가기 아이콘 사용을 위해 추가

//상단바
const TopBar = () =>{
    return (
        <View style={styles.topBar}> 
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>가상 심리학자 꾸미</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topBar: {
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 10,
    },
    headerContainer: {
      alignItems: 'center',
      flex: 1,
      marginRight: 25,
      padding: 10,
    },
    headerText: {
      fontSize: 20,
    },
  });

export default TopBar;