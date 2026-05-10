import React from "react";
import styles from "./EmptyState.module.css";

export default function EmptyState() {
  return (
    <div className={styles.container}>
      <div className={styles.orb} aria-hidden="true">✦</div>
      <h2 className={styles.heading}>Hello — مرحباً</h2>
      <p className={styles.sub}>
        Your bilingual AI assistant. Ask me anything in{" "}
        <span className={styles.highlight}>English</span> or{" "}
        <span
          className={styles.highlight}
          style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}
        >
          العربية
        </span>
        .
      </p>
      <div className={styles.pills}>
        {["General Knowledge", "Translation", "Recommendations", "Casual Chat"].map(
          (label) => (
            <span key={label} className={styles.pill}>
              {label}
            </span>
          )
        )}
      </div>
    </div>
  );
}
