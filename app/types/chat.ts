export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatRequest {
  message: string;
  history: Message[];
}

export interface ChatResponse {
  response: string;
  mood?: string;
  timestamp: number;
}
