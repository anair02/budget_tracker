import {create} from 'zustand';

const useDeckStorage = create(set => ({
  deckStorage: [],
  setDeck: (deckStorage) => set({deckStorage}),
  // updateDeckStorage: () => 
  updateDeck: (deck_id, deck_name) => set((state) => (
    {
      deckStorage: state.deckStorage.map((deck) => {
        if (deck.deck_id === deck_id) {
          return {
            ...deck,
            deck_name : deck_name
          }
        }
        return deck
      })
    }
  )),

}));
export default useDeckStorage