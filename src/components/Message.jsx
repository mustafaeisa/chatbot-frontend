import React from "react";
import { getDir, getFont, isArabic } from "../utils/lang";
import styles from "./Message.module.css";

export function TypingIndicator() {
  return (
    <div className={`${styles.row} ${styles.bot}`}>
      <div className={styles.avatar} aria-hidden="true">✦</div>
      <div className={`${styles.bubble} ${styles.botBubble} ${styles.typing}`}>
        <span className={styles.dot} style={{ animationDelay: "0s" }} />
        <span className={styles.dot} style={{ animationDelay: "0.18s" }} />
        <span className={styles.dot} style={{ animationDelay: "0.36s" }} />
      </div>
    </div>
  );
}

export default function Message({ message }) {
  const isUser = message.role === "user";
  const dir    = getDir(message.content);
  const font   = getFont(message.content);
  const arabic = isArabic(message.content);

  return (
    <div className={`${styles.row} ${isUser ? styles.user : styles.bot}`}>
      {!isUser && (
        <div className={styles.avatar} aria-hidden="true">✦</div>
      )}

      <div
        className={`${styles.bubble} ${isUser ? styles.userBubble : styles.botBubble}`}
        dir={dir}
        style={{ fontFamily: font }}
      >
        <p className={arabic ? styles.arabicText : styles.latinText}>
          {message.content}
        </p>

        {message.usage && (
          <div className={styles.meta}>
            {message.usage.input}↑ · {message.usage.output}↓ tokens
          </div>
        )}
      </div>

      {isUser && (
        <div className={`${styles.avatar} ${styles.userAvatar}`} aria-hidden="true">
          you
        </div>
      )}
    </div>
  );
}
