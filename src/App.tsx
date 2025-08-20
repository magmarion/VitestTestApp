// src/App.tsx
import EmojiTournament from "./components/EmojiTournament";

const EMOJIS = [
  "😂", "❤️", "😍", "🤣",
  "😊", "🙏", "💕", "😭",
  "😘", "👍", "😅", "👏",
  "😁", "🔥", "🥰", "😎"
];

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Emoji Tournament 🏆</h1>
      <EmojiTournament emojis={EMOJIS} />
    </div>
  );
}

export default App;
