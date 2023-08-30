export interface Event {
  id: string;
  userCreated: string;
  roomId: string;
  description: string;
  initialTime: number;
  finalTime: number;
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

export interface EventTimes {
  hour: number;
  initial: {
    value: number;
    available: boolean;
  };
  half: {
    value: number;
    available: boolean;
  };
}
