import {create} from 'zustand';

const useFlashcardStorage = create(set => ({
  flashcardStorage: [],
  setFlashcardStorage: (flashcardStorage) => set({flashcardStorage}),
  // updateDeckStorage: () => 
  updateFlashcardFrontPage: (cardId, frontPage) => set((state) => (
    {
      flashcardStorage: state.flashcardStorage.map((flashcard) => {
        if (flashcard.card_id === cardId) {
          return {
            ...flashcard,
            front_text: frontPage
          }
        }
        return flashcard
      })
    }
  )),
  updateFlashcardBackPage: (cardId, backPage) => set((state) => (
    {
      flashcardStorage: state.flashcardStorage.map((flashcard) => {
        if (flashcard.card_id === cardId) {
          return {
            ...flashcard,
            back_text: backPage
          }
        }
        return flashcard
      })
    }
  )),
  updateFlashcardTimeStamp: (cardId, timestamp) => set((state) => (
    {
      flashcardStorage: state.flashcardStorage.map((flashcard) => {
        if (flashcard.card_id === cardId) {
          return {
            ...flashcard,
            card_creation_date: timestamp
          }
        }
        return flashcard
      })
    }
  )),
  removeFlashcard: (cardId) => set((state) => (
    {
      flashcardStorage: state.flashcardStorage.filter(flashcard => flashcard.card_id != cardId)
    }
  )),

}));
export default useFlashcardStorage