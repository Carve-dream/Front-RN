import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Modal, StyleSheet, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../../ChatView/TopBar';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import EmotionPickerModal from '../DiaryWriteView/EmotionModal'

const screenWidth = Dimensions.get('window').width; 
const screenHeight = Dimensions.get('window').height; 

//전체 뷰
const DiaryDetail = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.fullScreen}>
            <View style={styles.topCtn}>
                <TopBar navigation={navigation} title="0000.00.00"/>
            </View>
            <FullScreen/>
        </View>
    );
};


//전체 뷰 정리 (탑바, 저장하기 버튼)
const FullScreen = () => {
    return(
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.mainBoxCtn}>
            <MainBoard/>
        </View>
        <View style={styles.saveCtn}>
                <SaveBtn/>
        </View>
    </ScrollView>
    );
}


//일기 디테일 보드
const MainBoard = () => {
    return(
        <View style={styles.boxCtn}>
            <View style={styles.mainBox}>
                <DiaryTop/>
                <SleepTimePicker/>
                <DiaryEntry/>
                <ImageBox/>
                <DreamInterpret/>
                <TagManager/>
                
            </View>
        </View>
    );
}


//제목, 오늘의 감정
const DiaryTop = () => {
    const [title, setTitle] = useState("");
    const [emotionModalVisible, setEmotionModalVisible] = useState(false);
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <View style={styles.diaryTopCtn}>
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="제목"
                style={styles.input}
                placeholderTextColor="#434343"
            />

            <TouchableOpacity onPress={() => setEmotionModalVisible(true)} style={styles.iconCtn}>
                <Text style={styles.iconText}>오늘의 감정</Text>
                {selectedImage && <Image source={selectedImage} style={styles.emotionImage} />}
            </TouchableOpacity>

            <EmotionPickerModal 
                emotionModalVisible={emotionModalVisible}
                setEmotionModalVisible={setEmotionModalVisible}
                setSelectedEmotion={setSelectedEmotion}
                setSelectedImage={setSelectedImage}
            />
        </View>
    );
};

//시간 작성 => 서버 연결 후 저장페이지에서 작성한 시간으로 띄우기 수정!
const SleepTimePicker = () => {
    const [isBedTimePickerVisible, setBedTimePickerVisibility] = useState(false);
    const [isWakeTimePickerVisible, setWakeTimePickerVisibility] = useState(false);
    const [bedTime, setBedTime] = useState(new Date());
    const [wakeTime, setWakeTime] = useState(new Date());

    const showBedTimePicker = () => {
        setBedTimePickerVisibility(true);
    };

    const hideBedTimePicker = () => {
        setBedTimePickerVisibility(false);
    };

    const handleConfirmBedTime = (date) => {
        setBedTime(date);
        hideBedTimePicker();
    };

    const showWakeTimePicker = () => {
        setWakeTimePickerVisibility(true);
    };

    const hideWakeTimePicker = () => {
        setWakeTimePickerVisibility(false);
    };

    const handleConfirmWakeTime = (date) => {
        setWakeTime(date);
        hideWakeTimePicker();
    };

    return (
    <View style={styles.timeCtn}>
        <TouchableOpacity style={styles.touchable} onPress={showBedTimePicker}>
            <Text style={styles.text}>취침 시간</Text>
            <Text style={styles.text}>{` ${bedTime.getHours()}:${bedTime.getMinutes().toString().padStart(2, '0')}`}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
            isVisible={isBedTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmBedTime}
            onCancel={hideBedTimePicker}
            headerTextIOS="취침 시작시간 선택"
            locale="ko_KR" 
            is24Hour={true}
        />

        <TouchableOpacity style={styles.touchable} onPress={showWakeTimePicker}>
            <Text style={styles.text}>기상 시간</Text>
            <Text style={styles.text}>{` ${wakeTime.getHours()}:${wakeTime.getMinutes().toString().padStart(2, '0')}`}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
            isVisible={isWakeTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmWakeTime}
            onCancel={hideWakeTimePicker}
            headerTextIOS="일어난 시간 선택"
            locale="ko_KR" 
            is24Hour={true}
        />
    </View>
    );
};


