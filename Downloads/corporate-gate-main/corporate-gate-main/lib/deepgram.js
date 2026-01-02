






// import WebSocket from "ws";
// import type { Socket } from "socket.io";

// /* =========================
//    STT
// ========================= */

// export function createSTT(onTranscript: (text: string) => void) {
//   const ws = new WebSocket(
//     "wss://api.deepgram.com/v1/listen?model=nova-2&language=en&encoding=linear16&sample_rate=16000",
//     {
//       headers: { Authorization: `Token ${process.env.DEEPGRAM_API_KEY}` },
//     }
//   );

//   ws.on("message", (msg) => {
//     const data = JSON.parse(msg.toString());
//     const t = data.channel?.alternatives?.[0]?.transcript;
//     if (t) {
//       onTranscript(t);
//     }

//     // if (t && data.is_final) onTranscript(t);
//   });

//   const keepAlive = setInterval(() => {
//     if (ws.readyState === WebSocket.OPEN) {
//       ws.send(JSON.stringify({ type: "KeepAlive" }));
//     }
//   }, 8000);

//   ws.on("close", () => clearInterval(keepAlive));

//   return {
//     send: (audio: ArrayBuffer) => ws.readyState === 1 && ws.send(audio),
//     close: () => ws.close(),
//   };
// }

// /* =========================
//    STREAMING TTS (MP3)
// ========================= */

// export async function ttsSentence(text: string, socket: Socket) {
//   const res = await fetch(
//     "https://api.deepgram.com/v1/speak?model=aura-asteria-en&encoding=mp3",
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ text }),
//     }
//   );

//   if (!res.body) return;

//   const reader = res.body.getReader();

//   while (true) {
//     const { value, done } = await reader.read();
//     if (done) break;
//     socket.emit("audio-chunk", value);
//   }
// }


import WebSocket from "ws";

/* =========================
   STT
========================= */

export function createSTT(onTranscript) {
  const ws = new WebSocket(
    "wss://api.deepgram.com/v1/listen?model=nova-2&language=en&encoding=linear16&sample_rate=16000",
    {
      headers: {
        Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
      },
    }
  );

  ws.on("message", (msg) => {
    const data = JSON.parse(msg.toString());
    const transcript =
      data.channel?.alternatives?.[0]?.transcript;

    if (transcript) {
      onTranscript(transcript);
    }

    // if (transcript && data.is_final) onTranscript(transcript);
  });

  const keepAlive = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "KeepAlive" }));
    }
  }, 8000);

  ws.on("close", () => clearInterval(keepAlive));

  return {
    send: (audio) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(audio);
      }
    },
    close: () => ws.close(),
  };
}

/* =========================
   STREAMING TTS (MP3)
========================= */

export async function ttsSentence(text, socket) {
  const res = await fetch(
    "https://api.deepgram.com/v1/speak?model=aura-asteria-en&encoding=mp3",
    {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    }
  );

  if (!res.body) return;

  const reader = res.body.getReader();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    socket.emit("audio-chunk", value);
  }
}
