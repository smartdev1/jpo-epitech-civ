---
name: Neon Protocol
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#bac9cc'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#849396'
  outline-variant: '#3b494c'
  surface-tint: '#00daf3'
  primary: '#c3f5ff'
  on-primary: '#00363d'
  primary-container: '#00e5ff'
  on-primary-container: '#00626e'
  inverse-primary: '#006875'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#b2ffba'
  on-tertiary: '#003915'
  tertiary-container: '#57ec7f'
  on-tertiary-container: '#00682c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#9cf0ff'
  primary-fixed-dim: '#00daf3'
  on-primary-fixed: '#001f24'
  on-primary-fixed-variant: '#004f58'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#6bff8f'
  tertiary-fixed-dim: '#4ae176'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005321'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  terminal-code:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0.05em
  body-main:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
spacing:
  grid-unit: 4px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is engineered for a high-stakes, cybersecurity-themed escape game environment. It captures the tension of an AI lab breach through a sophisticated HUD (Heads-Up Display) aesthetic. The visual language blends **Cyberpunk Brutalism** with **Glassmorphism**, creating an interface that feels like a physical piece of futuristic hardware.

The brand personality is cold, precise, and mysterious. It targets a tech-savvy audience, evoking an emotional response of "controlled urgency." High-contrast accents against a light-absorbing background focus the user's attention on critical mission data, while luminous glows suggest an active power source behind the glass.

## Colors

The palette is strictly dark-mode to simulate a control room environment. 
- **Core Background:** Deep Black (#09090B) provides the void-like canvas.
- **Surface Elevation:** Midnight Blue (#111827) with 60-80% opacity for glass layers.
- **Primary Action:** Electric Cyan (#00E5FF) used for critical HUD elements and interactive triggers.
- **Specialized Data:** Violet (#8B5CF6) denotes secondary encryption tasks or AI-related hints.
- **Functional States:** Neon Green for "Decrypted/Success" and Pure Red for "Breach/Error."

All accent colors must employ a `0 0 15px` outer glow (bloom effect) when in an active state to simulate a neon hardware interface.

## Typography

This design system utilizes a tri-font hierarchy to balance technical precision with readability:
1. **Space Grotesk (Headers):** High-tech, geometric curves used for mission titles and major HUD readouts.
2. **Geist (Body):** A minimalist, highly legible sans-serif for narrative text and mission descriptions.
3. **JetBrains Mono (Data/Labels):** A monospaced font used for all interactive inputs, timers, and "system" feedback to reinforce the terminal aesthetic.

Text should rarely be pure white (#FFFFFF); use a light gray (#E2E8F0) for body text to reduce eye strain, reserving pure white for high-priority display headers.

## Layout & Spacing

The layout follows a **Fluid HUD Grid**. Elements are positioned with strict 4px increments to maintain a mathematical, engineered feel. 

- **Mobile:** A single-column layout with 20px side margins. Elements often use "bracket" borders rather than full boxes to maximize screen real estate.
- **Desktop:** A 12-column grid. Sidebars are reserved for "Mission Status" and "System Logs," while the center remains the "Operation Theater."
- **Rhythm:** Use "Stack" spacing (16px/32px) for vertical flow. Sections are separated by thin horizontal rules with 0.5px thickness and 20% opacity Cyan.

## Elevation & Depth

Depth is conveyed through **Luminous Glassmorphism**. This design system avoids traditional drop shadows in favor of light-based depth.

- **Base Layer:** Deep Black.
- **Mid Layer (Cards/Panels):** Midnight Blue at 70% opacity with a `backdrop-filter: blur(12px)`. Borders are 1px solid white at 10% opacity.
- **Top Layer (Modals/Popups):** Midnight Blue at 90% opacity. Borders are 1.5px solid Electric Cyan with a `0 0 10px` cyan outer glow.
- **Interactive Depth:** When a user hovers over a glass element, the border opacity should increase from 10% to 50%.

## Shapes

The shape language is **Sharp and Geometric**. To reinforce the "high-tech hardware" feel, the system uses a 0px border-radius across all primary components. 

For specialized UI elements like "Fragment Badges" or "Hint Cards," use **clipped corners** (45-degree chamfers) rather than curves. This evokes a military/industrial aesthetic typical of advanced AI lab interfaces.

## Components

### Primary Neon Buttons
Large, sharp-edged buttons. Background is transparent with a 2px solid Electric Cyan border. On hover, the background fills with Cyan (20% opacity) and a high-intensity bloom effect triggers on the border. Text is JetBrains Mono, All-Caps.

### Future-HUD Cards
Glassmorphic containers with a "Top-Left" corner accent—a small Cyan square or bracket. These cards house mission data. They feature a 1px border that is only visible on the top and left sides to create a "shadow-less" depth.

### Terminal-style Input Fields
Underlined inputs rather than boxes. When focused, the underline pulses in Cyan. A blinking cursor block (`_`) should appear at the end of the input string. Font: JetBrains Mono.

### Mission Status HUD
A fixed header or floating bar containing:
- **Timer:** High-contrast White monospaced digits. If time < 1 minute, the color shifts to Error Red with a pulsing animation.
- **Fragment Tracker:** An animated progress bar divided into discrete "segments" or "blocks." Filled blocks are Violet; empty blocks are dark gray outlines.

### Success Modals
Full-screen blur overlay. The modal appears with a "glitch" entry animation. A central Neon Green checkmark icon is surrounded by rotating geometric rings (SVG animation) to signify a successful decryption.