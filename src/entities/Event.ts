export interface Event {
  userCreated: string;
  roomId: string;
  description: string;
  initialTime: string;
  finalTime: string;
  suport: {
    computer: boolean;
    projector: boolean;
    coffee: boolean;
    water: boolean;
  };
}

export interface Room {
  id: number;
  name: string;
  color: string;
}
