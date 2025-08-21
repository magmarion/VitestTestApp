// src/App.tsx
import EmojiTournament from "./components/EmojiTournament";
import "./index.css";

const EMOJIS = [
  "😂", "❤️", "😍", "🤣",
  "😊", "🙏", "💕", "😭",
  "😘", "👍", "😅", "👏",
  "😁", "🔥", "🥰", "😎"
];

function App() {
  return (
    <div className="min-h-screen w-full bg-blue-100 flex flex-col items-center p-4">
      <h1 className="text-2xl">Emoji Tournament 🏆</h1>
      <EmojiTournament emojis={EMOJIS} />
    </div>
  );
}

export default App;
