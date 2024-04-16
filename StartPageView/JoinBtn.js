import React from 'react';
import {  View, Text, StyleSheet,Image, TouchableOpacity } from "react-native";

//Component:- 로그인, 회원가입 버튼 컴포넌트
const JoinBtn = ({title, onPress}) => {
   return(
    <View style={styles.joinBtnContainer} >
        <TouchableOpacity style={styles.joinBtn} onPress={onPress}>
            <Text>{title}</Text>
        </TouchableOpacity>
    </View>
   );
};

const styles = StyleSheet.create({
    joinBtnContainer : {
      //backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    joinBtn: {
        flex: 1,
        minHeight: 30,
        minWidth: 30,
        backgroundColor: 'gray',
    }
});

export {JoinBtn};