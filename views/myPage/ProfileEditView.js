import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, StatusBar, TouchableOpacity, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchUserData } from '../../api/fetchUserData';
import { updateUserData } from '../../api/updatedUserData';

const ProfileEditView = () => {

    const navigation = useNavigation();

    const [userName, setUserName] = useState('');
    const [birthDate, setBirth] = useState('');
    const [gender, setGender] = useState(null);
    const [createdDate, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [imageUrl, setProfileImage] = useState(require('../../assets/images/basic-profile.png')); // 기본 이미지 상태
    const [modalVisible, setModalVisible] = useState(false);


    const handleImageSelect = (imageName) => {
        setProfileImage(imageName); // 선택된 이미지로 상태 업데이트
        setModalVisible(false); // 모달 닫기
    };

    // 저장하기 버튼 눌렀을 때 화면 전환
    const handleNextPress = async () => {
        try {
            await updateUserData(userName, birthDate, gender, imageUrl); // 수정된 사용자 정보를 API를 통해 업데이트
            console.log('Updating user data:', { userName, birthDate, gender, imageUrl });
            navigation.navigate('ProfileView'); // 업데이트 후 ProfileView로 이동
        } catch (error) {
            console.error('Failed to update user data:', error);
        }
    };

    // 취소하기 버튼 눌렀을 때 이전 화면으로 돌아가기
    const handleBackPress = () => {
        navigation.navigate('ProfileView');
    }

    // 이름 삭제
    const nameDelete = () => {
        console.log('delete');
        setUserName('');
    };

    //생년월일 삭제
    const birthDelete = () => {
        console.log('birth delete');
        setBirth('');
    }

    const handleBirthDateChange = (text) => {
        const newText = text.replace(/[^0-9]/g, ''); // 먼저 숫자가 아닌 모든 문자를 제거합니다.
        let formattedText = newText;

        // 숫자가 4개 입력되었을 때와 6개 입력되었을 때 자동으로 -를 추가합니다.
        if (newText.length > 4) {
            formattedText = newText.substring(0, 4) + '-' + newText.substring(4);
        }
        if (newText.length > 6) {
            formattedText = newText.substring(0, 4) + '-' + newText.substring(4, 6) + '-' + newText.substring(6, 8);
        }

        setBirth(formattedText); // 변환된 텍스트로 상태를 업데이트합니다.
    };

    useEffect(() => {
        const init = async () => {
            const data = await fetchUserData();
            console.log(data.information.name);
            setUserName(data.information.name);
            setEmail(data.information.email);
            setBirth(data.information.birthDate);
            setDate(data.information.createdDate.split('T')[0]); // YYYY-MM-DD 형식으로 변환
            setGender(data.information.gender);
            setProfileImage(data.information.imageUrl);
        };

        init();
    }, []);

    const isFormValid = userName.length > 0 && birthDate.length === 10 && gender != null && email.length > 0; // 이름, 생년월일, 성별이 모두 입력되었는지 확인

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <StatusBar barStyle="light-content" />

                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View style={{ alignItems: 'center', position: 'relative' }}>
                            <Image source={require('../../assets/images/profile-background.png')} style={styles.profileBack} />
                            <Image source={require('../../assets/images/profile-edit-icon.png')} style={styles.editButton} />
                            <Image source={images[imageUrl] || require('../../assets/images/basic-profile.png')} style={styles.profileImage} />
                        </View>
                    </TouchableOpacity>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                            <View style={styles.modalOuter}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>원하는 감정 별을 선택해보세요!</Text>
                                    <View style={styles.modalContainer}>
                                        {Object.keys(images).map((key) => (
                                            <TouchableOpacity key={key} onPress={() => handleImageSelect(key)}>
                                                <Image source={images[key]} style={styles.editedProfile} />
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                    </Modal>
                    <View>
                        <Text style={styles.text}>이름</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="김꾸미"
                                placeholderTextColor="#BDBDBD"
                                value={userName}
                                onChangeText={setUserName}
                            />
                            <TouchableOpacity onPress={nameDelete}>
                                <Image source={require('../../assets/images/delete-info.png')} style={styles.delete} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.rowText}>생년월일</Text>
                            <Text style={styles.rowText}>성별</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.birthInput}
                                    placeholder="2000-01-01"
                                    placeholderTextColor="#BDBDBD"
                                    keyboardType="numeric"
                                    value={birthDate}
                                    onChangeText={handleBirthDateChange}
                                />
                                <TouchableOpacity onPress={birthDelete}>
                                    <Image source={require('../../assets/images/delete-info.png')} style={styles.delete} />
                                </TouchableOpacity>
                            </View>
                            {/* 남성 버튼 */}
                            <TouchableOpacity
                                style={[styles.genderButton, gender === 'MALE' && styles.selectedGender]}
                                onPress={() => setGender('MALE')}
                            >
                                <Text style={[styles.genderText, gender === 'MALE' && styles.selectedGenderText]}>남성</Text>
                            </TouchableOpacity>

                            {/* 여성 버튼 */}
                            <TouchableOpacity
                                style={[styles.genderButton, gender === 'FEMALE' && styles.selectedGender]}
                                onPress={() => setGender('FEMALE')}
                            >
                                <Text style={[styles.genderText, gender === 'FEMALE' && styles.selectedGenderText]}>여성</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.text}>이메일 주소</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.input}>{email}</Text>
                        </View>

                        <Text style={styles.text}>가입한 날짜</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.input}>{createdDate}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#B9B9B9' }]}
                            onPress={handleBackPress}
                        >
                            <Text style={styles.buttonText}>취소하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, !isFormValid && { backgroundColor: '#B9B9B9' }]}
                            onPress={handleNextPress}
                            disabled={!isFormValid}
                        >
                            <Text style={styles.buttonText}>저장하기</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const images = {
    THRILL: require('../../assets/emoji/happy.png'),
    YEARNING: require('../../assets/emoji/miss.png'),
    FEAR: require('../../assets/emoji/scared.png'),
    AWKWARDNESS: require('../../assets/emoji/uncomfortable.png'),
    JOY: require('../../assets/emoji/glad.png'),
    EXCITED: require('../../assets/emoji/excited.png'),
    MYSTERY: require('../../assets/emoji/mysterious.png'),
    ANGER: require('../../assets/emoji/angry.png'),
    ABSURDITY: require('../../assets/emoji/confused.png'),
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#464E82',
        height: 750,
    },
    editButton: {
        width: 20,
        height: 20,
        marginTop: 40,
        right: 150,
        marginLeft: 65,
        position: 'absolute',
    },
    profileImage: {
        position: 'absolute',
        width: 60,
        height: 60,
        marginTop: 53,
    },
    profileBack: {
        width: 70,
        height: 70,
        marginTop: 50,
    },
    modalContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    modalOuter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 모달 배경을 약간 어둡게 처리
    },
    modalView: {
        backgroundColor: 'white',
        padding: 30,
        marginHorizontal: 35,
        borderRadius: 20,
        shadowOpacity: 0.25,
        shadowColor: '#000',
        shadowOffset: 4,
        justifyContent: 'space-around',
        elevation: 5,
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
    },
    editedProfile: {
        width: 60,
        height: 60,
        marginBottom: 20,
        marginRight: 15,
    },
    back: {
        marginTop: 53,
        marginLeft: 13,
        width: 32,
        height: 32,
    },
    textInfo: {
        color: 'white',
        fontSize: 25,
        marginLeft: 40,
        marginRight: 30,
    },
    info: {
        paddingTop: 122,
        alignItems: 'center',
        flexDirection: 'row',
    },
    star: {
        width: 95,
        height: 89,
    },
    delete: {
        width: 18,
        height: 18,
    },
    button: {
        backgroundColor: '#EF82A1',
        paddingHorizontal: 50,
        paddingVertical: 20,
        borderRadius: 15,
        marginTop: 80,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#B9B9B9', // 비활성화 시의 배경색 설정
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 40,
        marginTop: 20,
    },
    rowText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 40,
        marginTop: 40,
        marginRight: 80,
    },
    inputContainer: { // TextInput 스타일
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        marginHorizontal: 40,
        marginTop: 4,
        borderWidth: 1,
        padding: 10,
        borderColor: '#464E82',
        borderBottomColor: '#EF82A1',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 18,
    },
    birthInput: {
        color: 'white',
        fontSize: 16,
        marginRight: 20,
        width: 90,
    },
    genderButton: { // 버튼 초기 스타일
        width: 74,
        height: 37,
        padding: 10,
        marginTop: 18,
        marginLeft: -20,
        marginRight: 30,
        borderWidth: 1,
        borderColor: '#EF82A1',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedGender: { // 선택된 성별 버튼
        backgroundColor: '#464E82', // 남색
        borderWidth: 1,
        borderColor: '#EF82A1',
        backgroundColor: '#EF82A1',
    },
    genderText: { // 성별 텍스트 초기 스타일
        color: '#EF82A1', //분홍색
        fontSize: 16,
    },
    selectedGenderText: { // 선택된 성별 텍스트
        color: '#FFFFFF',
    },


});

export default ProfileEditView;