//일기 작성 => 저장한 일기 내용 띄우기 수정
const DiaryEntry = () => {
    const [diaryText, setDiaryText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View>
            <TouchableOpacity style={styles.textInputWrapper} activeOpacity={1} onPress={() => setIsFocused(true)}>
                {!isFocused && !diaryText && (
                    <View style={styles.placeholderContainer}>
                        <Text style={styles.titlePlaceholder}>일기내용</Text>
                        <Text style={styles.subtitlePlaceholder}>오늘은 하늘을 나는 꿈을 꿨다. 기분이 이상했다.</Text>
                    </View>
                )}
                <TextInput
                    style={styles.textInput}
                    multiline
                    onChangeText={text => setDiaryText(text)}
                    value={diaryText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(diaryText !== '')}
                />
            </TouchableOpacity>
        </View>
    );
};


//이미지 박스
const ImageBox = ({ source }) => {
    const [imageSource, setImageSource] = useState(source);

    return (
        <View style={styles.imageCtn}>
            {imageSource ? (
                <Image source={{ uri: imageSource }} style={styles.image} />
            ) : (
                <View style={styles.imageBoxCtn}>
                   <Text style={styles.imageholder}>사진</Text>
                    <Text style={styles.imageSubtitlePlaceholder}>앗 아직 꿈 이미지가 만들어지지 않았어요{'\n'} 터치해서 꿈 이미지를 생성해보세요!</Text>
                    <Image source = {require('../../assets/images/gummiEmpty.png')} style={styles.emptyImage}/>
                </View>
            )}
        </View>
    );
};

//꾸미 분석 내용 
const DreamInterpret = () => {
    const [text, setText] = useState('');

    return (
        <View style={styles.DreamCtn}>
            {text === '' ? (
            <View style={styles.imageBoxCtn}>
                <Text style={styles.imageholder}>꾸미 분석 내용</Text>
                 <Text style={styles.imageSubtitlePlaceholder}>아직 꿈 해몽 내용이 없어요{'\n'} 터치해서 꿈 해몽 내용을 확인해보세요! </Text>
                 <Image source = {require('../../assets/images/gummiEmpty.png')} style={styles.emptyImage}/>
             </View>
            ) : (
                <Text style={styles.imageSubtitlePlaceholder}>{text}</Text>
            )}
        </View>
    );
}

//태그 => 저장된 테그 띄우기 수정!
const TagManager = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [tagText, setTagText] = useState('');
    const [tags, setTags] = useState([]);

    const addTag = () => {
        if (tagText.trim() !== '') {
            setTags([...tags, `#${tagText.trim()}`]);
            setTagText(''); // 입력 필드 초기화
            setModalVisible(false); // 모달 숨기기
        }
    };

    const removeTag = (index) => {
        setTags(tags.filter((_, idx) => idx !== index));
    };


    return (
        <View style={styles.tagCtn} >
            <Text style={styles.tags} >태그</Text>

            <ScrollView horizontal style={styles.tagContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+ 추가하기</Text>
            </TouchableOpacity>
                    {tags.map((tag, index) => (
                    <View key={index} style={styles.addButton}>
                        <Text style={styles.addButtonText}>{tag}</Text>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => removeTag(index)}>
                            <Text style={styles.deleteButtonText}>x</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.Taginput}
                        placeholder="#"
                        value={tagText}
                        onChangeText={setTagText}
                        autoFocus={true}
                        onSubmitEditing={addTag}
                    />
                    <TouchableOpacity style={styles.button} onPress={addTag}>
                        <Text style={styles.buttonText}>확인</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
        </View>
    );
};


//꿈 이미지 생성하기, 꿈 해몽하기 버튼
const SaveBtn = () => {
    const navigation = useNavigation();
    return(
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('DiaryImageStack')} style={styles.confirmButton}>
                <Text style={styles.confirmText}>꿈 이미지 생성하기</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('DreamInterpret')} style={styles.confirmButton}>
                <Text style={styles.confirmText}>꿈 해몽하기</Text>
            </TouchableOpacity>
        </View>
    );
}




