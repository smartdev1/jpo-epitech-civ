export interface TeamInfo {
  teamName: string
  startTime: string
}

export type FragmentType = 'charade' | 'images' | 'riddle' | 'rebus' | 'logic'

export interface FragmentImage {
  iconKey: string
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
  scanToken: string | null
  scanTokenStep: number | null
  unlockedStep: number
}

export const TOTAL_FRAGMENTS = 5
export const FINAL_CHECKPOINT = TOTAL_FRAGMENTS + 1
export const FINAL_WORD = 'LOGICIEL'
export const MISSION_DURATION_SECONDS = 15 * 60
export const CRITICAL_TIME_SECONDS = 10
