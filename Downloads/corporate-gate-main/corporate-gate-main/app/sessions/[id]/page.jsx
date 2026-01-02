// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import io from "socket.io-client";
// import { Mic, MicOff, PhoneOff, User, Bot } from "lucide-react";

// export default function SessionPage() {
//   const params = useParams();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const refs = useRef<{
//     audioContext?: AudioContext;
//     workletNode?: AudioWorkletNode;
//     stream?: MediaStream;
//   } | null>(null);

//   const [socket, setSocket] = useState<any>(null);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [partial, setPartial] = useState("");
//   const [recording, setRecording] = useState(false);

//   /* ========== AUDIO STREAM PLAYER ========== */
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const mediaSourceRef = useRef<MediaSource | null>(null);
//   const sourceBufferRef = useRef<SourceBuffer | null>(null);
//   const queueRef = useRef<Uint8Array[]>([]);
//   const initRef = useRef(false);

//   const initAudio = () => {
//     if (initRef.current) return;
//     initRef.current = true;

//     const audio = new Audio();
//     const ms = new MediaSource();
//     audio.src = URL.createObjectURL(ms);
//     audio.autoplay = true;

//     ms.addEventListener("sourceopen", () => {
//       const sb = ms.addSourceBuffer("audio/mpeg");
//       sb.addEventListener("updateend", () => {
//         if (queueRef.current.length && !sb.updating) {
//           sb.appendBuffer(queueRef.current.shift()!);
//         }
//       });
//       sourceBufferRef.current = sb;
//     });

//     audio.play();
//     audioRef.current = audio;
//     mediaSourceRef.current = ms;
//   };

//   useEffect(() => {
//     const s = io("http://localhost:4000", {
//       transports: ["websocket"],
//       query: { sessionId: params.id },
//     });

//     setSocket(s);

//     s.on("connect", () => {
//       const data = searchParams.get("data");
//       if (data) s.emit("join", JSON.parse(decodeURIComponent(data)));
//     });


//     s.on("transcript", (m) => setMessages((p) => [...p, m]));
//     s.on("transcript-chunk", (d) => setPartial((p) => p + d.content));
//     s.on("transcript-done", (m) => {
//       setMessages((p) => [...p, m]);
//       setPartial("");
//     });
//     //  s.on("transcript", (data) => {
//     //       setMessages((prev) => [...prev, data]);
//     //     });

//     //     s.on("transcript-chunk", (data) => {
//     //       setCurrentTranscript((prev) => prev + data.content);
//     //     });

//     //     s.on("transcript-done", (data) => {
//     //       setMessages((prev) => [...prev, data]);
//     //       setCurrentTranscript("");
//     //     });
//     s.on("audio-chunk", (chunk: ArrayBuffer) => {
//       initAudio();
//       const data = new Uint8Array(chunk);
//       const sb = sourceBufferRef.current;

//       if (!sb || sb.updating) queueRef.current.push(data);
//       else sb.appendBuffer(data);
//     });

//     // s.on("session-ended", () => router.push(`/interview/report/${params.id}`));

//     // return () => s.disconnect();


//     s.on("session-ended", () => {
//       router.push("/interviews/report/" + params.id);
//     });

//     return () => {
//       s.disconnect();
//       stopRecording();

//     };
//   }, [params.id, searchParams]);

//   /* ========== MIC ========== */

//   async function startRecording() {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//     const audioContext = new AudioContext({
//       sampleRate: 16000, // Deepgram compatible
//     });

//     await audioContext.audioWorklet.addModule("/audio-worklet-processor.js");

//     const source = audioContext.createMediaStreamSource(stream);
//     const workletNode = new AudioWorkletNode(audioContext, "pcm-processor");

//     workletNode.port.onmessage = (event) => {
//       socket.emit("audio-input", event.data);
//     };

//     source.connect(workletNode);
//     workletNode.connect(audioContext.destination); // optional

//     refs.current = {
//       audioContext,
//       workletNode,
//       stream,
//     };

//     setRecording(true);
//   }


//   function stopRecording() {
//     refs.current?.workletNode?.disconnect();
//     refs.current?.audioContext?.close();
//     refs.current?.stream?.getTracks().forEach(t => t.stop());
//     setRecording(false);
//   }


//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="w-full max-w-3xl bg-white rounded-xl shadow h-[80vh] flex flex-col">
//         <div className="bg-gray-800 text-white p-3 flex justify-between">
//           <span>Live Interview</span>
//           <button
//             onClick={() => socket.emit("end-session")}
//             className="bg-red-500 px-3 rounded"
//           >
//             <PhoneOff size={14} />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 space-y-2">
//           {messages.map((m, i) => (
//             <div key={i} className="flex gap-2">
//               {m.role === "assistant" ? <Bot /> : <User />}
//               <div>{m.content}</div>
//             </div>
//           ))}
//           {partial && <div className="italic text-gray-500">{partial}</div>}
//         </div>

