import React from 'react';
import { View, Text,Image, TouchableOpacity, Modal, StyleSheet} from 'react-native';


    // 이모티콘 및 해당 이미지 목록
    const emotions = [
        { text: '설레요', image: require('../../assets/emoji/happy.png') },
        { text: '그리워요', image: require('../../assets/emoji/miss.png') },
        { text: '두려워요', image: require('../../assets/emoji/scared.png') },
        { text: '찝찝해요', image: require('../../assets/emoji/uncomfortable.png') },
        { text: '미스테리해요', image: require('../../assets/emoji/mysterious.png') },
        { text: '황당해요', image: require('../../assets/emoji/confused.png') },
        { text: '흥분돼요', image: require('../../assets/emoji/excited.png') },
        { text: '기뻐요', image: require('../../assets/emoji/glad.png') },
        { text: '화나요', image: require('../../assets/emoji/angry.png') }
     ];

     
    //감정 선택 모달
    const EmotionPickerModal = ({emotionModalVisible, setEmotionModalVisible, setSelectedEmotion, setSelectedImage }) => {

        const handleSelectEmotion = (emotion) => {
            setSelectedEmotion(emotion.text);
            setSelectedImage(emotion.image);
            setEmotionModalVisible(false);
        };

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={emotionModalVisible}
                onRequestClose={() => {
                    setEmotionModalVisible(!emotionModalVisible);
                }}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.headerText}>오늘의 감정</Text>
                    <View style={styles.gridContainer}>
                        {emotions.map((emotion, index) => (
                            <TouchableOpacity key={index} style={styles.button} onPress={() => handleSelectEmotion(emotion)}>
                                <View style={styles.textCtn}>
                                    <Text style={styles.text}>{emotion.text}</Text>
                                </View>
                                <Image source={emotion.image} style={styles.image} />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity style={styles.confirmButton} onPress={() => setEmotionModalVisible(false)}>
                        <Text style={styles.confirmText}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
    const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        width: '90%',
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',  
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    headerText: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        color: '#434343',
        marginRight: 250,
        marginTop: 10, 
        marginBottom: 5
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around', 
        width: '100%',  
    },
    button: {
        width: '30%', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 40,
        height: 40,
        marginLeft: -25,
        marginBottom: 30,
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        color: '#434343'
    },
    textCtn : {
        borderColor: '#89898B',
        borderWidth: 2,
        backgroundColor: 'white',
        width: 95,
        height: 63,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 20
    },
    confirmButton: {
        width: '70%',
        height: 40,
        padding: 10,
        backgroundColor: '#EF82A1',
        borderRadius: 10,
        marginTop: 40, 
        marginBottom: 30
    },
    confirmText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    }
});


export default EmotionPickerModal;


