export interface Events {
  id?: string;
  userCreated: string;
  roomId: string;
  description: string;
  initialTime: string | number;
  finalTime: string | number;
  support: {
    computer: boolean;
    projector: boolean;
    coffee: boolean;
    water: boolean;
    speaker: boolean;
    flipChart: boolean;
  };
  ramalNumber: number;
  totalPeople: number;
  userRegistration: number;
  email: string;
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

export interface EventForm {
  userCreated: string;
  roomId: string;
  description: string;
  initialTime: string | number;
  finalTime: string | number;
  support: {
    computer: boolean;
    projector: boolean;
    coffee: boolean;
    water: boolean;
    speaker: boolean;
    flipChart: boolean;
  };
  ramalNumber: number;
  totalPeople: number;
  userRegistration: number;
  email: string;
}
