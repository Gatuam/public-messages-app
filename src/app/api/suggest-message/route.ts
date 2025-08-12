import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import prompt from "./prompt";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const result = streamText({
      model: anthropic("claude-3-5-haiku-20241022"),
      prompt,
      maxOutputTokens: 400,
      temperature: 0.2,
    });

    if (!result) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "stream error may be token is not enough",
        }),
        { status: 500 }
      );
    }

    return result.toTextStreamResponse();
  } catch (error: any) {
    if (error.message.includes("Web search failed")) {
      console.log("Search error:", error.message);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Error while sending API",
        }),
        { status: 500 }
      );
    }
    return new Response(
      JSON.stringify({
        success: false,
        message: "Unknown error occurred",
      }),
      { status: 500 }
    );
  }
}
