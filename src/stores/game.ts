import { defineStore } from 'pinia'
import { FINAL_CHECKPOINT, FINAL_WORD, type GameState } from '@/types/game'
import { FRAGMENTS } from '@/data/fragments'
import { createInitialState, loadState, saveState, clearState } from '@/utils/storage'
import { generateScanToken } from '@/utils/token'

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

    createTeam(teamName: string) {
      this.team = { teamName, startTime: new Date().toISOString() }
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

    /** Mints a one-time proof-of-scan token for the given step. Only the in-app scanner calls this. */
    issueScanToken(step: number): string {
      const token = generateScanToken()
      this.scanToken = token
      this.scanTokenStep = step
      this.persist()
      return token
    },

    /** Consumes a proof-of-scan token, unlocking that step's puzzle route. Fails silently on mismatch. */
    consumeScanToken(step: number, token: string): boolean {
      const valid = Boolean(token) && this.scanToken === token && this.scanTokenStep === step
      if (valid) {
        this.unlockedStep = step
        this.scanToken = null
        this.scanTokenStep = null
        this.persist()
      }
      return valid
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

    /** Checks the 5 re-entered fragment words. Does not complete the mission by itself. */
    verifyFragments(answers: string[]): boolean {
      this.attempts++
      const allCorrect = FRAGMENTS.every((fragment, index) => normalize(answers[index] ?? '') === normalize(fragment.answer))
      this.persist()
      return allCorrect
    },

    /** Checks the deduced master word (what links all 5 fragments). Completes the mission. */
    submitMasterKey(word: string): boolean {
      this.attempts++
      const correct = normalize(word) === normalize(FINAL_WORD)
      if (correct) {
        this.finalValidated = true
        this.completed = true
      }
      this.persist()
      return correct
    },

    resetGame() {
      clearState()
      this.$patch(createInitialState())
    },
  },
})

export { FINAL_WORD }