//         <div className="p-4 flex justify-center">
//           <button
//             onClick={startRecording}
//             className="bg-blue-600 text-white w-14 h-14 rounded-full"
//           >
//             {recording ? <MicOff /> : <Mic />}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }







"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import io from "socket.io-client";
import { Mic, MicOff, PhoneOff, User, Bot } from "lucide-react";

export default function SessionPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const refs = useRef(null);

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [partial, setPartial] = useState("");
  const [recording, setRecording] = useState(false);

  /* ========== AUDIO STREAM PLAYER ========== */

  const audioRef = useRef(null);
  const mediaSourceRef = useRef(null);
  const sourceBufferRef = useRef(null);
  const queueRef = useRef([]);
  const initRef = useRef(false);

  const initAudio = () => {
    if (initRef.current) return;
    initRef.current = true;

    const audio = new Audio();
    const mediaSource = new MediaSource();

    audio.src = URL.createObjectURL(mediaSource);
    audio.autoplay = true;

    mediaSource.addEventListener("sourceopen", () => {
      const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");

      sourceBuffer.addEventListener("updateend", () => {
        if (queueRef.current.length && !sourceBuffer.updating) {
          sourceBuffer.appendBuffer(queueRef.current.shift());
        }
      });

      sourceBufferRef.current = sourceBuffer;
    });

    audio.play();
    audioRef.current = audio;
    mediaSourceRef.current = mediaSource;
  };

  /* ========== SOCKET ========== */

  useEffect(() => {
    const s = io("http://localhost:4000", {
      transports: ["websocket"],
      query: { sessionId: params.id },
    });

    setSocket(s);

    s.on("connect", () => {
      const data = searchParams.get("data");
      if (data) {
        s.emit("join", JSON.parse(decodeURIComponent(data)));
      }
    });

    s.on("transcript", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    s.on("transcript-chunk", (data) => {
      setPartial((prev) => prev + data.content);
    });

    s.on("transcript-done", (msg) => {
      setMessages((prev) => [...prev, msg]);
      setPartial("");
    });

    s.on("audio-chunk", (chunk) => {
      initAudio();

      const data = new Uint8Array(chunk);
      const sb = sourceBufferRef.current;

      if (!sb || sb.updating) {
        queueRef.current.push(data);
      } else {
        sb.appendBuffer(data);
      }
    });

    s.on("session-ended", () => {
      router.push("/interviews/report/" + params.id);
    });

    return () => {
      s.disconnect();
      stopRecording();
    };
  }, [params.id, searchParams, router]);

  /* ========== MIC ========== */

  async function startRecording() {
    if (!socket) return;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const audioContext = new AudioContext({
      sampleRate: 16000,
    });

    await audioContext.audioWorklet.addModule(
      "/audio-worklet-processor.js"
    );

    const source =
      audioContext.createMediaStreamSource(stream);

    const workletNode = new AudioWorkletNode(
      audioContext,
      "pcm-processor"
    );

    workletNode.port.onmessage = (event) => {
      socket.emit("audio-input", event.data);
    };

    source.connect(workletNode);
    workletNode.connect(audioContext.destination);

    refs.current = {
      audioContext,
      workletNode,
      stream,
    };

    setRecording(true);
  }

  function stopRecording() {
    if (!refs.current) return;

    refs.current.workletNode?.disconnect();
    refs.current.audioContext?.close();
    refs.current.stream
      ?.getTracks()
      .forEach((t) => t.stop());

    setRecording(false);
  }

  /* ========== UI ========== */

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow h-[80vh] flex flex-col">
        <div className="bg-gray-800 text-white p-3 flex justify-between">
          <span>Live Interview</span>
          <button
            onClick={() => socket?.emit("end-session")}
            className="bg-red-500 px-3 rounded"
          >
            <PhoneOff size={14} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((m, i) => (
            <div key={i} className="flex gap-2">
              {m.role === "assistant" ? <Bot /> : <User />}
              <div>{m.content}</div>
            </div>
          ))}

          {partial && (
            <div className="italic text-gray-500">
              {partial}
            </div>
          )}
        </div>

        <div className="p-4 flex justify-center">
          <button
            onClick={recording ? stopRecording : startRecording}
            className="bg-blue-600 text-white w-14 h-14 rounded-full"
          >
            {recording ? <MicOff /> : <Mic />}
          </button>
        </div>
      </div>
    </div>
  );
}




