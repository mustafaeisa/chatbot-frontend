import React, { useState, useRef, useEffect } from "react";
import { isArabic } from "../utils/lang";
import styles from "./ChatInput.module.css";

const SUGGESTIONS = {
  en: [
    "What can you help me with?",
    "Translate 'Good morning' to Arabic",
    "Tell me a fun fact",
    "What's the capital of the UAE?",
  ],
  ar: [
    "ما هي اللغات التي تتحدثها؟",
    "ترجم 'مرحباً' إلى الإنجليزية",
    "أخبرني بحقيقة ممتعة",
    "ما عاصمة الإمارات؟",
  ],
};

export default function ChatInput({ onSend, loading, showSuggestions }) {
  const [value, setValue] = useState("");
  const [lang, setLang]   = useState("en");
  const textareaRef       = useRef(null);

  // Auto-resize textarea height
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  }, [value]);

  // Focus on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    if (v) setLang(isArabic(v) ? "ar" : "en");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || loading) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleSuggestion = (text) => {
    onSend(text);
    textareaRef.current?.focus();
  };

  const arabic = isArabic(value);

  return (
    <div className={styles.wrapper}>
      {showSuggestions && (
        <div className={styles.suggestions}>
          <p className={styles.suggLabel}>Try asking —</p>
          <div className={styles.chips}>
            {SUGGESTIONS[lang].map((s) => (
              <button
                key={s}
                className={styles.chip}
                onClick={() => handleSuggestion(s)}
                disabled={loading}
                dir={isArabic(s) ? "rtl" : "ltr"}
                style={{
                  fontFamily: isArabic(s)
                    ? "'Noto Sans Arabic', sans-serif"
                    : "'DM Sans', sans-serif",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <div className={styles.langToggle}>
            {["en", "ar"].map((l) => (
              <button
                key={l}
                className={`${styles.langBtn} ${lang === l ? styles.langActive : ""}`}
                onClick={() => setLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.inputRow}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={lang === "ar" ? "اكتب رسالتك..." : "Type a message…"}
          rows={1}
          dir={arabic ? "rtl" : "ltr"}
          style={{
            fontFamily: arabic
              ? "'Noto Sans Arabic', sans-serif"
              : "'DM Sans', sans-serif",
          }}
          disabled={loading}
          aria-label="Chat message input"
        />

        <button
          className={styles.sendBtn}
          onClick={submit}
          disabled={!value.trim() || loading}
          aria-label="Send message"
        >
          {loading ? (
            <span className={styles.spinner} />
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </div>

      <p className={styles.hint}>Enter to send · Shift+Enter for new line</p>
    </div>
  );
}
