export interface Ramal {
  id: string;
  ramal_user: string;
  sector_user: string;
  ramal_number: string;
}

type State = {
  ramais: Ramal;
};

export interface RamalStorageConstructor {
  state: State;
  getRamais(): Ramal;
  setRamais(value: Ramal): void;
}
