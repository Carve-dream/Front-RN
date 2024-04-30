import { View, FlatList, StyleSheet, SafeAreaView, Text, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import TopBar from './TopBar';
import Input from './Input';
import Button from './Button';
import Message from './Message';
import BoxComponent from './BoxComponent';
import { useState, useRef, useEffect } from 'react';


const ChatView = ({ navigation, name }) => {
  StatusBar.setBarStyle('light-content');

  //날짜 표시
  const [messages, setMessages] = useState([
    { id: 'date', text: formatDate(new Date()), sender: 'date' }
  ]);


  //채팅창 실행시 환영 인사
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, {
        id: '0',
        text: '안녕하세요! 저는 당신의 꿈을 분석하고, 꿈 속 상징들의 의미 파악을 통해 스스로의 감정을 파악할 수 있도록 돕는 가상 심리학자 꾸미예요',
        sender: 'other'
      }]);
    }, 1000); // 1초 후 첫 번째 메시지 추가

    // 두 번째 메시지 설정
    const timer2 = setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, {
        id: '1',
        text: `${name}님의 무의식 속으로 탐험을 떠나볼까요?`,
        sender: 'other'
      }]);
    }, 2000); // 2초 후 두 번째 메시지 추가

    const timer3 = setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages, {
          id: '2',
          text: '',
          sender: 'buttons'
        }
      ]);
    }, 2001);

    // 컴포넌트 언마운트 시 타이머 제거
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

    };
  }, [name]); // `name`이 변경될 때마다 useEffect 재실행


  // chat gpt api 연동
  const sendMessage = (question) => {

    // 사용자가 메시지를 보냄
    if (question.trim().length > 0) {
      const userMessageId = Date.now().toString();

      const loadingMessage = {
        id: 'loading_' + userMessageId,
        text: 'loading',
        sender: 'loading',
      }

      setMessages(prevMessages => [
        ...prevMessages,
        { id: userMessageId, text: question, sender: 'user' }, // 사용자 메시지 추가
        loadingMessage // 로딩 이미지 추가
      ]);

      const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5IiwiaWF0IjoxNzE0NTA5MTkyLCJleHAiOjE3MTQ1MTI3OTJ9.gmM5xC4gmpzfPaDzFNQ0JLXvD4DocvBhetR0Mj1k8RhRndttFMfwKoxDHAeqjY-Awh5qOtpbfSwH6HbHWQp6qw';
      console.log(`Sending question: ${question}`);
      fetch('http://carvedrem.kro.kr:8080/api/gptChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ question: question }),
      })

        .then(response => response.json())

        .then(data => {
          console.log(data);
          console.log(data.information.answer);
          if (question == '꿈일기 불러오기') {
            data.information.answer = <BoxComponent />;
          } //꿈일기 목록 불러오기

          // 상대방 응답 메시지 추가
          setMessages(messages => messages.filter(message => message.id !== loadingMessage.id)
            .concat({ id: Date.now().toString(), text: data.information.answer, sender: 'other' }));
        })
        .catch(error => {
          console.error('Error:', error);
          setMessages(messages => messages.filter(message => message.id !== loadingMessage.id));
        });
    }


  }

  // FlatList ref 생성
  const flatListRef = useRef();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/*상단바*/}
        <TopBar navigation={navigation} title="꾸미와의 대화" />

        {/* 채팅 창 */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (item.sender === 'buttons') {
              return <Button item={item} sendMessage={sendMessage} />;
            } else if (item.sender === 'date') {
              return <Text style={styles.dataText}>{item.text}</Text>;
            }
            else {
              return <Message item={item} />;
            }
          }}
          style={styles.chatContainer}
          contentContainerStyle={{ paddingBottom: 30 }}
          onContentSizeChange={() => setTimeout(()=>flatListRef.current.scrollToEnd({ animated: true }), 1)}
          onLayout={() => setTimeout(()=>flatListRef.current.scrollToEnd({ animated: true }), 1)}
        />

        {/* 메세지 보내기 입력창 */}
        <Input sendMessage={sendMessage} />
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};


function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#464E82',
  },
  chatContainer: {
    flex: 1,
    padding: 15,
  },
  dataText: {
    paddingBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
});

export default ChatView;
