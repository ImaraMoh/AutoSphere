import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
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

    const aiMessageId = Date.now() + 1;

    try {
      const response = await askVehicleAI(
        text,
        {
          vehicle: "Toyota Corolla 2022",
          mileage: "87000 KM",
        },
        (streamingText) => {
          // Updates the exact streaming bubble chunk-by-chunk
          setMessages((prevMessages) => {
            const filtered = prevMessages.filter((m) => m.id !== aiMessageId);
            return [
              ...filtered,
              { id: aiMessageId, sender: "ai", text: streamingText },
            ];
          });
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <AIHeader />

      <AIQuickActions onSelect={sendMessage} />

      <ScrollView
        ref={scrollRef}
        style={styles.chat}
        contentContainerStyle={styles.messages}
        onContentSizeChange={() => {
          scrollRef.current?.scrollToEnd({ animated: true });
        }}
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

        {loading && <TypingIndicator />}
      </ScrollView>

      <AIInput value={input} setValue={setInput} send={sendMessage} />
    </KeyboardAvoidingView>
  );
}