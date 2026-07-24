import type { Component } from 'vue'
import IconChild from './IconChild.vue'
import IconCodeScreen from './IconCodeScreen.vue'
import IconRobot from './IconRobot.vue'
import IconPuzzle from './IconPuzzle.vue'
import IconSpeak from './IconSpeak.vue'
import IconLaptop from './IconLaptop.vue'

export const PUZZLE_ICONS: Record<string, Component> = {
  child: IconChild,
  codeScreen: IconCodeScreen,
  robot: IconRobot,
  puzzle: IconPuzzle,
  speak: IconSpeak,
  laptop: IconLaptop,
}
