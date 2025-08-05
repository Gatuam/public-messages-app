import { Message } from "@/models/User";

export interface ApiResponse {
    success : boolean,
    message : string,
    isAccpectingMessage? : boolean,
    messages? : Array<Message>
}