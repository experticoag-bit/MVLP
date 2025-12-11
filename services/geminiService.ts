import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Streams AI edits or suggestions based on current text and an instruction.
 */
export const streamAIEdit = async (
  currentText: string,
  instruction: string,
  onChunk: (text: string) => void
): Promise<void> => {
  const model = "gemini-2.5-flash"; // Optimized for speed/text tasks
  
  const prompt = `
    You are an expert AI writing assistant. 
    
    Current Document Content:
    """
    ${currentText}
    """
    
    User Instruction: ${instruction}
    
    Provide a response that directly addresses the instruction. 
    If asked to rewrite, return the rewritten text. 
    If asked to summarize, return the summary.
    If asked a question, answer it based on the text.
    Do not add conversational filler like "Here is the text". Just the result.
  `;

  try {
    const responseStream = await ai.models.generateContentStream({
      model,
      contents: prompt,
    });

    for await (const chunk of responseStream) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        onChunk(c.text);
      }
    }
  } catch (error) {
    console.error("Gemini Stream Error:", error);
    throw error;
  }
};

/**
 * Generates a quick completion or fix (non-streaming)
 */
export const generateQuickFix = async (text: string, type: 'grammar' | 'shorter' | 'longer'): Promise<string> => {
    const model = "gemini-2.5-flash";
    
    let instruction = "";
    switch(type) {
        case 'grammar': instruction = "Fix grammar and spelling errors. Maintain tone."; break;
        case 'shorter': instruction = "Summarize this text concisely."; break;
        case 'longer': instruction = "Expand on this text with more descriptive language and detail."; break;
    }

    const prompt = `Original Text: "${text}"\n\nTask: ${instruction}\n\nReturn only the processed text.`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt
    });

    return response.text || "";
}

/**
 * Generates a structured study plan for the LMS
 */
export const generateStudyPlan = async (
  subject: string,
  title: string,
  date: string,
  materials: string,
  contentTypes: string[]
): Promise<string> => {
  const model = "gemini-2.5-flash";
  const prompt = `
    Create a comprehensive study plan for a student.
    Subject: ${subject}
    Exam Title: ${title}
    Exam Date: ${date}
    
    Materials/Topics provided:
    ${materials}
    
    Requested Content Types: ${contentTypes.join(', ')}
    
    For each requested content type, generate specific high-quality content.
    Use the following format strictly to separate sections:
    
    :::SECTION: [type]:::
    [Content for that section]
    
    The types correspond to:
    - 'plan' (Structured timeline)
    - 'solutions_practice' (Step-by-step solutions and practice problems)
    - 'summary' (Deep dive summary)
    - 'flashcards' (Q&A format: "Q: Question | A: Answer")
    - 'audio_script' (Podcast script between Host and Expert)
    - 'mock_exam' (Simulation questions)
    
    Generate content now.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt
    });
    return response.text || "Fehler bei der Generierung.";
  } catch (error) {
    console.error("Study Plan Generation Error:", error);
    return "Es ist ein Fehler aufgetreten. Bitte versuche es erneut.";
  }
}