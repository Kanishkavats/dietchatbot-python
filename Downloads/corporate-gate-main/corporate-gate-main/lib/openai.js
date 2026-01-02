
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import client from "openai";
// import OpenAI from "openai";
// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function askLLM(messages: any[]) {
//   const stream = await openai.chat.completions.create({
//     //  const stream= await client.responses.create({
//     // model: "gpt-4o-mini",
//     model: "gpt-4-turbo",

//     messages: messages,
//     stream: true,
//   });

//   async function* generator() {
//     for await (const chunk of stream) {
//       const content = chunk.choices[0]?.delta?.content || "";
//       if (content) yield content;
//     }
//   }

//   return generator();

  
// }



// export async function evaluateInterview(context: any, history: any[]) {
//   const schema = {
//     evaluation: {
//       overallScore: 0,
//       dimensions: {
//         communication: 0,
//         technical: 0,
//         problemSolving: 0,
//         cultureFit: 0,
//       },
//       strengths: ["string"],
//       weaknesses: ["string"],
//       summary: "string",
//     },
//     answers: [
//       {
//         question: "string",
//         answer: "string",
//         feedback: "string",
//         score: 0,
//       },
//     ],
//   };

//   const res = await client.chat.completions.create({
//     model: "gpt-4-turbo",
//     response_format: { type: "json_object" },
//     messages: [
//       {
//         role: "system",
//         content: `Evaluate the interview based on the context and history. 
//         Return a valid JSON object matching this schema: ${JSON.stringify(schema)}.

//         - 'answers' array should extract the Q&A pairs from history.
//         - Scores should be 0-100 for overall/dimensions, 0-10 for individual answers.
//         - Be constructive in feedback.`,
//       },
//       {
//         role: "user",
//         content: JSON.stringify({ context, history }),
//       },
//     ],
//   });

//   return JSON.parse(res.choices[0].message.content!);
// }



import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askLLM(messages) {
  const stream = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: messages,
    stream: true,
  });

  async function* generator() {
    for await (const chunk of stream) {
      const content =
        chunk.choices[0]?.delta?.content || "";
      if (content) yield content;
    }
  }

  return generator();
}

export async function evaluateInterview(context, history) {
  const schema = {
    evaluation: {
      overallScore: 0,
      dimensions: {
        communication: 0,
        technical: 0,
        problemSolving: 0,
        cultureFit: 0,
      },
      strengths: ["string"],
      weaknesses: ["string"],
      summary: "string",
    },
    answers: [
      {
        question: "string",
        answer: "string",
        feedback: "string",
        score: 0,
      },
    ],
  };

  const res = await client.chat.completions.create({
    model: "gpt-4-turbo",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `Evaluate the interview based on the context and history.
Return a valid JSON object matching this schema: ${JSON.stringify(schema)}.

- 'answers' array should extract the Q&A pairs from history.
- Scores should be 0-100 for overall/dimensions, 0-10 for individual answers.
- Be constructive in feedback.`,
      },
      {
        role: "user",
        content: JSON.stringify({ context, history }),
      },
    ],
  });

  return JSON.parse(res.choices[0].message.content);
}
