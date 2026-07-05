/**
 * constants/icons.tsx
 *
 * Central registry of every icon/image asset used across the app.
 *
 * NOTE: adjust the require() paths below to match wherever you drop the
 * cropped PNGs in your project (this assumes an `assets/icons/` folder
 * at the project root — a common Expo layout — reached here via `../assets/icons/`
 * from a `constants/` folder). Rename the files to match, or update the
 * paths — either works, TypeScript won't care.
 */

import { ImageSourcePropType } from 'react-native';

// -----------------------------------------------------------------------
// App Icon
// -----------------------------------------------------------------------
export const APP_ICON: ImageSourcePropType = require('../assets/icons/app_icon.png');

// -----------------------------------------------------------------------
// Bottom Nav / Navigation Icons
// -----------------------------------------------------------------------
export const NAV_ICONS = {
  home: require('../assets/icons/nav_home.png'),
  discover: require('../assets/icons/nav_discover.png'),
  create: require('../assets/icons/nav_create.png'),
  challenges: require('../assets/icons/nav_challenges.png'),
  profile: require('../assets/icons/nav_potfiio.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type NavIconKey = keyof typeof NAV_ICONS;

// -----------------------------------------------------------------------
// Status Indicators
// Rendered as small solid dots — a hex color is more useful here than a
// bitmap (crisp at any size, easy to theme). Swap in STATUS_ICONS below
// instead if you'd rather use the cropped dot+label images directly.
// -----------------------------------------------------------------------
export const STATUS_COLORS = {
  active: '#22C55E',
  online: '#14B8A6',
  offline: '#1E1B4B',
} as const;

export type StatusKey = keyof typeof STATUS_COLORS;

// Optional: the cropped dot+label PNGs (215x44 each) if you want the image
// version instead of drawing your own dot with STATUS_COLORS.
export const STATUS_ICONS = {
  active: require('../assets/icons/status_active.png'),
  online: require('../assets/icons/status_online.png'),
  offline: require('../assets/icons/status_offline.png'),
} as const satisfies Record<StatusKey, ImageSourcePropType>;

// -----------------------------------------------------------------------
// Top Bar Icons
// -----------------------------------------------------------------------
export const TOP_BAR_ICONS = {
  search: require('../assets/icons/topbar_search.png'),
  bell: require('../assets/icons/topbar_bell.png'),
  menu: require('../assets/icons/topbar_menu.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type TopBarIconKey = keyof typeof TOP_BAR_ICONS;

// -----------------------------------------------------------------------
// Action Icons
// -----------------------------------------------------------------------
export const ACTION_ICONS = {
  heart: require('../assets/icons/action_heart.png'),
  gem: require('../assets/icons/action_gem.png'),
  send: require('../assets/icons/action_paperplane.png'),
  bookmark: require('../assets/icons/action_bookmark.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type ActionIconKey = keyof typeof ACTION_ICONS;

// -----------------------------------------------------------------------
// Badges
// -----------------------------------------------------------------------
export const BADGE_ICONS = {
  streak: require('../assets/icons/badge_streak.png'),
  consistent: require('../assets/icons/badge_consistent.png'),
  builder: require('../assets/icons/badge_builder.png'),
  focused: require('../assets/icons/badge_focused.png'),
  topCreator: require('../assets/icons/badge_topcreator.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type BadgeKey = keyof typeof BADGE_ICONS;

// -----------------------------------------------------------------------
// Challenge Icons
// -----------------------------------------------------------------------
export const CHALLENGE_ICONS = {
  fire: require('../assets/icons/challenge_fire.png'),
  mountain: require('../assets/icons/challenge_mountain.png'),
  target: require('../assets/icons/challenge_target.png'),
  lightning: require('../assets/icons/challenge_lightning.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type ChallengeIconKey = keyof typeof CHALLENGE_ICONS;

// -----------------------------------------------------------------------
// Content Type Icons
// -----------------------------------------------------------------------
export const CONTENT_TYPE_ICONS = {
  post: require('../assets/icons/content_post.png'),
  bulletin: require('../assets/icons/content_bulletin.png'),
  challenge: require('../assets/icons/content_challenge.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type ContentTypeIconKey = keyof typeof CONTENT_TYPE_ICONS;

// -----------------------------------------------------------------------
// Avatar Styles (examples)
// -----------------------------------------------------------------------
export const AVATAR_STYLES = {
  wave: require('../assets/icons/avatar_wave.png'),
  explorer: require('../assets/icons/avatar_hat.png'),
  beard: require('../assets/icons/avatar_beard.png'),
  owl: require('../assets/icons/avatar_owl.png'),
  moon: require('../assets/icons/avatar_moon.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type AvatarStyleKey = keyof typeof AVATAR_STYLES;

// -----------------------------------------------------------------------
// Loading Animation
// -----------------------------------------------------------------------
export const LOADING_ANIMATION: ImageSourcePropType = require('../assets/icons/loading_animation.png');

// -----------------------------------------------------------------------
// Color Palette
// Sampled directly from the swatches you generated.
// -----------------------------------------------------------------------
export const COLOR_PALETTE = [
  '#193A70',
  '#202F50',
  '#10385B',
  '#B0B2BE',
  '#420C2C',
  '#A26E32',
  '#2C5326',
] as const;

// -----------------------------------------------------------------------
// Logo Mark Variations
// -----------------------------------------------------------------------
export const LOGO_MARKS = {
  minimal: require('../assets/icons/logo_mark_1.png'),
  wordmarkFull: require('../assets/icons/logo_mark_2.png'),
  compass: require('../assets/icons/logo_mark_3.png'),
  wordmark: require('../assets/icons/logo_mark_4.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type LogoMarkKey = keyof typeof LOGO_MARKS;

// -----------------------------------------------------------------------
// Convenience: everything in one place, if you ever need to iterate
// over all icon groups at once (e.g. a debug/preview screen).
// -----------------------------------------------------------------------
export const ICONS = {
  appIcon: APP_ICON,
  nav: NAV_ICONS,
  status: STATUS_ICONS,
  topBar: TOP_BAR_ICONS,
  action: ACTION_ICONS,
  badge: BADGE_ICONS,
  challenge: CHALLENGE_ICONS,
  contentType: CONTENT_TYPE_ICONS,
  avatar: AVATAR_STYLES,
  loading: LOADING_ANIMATION,
  logoMarks: LOGO_MARKS,
} as const;