export interface Ramal {
  id: string;
  ramalUser: string;
  sectorUser: string;
  ramalNumber: string;
}

type State = {
  ramais: Ramal;
};

export interface RamalStorageConstructor {
  state: State;
  getRamais(): Ramal;
  setRamais(value: Ramal): void;
}
