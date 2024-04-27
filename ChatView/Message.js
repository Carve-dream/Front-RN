import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Message = ({ item }) => {
    return (
        <View>
            <View style={styles.messageRow}>
                {item.sender === 'other' && ( //챗봇 채팅 render
                    <>
                        <Image source={require('../assets/images/chat-ggumi-profile.png')} style={styles.ggumiProfile} />
                        <View style={styles.othertail} />
                        <View style={styles.otherMessage}>
                            <Text style={styles.messageText}>{item.text}</Text>
                        </View>
                    </>
                )}
            </View>
            {item.sender === 'user' && ( // 사용자 채팅 render
                <View style={styles.messageContainer}>
                    <Image source={require('../assets/images/chat-user-profile.png')} style={styles.userProfile} />
                    <View style={styles.usertail} />
                    <View style={styles.userMessage}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>

                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    messageText: {
        color: 'black',
        fontSize: 14,
    },
    messageContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    userMessage: {
        backgroundColor: '#C1C7F8',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        maxWidth: '80%',
        padding: 15,
        marginBottom: 10,
    },
    userProfile: {
        width: 35,
        height: 35,
        marginLeft: 5,
        marginVertical: 10,
        justifyContent: 'flex-end',
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    ggumiProfile: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginRight: 5,
        marginVertical: 10,
    },
    otherMessage: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: 'white',
        maxWidth: '85%',
        padding: 15,
        marginBottom: 10,
    },
    othertail: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white',
        transform: [{ rotate: '270deg' }],
        marginBottom: 23,
        // marginLeft: -5,
        marginRight: -10,

    },
    usertail: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#C1C7F8',
        transform: [{ rotate: '90deg' }],
        marginBottom: 10,
        marginLeft: -10,
    },

});

export default Message;
