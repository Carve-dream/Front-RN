import { FlatList, StyleSheet, SafeAreaView } from 'react-native';
import TopBar from './TopBar';
import Input from './Input';
import Button from './Button';
import { useState } from 'react';

const ChatView = ({ navigation }) => {

  //채팅창 인사말
  const [messages, setMessages] = useState([
    { id: '0', text: '안녕하세요! 가상 심리학자 꾸미입니다. 어떻게 도와드릴까요?', sender: 'other' },
    { id: '1', text: '', sender: 'buttons' }, // 일기장 보기, 상담하기 버튼
  ]);

  const sendMessage = (messageText) => {
    // 사용자가 메시지를 보냄
    if (messageText.trim().length > 0) {
      setMessages([...messages, { id: Date.now().toString(), text: messageText, sender: 'user' }]);

      // 상대방 응답 메세지 (0.5초 후에 사용자 메시지를 그대로 답장하도록 임의 설정)
      setTimeout(() => {
        setMessages(messages => [...messages, { id: (Date.now() + 1).toString(), text: messageText, sender: 'other' }]);
      }, 500); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/*상단바*/}
      <TopBar />

      {/* 채팅 창 */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({item})=> <Button item={item}/>}
        style={styles.chatContainer}
      />

      {/* 메세지 보내기 입력창 */}
      <Input sendMessage={sendMessage} />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
});

export default ChatView;
