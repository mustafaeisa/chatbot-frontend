import React, { useRef, useEffect } from "react";
import { useChat } from "./hooks/useChat";
import Header from "./components/Header";
import Message, { TypingIndicator } from "./components/Message";
import ChatInput from "./components/ChatInput";
import EmptyState from "./components/EmptyState";
import styles from "./App.module.css";

export default function App() {
  const { messages, loading, error, sendMessage, clearChat } = useChat();
  const bottomRef = useRef(null);

  // Scroll to bottom on every new message or typing state change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const isEmpty = messages.length === 0;

  return (
    <div className={styles.app}>
      <Header onClear={clearChat} messageCount={messages.length} />

      <main className={styles.main}>
        {isEmpty ? (
          <EmptyState />
        ) : (
          <div className={styles.messageList}>
            {messages.map((msg) => (
              <Message key={msg.id} message={msg} />
            ))}

            {loading && <TypingIndicator />}

            {error && (
              <div className={styles.error} role="alert">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </main>

      <ChatInput
        onSend={sendMessage}
        loading={loading}
        showSuggestions={isEmpty}
      />
    </div>
  );
}
