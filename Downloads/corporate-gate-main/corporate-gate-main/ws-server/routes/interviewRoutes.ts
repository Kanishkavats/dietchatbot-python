router.post("/start", startInterviewWithTTS);
router.post("/next", nextQuestionWithTTS);
router.post("/submit", submitInterview);
router.post("/save-transcript", saveTranscript);
router.post("/export-pdf", exportInterviewReport);
router.get("/session/:sessionId", getSession);
