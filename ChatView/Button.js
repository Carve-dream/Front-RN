import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

//일기장 보기, 상담하기 버튼
const Button = ({ item, sendMessage }) => {


    if (item.sender === 'buttons') {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => sendMessage('꿈 일기 불러오기')}>
                    <Text style={styles.buttonText}>꿈 일기 불러오기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => sendMessage('감정 분석하기')}>
                    <Text style={styles.buttonText}>감정 분석하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => sendMessage('상담하기')}>
                    <Text style={styles.buttonText}>상담하기</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: -10,
        marginEnd: 10,
        padding: 10,
    },
    button: {
        backgroundColor: '#F5F5F5',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginRight: 15,
        marginBottom: 10,
        paddingVertical: 10,
        marginLeft: 50,
    },
    buttonText: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
    },

});

export default Button;