export interface Event {
  id: string;
  userCreated: string;
  roomId: string;
  description: string;
  initialTime: string | number;
  finalTime: string | number;
  support: {
    options1: any;
    options2: any;
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
