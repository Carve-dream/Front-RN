import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';


// 메세지 보내기 입력창 
const Input = ({ sendMessage }) => {

    const [messageText, setMessageText] = useState('');

    const handleSend = () => {
        if (messageText.trim().length > 0) {
            sendMessage(messageText);
            setMessageText('');
        }
    };

    return (

        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="꾸미에게 물어보세요"
                value={messageText}
                onChangeText={setMessageText}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Image source={require('../assets/cursor.png')} style={styles.sendButton} />
            </TouchableOpacity>
        </View>


    );
};

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: '#C1C7F8',
        flexDirection: 'row',
        padding: 10,
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 40,
        marginRight: 5,
        paddingHorizontal: 10,
    },
    sendButton: {
        marginTop: -2,
        paddingBottom: 3,
    },
})

export default Input;