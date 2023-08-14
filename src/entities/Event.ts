export interface Event {
  date: string;
  id: number;
  scheduler: string;
  time: string;
  duration: number;
  description: string;
  roomId: number;
}

export interface Room {
  id: number;
  name: string;
  color: string;
}
