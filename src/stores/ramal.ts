import { defineStore } from "pinia";

interface RamalStore {
  id: string;
  ramal_user: string;
  sector_user: string;
  ramal_number: string;
}
function buildRamal(ramal: RamalStore): RamalStore {
  if (ramal != null) {
    const { ramal_user, id, sector_user, ramal_number } = ramal;
    return {
      ramal_user,
      id,
      sector_user,
      ramal_number,
    };
  }
  return null;
}

const Ramal = defineStore("Ramal", {
  state: () => ({
    ramal: buildRamal(null),
  }),
  getters: {
    getId: (state) => {
      return state.ramal?.id;
    },
    getName: (state) => {
      return state.ramal?.ramal_user;
    },
    getNumber: (state) => {
      return state.ramal?.ramal_number;
    },
    getSector: (state) => {
      return state.ramal?.sector_user;
    },
    getRamal: (state) => {
      return state.ramal;
    },
  },
  actions: {
    setRamal(value: RamalStore) {
      this.ramal = buildRamal(value);
    },
  },
  persist: true,
});
export const ramalStorage = Ramal();
