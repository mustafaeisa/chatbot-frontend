import React from "react";
import styles from "./Header.module.css";

export default function Header({ onClear, messageCount }) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.orb} aria-hidden="true">✦</div>
        <div className={styles.titles}>
          <h1 className={styles.title}>AI Assistant</h1>
          <p className={styles.subtitle}>مساعد ذكي ثنائي اللغة</p>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.badge}>
          <span className={styles.dot} />
          GPT-4o
        </div>

        {messageCount > 0 && (
          <button className={styles.clearBtn} onClick={onClear} title="Clear conversation">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6M9 6V4h6v2" />
            </svg>
            Clear
          </button>
        )}
      </div>
    </header>
  );
}
