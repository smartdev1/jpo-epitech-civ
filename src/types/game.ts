export interface TeamInfo {
  teamName: string
  players: number
  startTime: string
}

export type FragmentType = 'charade' | 'images' | 'riddle' | 'rebus' | 'logic'

export interface FragmentImage {
  icon: string
  label: string
}

export interface Fragment {
  id: number
  key: string
  title: string
  type: FragmentType
  prompt: string
  images?: FragmentImage[]
  rebus?: string[]
  answer: string
  successPercent: number
  hint: string
}

export interface GameState {
  team: TeamInfo
  currentStep: number
  fragmentsFound: string[]
  attempts: number
  startTime: string
  completed: boolean
  finalValidated: boolean
}

export const TOTAL_FRAGMENTS = 5
export const FINAL_CHECKPOINT = TOTAL_FRAGMENTS + 1
export const FINAL_WORD = 'LOGICIEL'
