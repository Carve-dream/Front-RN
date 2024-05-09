import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, StatusBar, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Validation from '../LoginView/validation';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SignUpInfo = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState(null);
    const isFormValid = name.length > 0 && birth.length === 10 && gender !== null; // 이름, 생년월일, 성별이 모두 입력되었는지 확인

    // 다음 버튼 눌렀을 때 SignupAcc 화면으로 전환
    const handleNextPress = () => {
        navigation.navigate('SignUpAcc')
    };

    // 이름 삭제
    const nameDelete = () => {
        console.log('delete');
        setName('');
    };

    //생년월일 삭제
    const birthDelete = () => {
        console.log('birth delete');
        setBirth('');
    }
    const handleBirthDateChange = (text) => {
        const newText = text.replace(/[^0-9]/g, ''); // 먼저 숫자가 아닌 모든 문자를 제거합니다.
        let formattedText = newText;

        // 숫자가 4개 입력되었을 때와 6개 입력되었을 때 자동으로 슬래시를 추가합니다.
        if (newText.length > 4) {
            formattedText = newText.substring(0, 4) + '/' + newText.substring(4);
        }
        if (newText.length > 6) {
            formattedText = newText.substring(0, 4) + '/' + newText.substring(4, 6) + '/' + newText.substring(6, 8);
        }

        setBirth(formattedText); // 변환된 텍스트로 상태를 업데이트합니다.
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>


            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/back-white.png')} style={styles.back} />
                </TouchableOpacity>

                <StatusBar barStyle="light-content" />
                <View style={styles.info}>
                    <Text style={styles.textInfo}>꿈속새김 이용을 위해{"\n"}정보를 입력해주세요</Text>
                    <Image source={require('../../assets/images/signup-star.png')} style={styles.star} />
                </View>
                <View>
                    <Text style={styles.text}>이름</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="김꾸미"
                            placeholderTextColor="#BDBDBD"
                            value={name}
                            onChangeText={setName}
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
                                placeholder="2000/01/01"
                                placeholderTextColor="#BDBDBD"
                                keyboardType="numeric"
                                value={birth}
                                onChangeText={handleBirthDateChange}
                            />
                            <TouchableOpacity onPress={birthDelete}>
                                <Image source={require('../../assets/images/delete-info.png')} style={styles.delete} />
                            </TouchableOpacity>
                        </View>
                        {/* 남성 버튼 */}
                        <TouchableOpacity
                            style={[styles.genderButton, gender === 'male' && styles.selectedGender]}
                            onPress={() => setGender('male')}
                        >
                            <Text style={[styles.genderText, gender === 'male' && styles.selectedGenderText]}>남성</Text>
                        </TouchableOpacity>

                        {/* 여성 버튼 */}
                        <TouchableOpacity
                            style={[styles.genderButton, gender === 'female' && styles.selectedGender]}
                            onPress={() => setGender('female')}
                        >
                            <Text style={[styles.genderText, gender === 'female' && styles.selectedGenderText]}>여성</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.button, !isFormValid && { backgroundColor: '#B9B9B9' }]}
                    onPress={handleNextPress}
                    disabled={!isFormValid} 
                >
                    <Text style={styles.buttonText}>다음</Text>
                </TouchableOpacity>

            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#464E82',
        height: 750,
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
        marginHorizontal: 30,
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

export default SignUpInfo;
