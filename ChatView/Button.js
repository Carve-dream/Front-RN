import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

//일기장 보기, 상담하기 버튼
const Button = ({ item }) => {

    if (item.sender === 'buttons') {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => console.log('일기장 보기')}>
                    <Text style={styles.buttonText}>일기장 보기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => console.log('상담하기')}>
                    <Text style={styles.buttonText}>상담하기</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        // 일반 메시지 렌더링
        return (
            <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.otherMessage]}>
                <Text style={styles.messageText}>{item.text}</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
    },
    button: {
        backgroundColor: 'gray',
        borderRadius: 20,
        marginRight: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    messageContainer: { //시스템 채팅창
        alignSelf: 'flex-start',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        maxWidth: '90%',
        padding: 10,
    },
    messageText: {
        fontSize: 16,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: 'gray',
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#f0f0f0',
    },
    messageText: {
        color: 'black',
        fontSize: 16,
    },
});

export default Button;