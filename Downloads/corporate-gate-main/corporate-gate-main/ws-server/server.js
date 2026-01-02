
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import dotenv from "dotenv";
// dotenv.config({ path: ".env.local" });

// import { Server } from "socket.io";
// import { createSTT, ttsSentence } from "../lib/deepgram";
// import { askLLM, evaluateInterview } from "../lib/openai";

// const io = new Server(4000, { cors: { origin: "*" } });

// io.on("connection", (socket) => {
//   console.log(" Client connected:", socket.id);

//   let userContext: any = null;
//   let chatHistory: { role: string; content: string }[] = [];

//   const stt = createSTT(async (text: string) => {
//     chatHistory.push({ role: "user", content: text });
//     socket.emit("transcript", { role: "user", content: text });

//     const systemPrompt = userContext
//       ? `
// You are an AI interviewer for ${userContext.company}.
// Role: ${userContext.role}
// Rules:
// - Ask ONE question at a time
// - Max 2 sentences
// - Difficulty: ${userContext.difficulty}
// `
//       : "You are a professional interviewer.";

//     let buffer = "";
//     let ttsQueue = Promise.resolve();

//     const addToQueue = (s: string) => {
//       ttsQueue = ttsQueue.then(() => ttsSentence(s, socket));
//     };

//     const stream = await askLLM([
//       { role: "system", content: systemPrompt },
//       ...chatHistory,
//     ]);

//     for await (const chunk of stream) {
//       buffer += chunk;
//       socket.emit("transcript-chunk", { role: "assistant", content: chunk });

//       if (/[.!?]\s$/.test(buffer)) {
//         addToQueue(buffer);
//         buffer = "";
//       }
//     }

//     if (buffer.trim()) addToQueue(buffer);

//     chatHistory.push({ role: "assistant", content: buffer });
//     socket.emit("transcript-done", { role: "assistant", content: buffer });
//   });

//   socket.on("join", async (data) => {
//     userContext = data;

//     const greeting = `
// Greet ${data.name}.
// Say interview for ${data.role}.
// Ask first question about ${data.technologies}.
// `;

//     const stream = await askLLM([
//       { role: "system", content: "You are a professional interviewer." },
//       { role: "user", content: greeting },
//     ]);

//     let full = "";
//     let buffer = "";
//     let ttsQueue = Promise.resolve();

//     const addToQueue = (s: string) => {
//       ttsQueue = ttsQueue.then(() => ttsSentence(s, socket));
//     };

//     for await (const chunk of stream) {
//       buffer += chunk;
//       full += chunk;
//       socket.emit("transcript-chunk", { role: "assistant", content: chunk });

//       if (/[.!?]\s$/.test(buffer)) {
//         addToQueue(buffer);
//         buffer = "";
//       }
//     }

//     if (buffer.trim()) addToQueue(buffer);

//     chatHistory.push({ role: "assistant", content: full });
//     socket.emit("transcript-done", { role: "assistant", content: full });
//   });

//   socket.on("audio-input", (pcm) => {
//     stt.send(pcm);
//     // });

//     // const buffer = Buffer.from(pcm); // ⭐ MAIN FIX
//     // stt.send(buffer);
//   })

//   socket.on("end-session", async () => {
//     const report = await evaluateInterview(userContext, chatHistory);
//     // socket.emit("session-ended", report);
//     // Add ID to report
//     const sessionId = (socket.handshake.query.sessionId as string) || socket.id;
//     report.id = sessionId;
//     report.company = userContext?.company;
//     report.role = userContext?.role;
//     report.mode = userContext?.mode;
//     report.tone = userContext?.tone;
//     report.difficulty = userContext?.difficulty;

//     // Store in global memory (or database in prod)
//     (global as any).sessionStore = (global as any).sessionStore || {};
//     (global as any).sessionStore[sessionId] = report;

//     socket.emit("session-ended", report);

//   });

//   socket.on("disconnect", () => {
//     stt.close();
//     console.log("🔴 Disconnected:", socket.id);
//   });
// });





// // Setup HTTP server integration for serving reports if needed
// // (But since io is standalone here, we might need a separate express app or attach to existing http??)
// // The previous code had a manual HTTP handler. Let's keep it for report fetching.
// const httpServer = io.httpServer; // Access underlying http server
// const originalHandler = httpServer.listeners('request')[0];
// httpServer.removeAllListeners('request');

