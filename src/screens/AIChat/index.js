import React, { useState, useEffect, useRef } from "react";
import { 
  View, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  SafeAreaView, 
  StatusBar 
} from "react-native";
import AIHeader from "../../components/AIHeader";
import AIQuickActions from "../../components/AIQuickActions";
import AIMessageBubble from "../../components/AIMessageBubble";
import AIInput from "../../components/AIInput";
import TypingIndicator from "../../components/TypingIndicator";
import { askVehicleAI } from "../../services/aiService";
import { saveChat, loadChat } from "../../services/chatStorage";
import styles from "./styles";

export default function AIChatScreen() {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    const oldMessages = await loadChat();
    if (oldMessages && oldMessages.length) {
      setMessages(oldMessages);
    } else {
      setMessages([
        {
          id: 1,
          sender: "ai",
          text: "Hello 👋 I am AutoSphere AI. Ask me about your vehicle.",
        },
      ]);
    }
  }

  // Auto-scroll utility method wrapped to run safely on changes
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 60);
  };

  async function sendMessage(custom) {
    const text = (custom || input).trim();
    if (!text) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
    };

    const updated = [...messages, userMessage];
    setMessages(updated);
    await saveChat(updated);
    setInput("");
    setLoading(true);
    scrollToBottom();

    const aiMessageId = Date.now() + 1;

    try {
      const response = await askVehicleAI(
        text,
        {
          vehicle: "Toyota Corolla 2022",
          mileage: "87000 KM",
        },
        (streamingText) => {
          setMessages((prevMessages) => {
            const filtered = prevMessages.filter((m) => m.id !== aiMessageId);
            return [
              ...filtered,
              { id: aiMessageId, sender: "ai", text: streamingText },
            ];
          });
          scrollToBottom();
        }
      );

      const finalMessages = [
        ...updated,
        { id: aiMessageId, sender: "ai", text: response },
      ];
      setMessages(finalMessages);
      await saveChat(finalMessages);
    } catch (error) {
      console.error("Error generating AI response:", error);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  }

  function deleteMessage(id) {
    const updated = messages.filter((item) => item.id !== id);
    setMessages(updated);
    saveChat(updated);
  }

  function editMessage(text) {
    setInput(text);
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      >
        {/* Top Floating App Bar Zone */}
        <AIHeader />

        {/* Dynamic Inner Chat Display Area */}
        <View style={styles.chatWrapper}>
          <ScrollView
            ref={scrollRef}
            style={styles.chat}
            contentContainerStyle={styles.messagesContainer}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={scrollToBottom}
          >
            {messages.map((item) => (
              <AIMessageBubble
                key={item.id}
                message={item.text}
                sender={item.sender}
                onDelete={() => deleteMessage(item.id)}
                onEdit={() => editMessage(item.text)}
              />
            ))}

            {loading && (
              <View style={styles.typingContainerWrapper}>
                <TypingIndicator />
              </View>
            )}
          </ScrollView>
        </View>

        {/* Quick Suggestion Chips Layout */}
        <View style={styles.actionsWrapper}>
          <AIQuickActions onSelect={sendMessage} />
        </View>

        {/* Sticky Input Toolbar Core */}
        <View style={styles.inputWrapper}>
          <AIInput value={input} setValue={setInput} send={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}