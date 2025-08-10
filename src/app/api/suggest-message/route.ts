import { anthropic } from "@ai-sdk/anthropic";
import { streamText,} from "ai";
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
    if(!result){
      return Response.json({
        success : false,
        message : 'stream error may be token is not enough'
      })
    }
    return result.toTextStreamResponse();
  }catch (error : any) {
  if (error.message.includes('Web search failed')) {
    console.log('Search error:', error.message);
    return Response.json({
      success : false,
      message : 'Error while send api'
    });
  }
}
}
