import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity,  StyleSheet } from 'react-native';

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
                placeholder="꾸미에게 메세지 보내기"
                value={messageText}
                onChangeText={setMessageText}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Text>➤</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        padding: 10,
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 40,
        marginRight: 10,
        paddingHorizontal: 10,
    },
    sendButton: {
        padding: 10,
    },
})

export default Input;