import type { Component } from 'vue'
import IconMonitor from './IconMonitor.vue'
import IconCalendar from './IconCalendar.vue'
import IconPlay from './IconPlay.vue'
import IconDeveloper from './IconDeveloper.vue'
import IconSpeak from './IconSpeak.vue'
import IconLaptop from './IconLaptop.vue'

export const PUZZLE_ICONS: Record<string, Component> = {
  monitor: IconMonitor,
  calendar: IconCalendar,
  play: IconPlay,
  developer: IconDeveloper,
  speak: IconSpeak,
  laptop: IconLaptop,
}