const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#464E82',
        width: screenWidth,
        height: screenHeight,
        
    },
    container: {
      flex:1,
    },
    contentContainer: {
        flexGrow: 1, 
    },
    topCtn : {
        marginTop: 55,
        marginBottom: 20
    },
    boxCtn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainBox: {
        flexDirection: 'column',
        flex: 1,
        width: 100,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        minHeight: 530,
        minWidth: 360,
        alignItems: 'center'
    },
    mainBoxCtn: {
        flex: 1,
        width: '100%',
    },
    input: {
        width: 330, 
        height: 35, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        alignItems: "center",
        marginTop: 5,
        paddingLeft: 15,
        fontSize: 15, 
        fontWeight: '700'
        
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    diaryTopCtn:{
        width: 340, 
        height: 90, 
        margin:10,
        marginLeft: 14,
        flexDirection: 'column', 
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    iconCtn : {
        width: 140, 
        height: 35, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 15
    },
    iconText:{
        color: '#434343',
        fontSize: 15, 
        fontWeight: '700',
        marginLeft: 15,
        marginRight: 27,
    },
    emotionImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    touchable: {
        width: 130, 
        height: 66, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        alignItems: "center",
        padding: 10,
        marginBottom:20,
        marginRight: 30
    },
    text: {
        fontSize: 15, 
        fontWeight: '700',
        color: '#434343',
        padding: 3,
        marginBottom: -3
    },
    timeCtn:{
        flexDirection: 'row',
        margin:5,
    },
    textInputWrapper: {
        width: 323, 
        height: 140, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    placeholderContainer: {
        position: 'absolute',
        top: 0,
        left: 10,
        right: 10,
        alignItems: "center",
    },
    titlePlaceholder: {
        fontSize: 14,
        color: '#333333',
        fontWeight: '600', 
        marginBottom: 25,
        marginTop: 10
    },
    subtitlePlaceholder: {
        fontSize: 14,
        color: '#333333',
        fontWeight: '500',
    },


    imageCtn: {
        width: 300,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginTop: 10
    },
    
    DreamCtn: {
        marginTop: 10
    },
 
    imageBoxCtn: {
        width: 325, 
        height: 280, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        paddingHorizontal: 40,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 110
    },
    imageholder:{
        fontSize: 14,
        color: '#333333',
        fontWeight: '600', 
        marginBottom: 25,
    },
    imageSubtitlePlaceholder: {
        fontSize: 14,
        marginTop: 15,
        color: '#89898B',
        fontWeight: '600',
        textAlign: 'center'
    },
    emptyImage:{
        width: 100, 
        height: 140, 
    },



    tags:{
        color: '#434343', 
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 20,
        marginTop:8
    },
    textInput: {
        height: '100%',
        fontSize: 16,
        color: 'black',
        textAlignVertical: 'top'
    },

    tagCtn:{
        width: 325, 
        height: 73, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        marginTop: 25,
        marginBottom: 20
    },

    addButton: {
        width: 90, 
        height: 30,
        backgroundColor: '#C1C7F8',
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 5,
        marginRight: 8
    },
    addButtonText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '600',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
        marginBottom:-10
    },
    deleteButtonText: {
        color: 'white',
        paddingHorizontal: 5,
        fontSize: 12,
        marginLeft:55,
        marginTop: -20
    },
    tagContainer: {
        marginTop: 10,
        minHeight: 40,
        marginLeft: 25,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    Taginput: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: 200,
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 5,
        marginBottom: 20,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#434343',
    },
    confirmButton: {
        width: 240,
        height: 40,
        padding: 10,
        backgroundColor: '#EF82A1',
        borderRadius: 10,
        marginBottom: 15
    },
    confirmText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
    saveCtn: {
        marginTop: 40,
        flexDirection: 'column',
        marginLeft: 72
    }
});

export default DiaryDetail;