// httpServer.on('request', (req, res) => {
//   // CORS
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   if (req.method === 'OPTIONS') {
//     res.writeHead(204);
//     res.end();
//     return;
//   }

//   if (req.url?.startsWith('/api/interviews/sessions/') && req.method === 'GET') {
//     const id = req.url.split('/').pop();
//     const store = (global as any).sessionStore || {};
//     const data = store[id || ""];

//     if (data) {
//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify(data));
//     } else {
//       res.writeHead(404, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ error: "Report not found" }));
//     }
//   } else {
//     if (originalHandler) {
//       (originalHandler as any).call(httpServer, req, res);
//     }
//   }
// });


// console.log("🚀 Socket server running on :4000");





import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { Server } from "socket.io";
import { createSTT, ttsSentence } from "../lib/deepgram";
import { askLLM, evaluateInterview } from "../lib/openai";

const io = new Server(4000, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  let userContext = null;
  let chatHistory = [];

  const stt = createSTT(async (text) => {
    chatHistory.push({ role: "user", content: text });
    socket.emit("transcript", { role: "user", content: text });

    const systemPrompt = userContext
      ? `
You are an AI interviewer for ${userContext.company}.
Role: ${userContext.role}
Rules:
- Ask ONE question at a time
- Max 2 sentences
- Difficulty: ${userContext.difficulty}
`
      : "You are a professional interviewer.";

    let buffer = "";
    let ttsQueue = Promise.resolve();

    const addToQueue = (sentence) => {
      ttsQueue = ttsQueue.then(() =>
        ttsSentence(sentence, socket)
      );
    };

    const stream = await askLLM([
      { role: "system", content: systemPrompt },
      ...chatHistory,
    ]);

    for await (const chunk of stream) {
      buffer += chunk;
      socket.emit("transcript-chunk", {
        role: "assistant",
        content: chunk,
      });

      if (/[.!?]\s$/.test(buffer)) {
        addToQueue(buffer);
        buffer = "";
      }
    }

    if (buffer.trim()) addToQueue(buffer);

    chatHistory.push({ role: "assistant", content: buffer });
    socket.emit("transcript-done", {
      role: "assistant",
      content: buffer,
    });
  });

  socket.on("join", async (data) => {
    userContext = data;

    const greeting = `
Greet ${data.name}.
Say interview for ${data.role}.
Ask first question about ${data.technologies}.
`;

    const stream = await askLLM([
      { role: "system", content: "You are a professional interviewer." },
      { role: "user", content: greeting },
    ]);

    let full = "";
    let buffer = "";
    let ttsQueue = Promise.resolve();

    const addToQueue = (sentence) => {
      ttsQueue = ttsQueue.then(() =>
        ttsSentence(sentence, socket)
      );
    };

    for await (const chunk of stream) {
      buffer += chunk;
      full += chunk;

      socket.emit("transcript-chunk", {
        role: "assistant",
        content: chunk,
      });

      if (/[.!?]\s$/.test(buffer)) {
        addToQueue(buffer);
        buffer = "";
      }
    }

    if (buffer.trim()) addToQueue(buffer);

    chatHistory.push({ role: "assistant", content: full });
    socket.emit("transcript-done", {
      role: "assistant",
      content: full,
    });
  });

  socket.on("audio-input", (pcm) => {
    stt.send(pcm);
    // If needed:
    // const buffer = Buffer.from(pcm);
    // stt.send(buffer);
  });

  socket.on("end-session", async () => {
    const report = await evaluateInterview(userContext, chatHistory);

    const sessionId =
      socket.handshake.query.sessionId || socket.id;

    report.id = sessionId;
    report.company = userContext?.company;
    report.role = userContext?.role;
    report.mode = userContext?.mode;
    report.tone = userContext?.tone;
    report.difficulty = userContext?.difficulty;

    global.sessionStore = global.sessionStore || {};
    global.sessionStore[sessionId] = report;

    socket.emit("session-ended", report);
  });

  socket.on("disconnect", () => {
    stt.close();
    console.log("🔴 Disconnected:", socket.id);
  });
});

// ---- HTTP fallback for fetching interview reports ----

const httpServer = io.httpServer;
const originalHandler = httpServer.listeners("request")[0];
httpServer.removeAllListeners("request");

httpServer.on("request", (req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (
    req.url?.startsWith("/api/interviews/sessions/") &&
    req.method === "GET"
  ) {
    const id = req.url.split("/").pop();
    const store = global.sessionStore || {};
    const data = store[id];

    if (data) {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(data));
    } else {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({ error: "Report not found" })
      );
    }
  } else if (originalHandler) {
    originalHandler.call(httpServer, req, res);
  }
});

console.log("🚀 Socket server running on :4000");
