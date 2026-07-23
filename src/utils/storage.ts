import type { GameState } from '@/types/game'

export const STORAGE_KEY = 'epitech-void-save'

export function createInitialState(): GameState {
  return {
    team: { teamName: '', players: 0, startTime: '' },
    currentStep: 1,
    fragmentsFound: [],
    attempts: 0,
    startTime: '',
    completed: false,
    finalValidated: false,
  }
}

export function loadState(): GameState {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return createInitialState()
  try {
    const parsed = JSON.parse(raw)
    return { ...createInitialState(), ...parsed, team: { ...createInitialState().team, ...parsed.team } }
  } catch {
    return createInitialState()
  }
}

export function saveState(state: GameState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function clearState(): void {
  localStorage.removeItem(STORAGE_KEY)
}
