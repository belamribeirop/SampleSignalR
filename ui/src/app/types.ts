export type ChatMessage = {
  text: string;
  dateTime: Date;
  connectionId: string;
  roomName?: string;
  username: string;
};
