import { defineStore } from 'pinia'
import { FINAL_CHECKPOINT, FINAL_WORD, type GameState } from '@/types/game'
import { FRAGMENTS } from '@/data/fragments'
import { createInitialState, loadState, saveState, clearState } from '@/utils/storage'

function normalize(value: string): string {
  return value
    .trim()
    .toUpperCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ')
}

export const useGameStore = defineStore('game', {
  state: (): GameState => loadState(),

  getters: {
    fragmentsCount: (state) => state.fragmentsFound.length,
    isFragmentUnlocked: (state) => (fragmentId: number) => state.currentStep === fragmentId,
    isFragmentDone: (state) => (key: string) => state.fragmentsFound.includes(key),
    isFinalReady: (state) => state.currentStep === FINAL_CHECKPOINT,
  },

  actions: {
    persist() {
      saveState(this.$state)
    },

    createTeam(teamName: string, players: number) {
      this.team = { teamName, players, startTime: new Date().toISOString() }
      this.persist()
    },

    startMission() {
      if (!this.startTime) {
        this.startTime = new Date().toISOString()
        this.persist()
      }
    },

    /** Returns true if the checkpoint matches the next expected step. */
    attemptCheckpoint(step: number): boolean {
      const granted = step === this.currentStep
      if (!granted) {
        this.attempts++
        this.persist()
      }
      return granted
    },

    submitFragmentAnswer(fragmentId: number, answer: string): boolean {
      const fragment = FRAGMENTS.find((f) => f.id === fragmentId)
      if (!fragment) return false
      const correct = normalize(answer) === normalize(fragment.answer)
      this.attempts++
      if (correct && this.currentStep === fragmentId) {
        this.fragmentsFound.push(fragment.key)
        this.currentStep++
      }
      this.persist()
      return correct
    },

    submitFinal(answers: string[]): boolean {
      this.attempts++
      const allCorrect = FRAGMENTS.every((fragment, index) => normalize(answers[index] ?? '') === normalize(fragment.answer))
      if (allCorrect) {
        this.finalValidated = true
        this.completed = true
      }
      this.persist()
      return allCorrect
    },

    resetGame() {
      clearState()
      this.$patch(createInitialState())
    },
  },
})

export { FINAL_WORD }
