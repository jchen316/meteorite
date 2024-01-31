import { useState, useEffect, FC } from "react";

interface ITextTyper {
  text: string;
  interval: number;
}

const TextTyper: FC<ITextTyper> = ({ text = "", interval = 100 }) => {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let localTypingIndex = 0;
    let localTyping = "";
    const printer = setInterval(() => {
      if (localTypingIndex < text.length) {
        setTypedText((localTyping += text[localTypingIndex]));
        localTypingIndex++;
      }
    }, interval);

    return () => {
      clearInterval(printer);
    };
  }, [text, interval]);

  return (
    <ul>
      {[typedText].map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default TextTyper;
