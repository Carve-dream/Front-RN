import React ,{ useState } from 'react';
import { TextInput, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../../ChatView/TopBar';


const screenWidth = Dimensions.get('window').width; 
const screenHeight = Dimensions.get('window').height; 


const DiaryImageCreate = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.fullScreen}>
            <View style={styles.topCtn}>
                <TopBar navigation={navigation} title="꿈 이미지 생성"/>
            </View>
            <FullScreen/>
        </View>
    );
};



const FullScreen = () => {
    return(
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
            <View style={styles.backCtn}>
                <View style={styles.card}>
                    <TopView/>
                    <View style={styles.infoContainer}>
                        <Text style={styles.content}>나는 오늘 하늘을 나는 꿈을 꿨다.{'\n'}나는 오늘 하늘을 나는 꿈을 꿨다.{'\n'}나는 오늘 하늘을 나는 꿈을 꿨다.{'\n'}</Text>
                    </View>
                    <View style={styles.TagCtn}>
                        <Tag/> 
                        <Tag/>
                        <Tag/>
                    </View>
                 </View>

                 <View style={styles.DiaryEntryCtn}>
                    <DiaryEntry/>
                 </View>
                 
             </View>
        </View>
        <View style={styles.saveCtn}>
                <SaveBtn/>
        </View>
    </ScrollView>
    );
}


// 일기장 제목, 날짜
const TopView = ({}) => {
    return (
        <View style={styles.topView}>
            <Text style={styles.title}>배 타는 꿈</Text>
            <Text>2024.05.08</Text>
        </View>
    );
};



//태그 컴포넌트
const Tag = () => {
    return(
        <View>
            <View style={styles.tagBox} >
                <Text style={styles.tagText}> #하늘 </Text>
            </View>
        </View>
    );
};


//이미지 내용
const DiaryEntry = () => {
    const [diaryText, setDiaryText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View>
            <TouchableOpacity style={styles.textInputWrapper} activeOpacity={1} onPress={() => setIsFocused(true)}>
                {!isFocused && !diaryText && (
                    <View style={styles.placeholderContainer}>
                        <Text style={styles.titlePlaceholder}>이미지 내용</Text>
                        <Text style={styles.subtitlePlaceholder}>꿈 이미지 내용을 적어주세요</Text>
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


//꿈 이미지 생성하기 버튼
const SaveBtn = () => {
    const navigation = useNavigation();
    return(
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('DiaryImageProduce')} style={styles.confirmButton}>
                <Text style={styles.confirmText}>꿈 이미지 생성하기</Text>
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
        marginBottom: 10
    },
    backCtn: {
        flexDirection: 'column',
        flex: 1,
        width: 330,
        marginHorizontal: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginTop: 15,
        minHeight: 530,
        minWidth: 370,
        alignItems: 'center',
        justifyContent: 'center'

    },
    card : {
        width: 330, 
        height: 210, 
        backgroundColor: 'white', 
        borderRadius: 10,       
        borderColor: '#89898B',
        borderWidth: 2,
        padding:2,
        marginTop: -30
    },
    infoContainer: {
        flex:1,
        minHeight: 60,
        minWidth: 280,
        textAlign:'left',
    },
    title: {
        textAlign: 'center', 
        color: '#333333', 
        fontSize: 16, 
        fontWeight: '700',
        marginBottom: 5
    },
    content: {
        color: '#434343', 
        fontSize: 14, 
        fontWeight: '400',
        marginTop: 10,
        marginLeft: 20,
    },
    topView: {
        width: 319,
        height: 50, 
        alignItems: 'flex-start', 
        flexDirection:'column',
        marginLeft: 20,
        marginTop: 10,
    },
    
    tagBox: {
        width: 88, 
        height: 30,
        backgroundColor: '#C1C7F8',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        marginTop:10
    },
    tagText: {
        margin: 4,
        color: '#F2F2F2', 
        fontSize: 14, 
        fontWeight: 'bold',
    },
    TagCtn:{
        flex:1,
        minHeight:30,
        minWidth:290,
        flexDirection: 'row',
        marginBottom : 30
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
    },
    textInputWrapper: {
        width: 323, 
        height: 200, 
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
        color: '#434343',
        fontWeight: '600', 
        marginBottom: 25,
        marginTop: 10
    },
    subtitlePlaceholder: {
        fontSize: 14,
        color: '#434343',
        fontWeight: '400',
    },
    DiaryEntryCtn: {
        marginTop:25
    }
    
});

export default DiaryImageCreate;
