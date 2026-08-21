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
export const APP_ICON: ImageSourcePropType = require('../assets/logo/app-icon.png');

// -----------------------------------------------------------------------
// Bottom Nav / Navigation Icons
// -----------------------------------------------------------------------
export const NAV_ICONS = {
  home: require('../assets/icons/navigation/home-icon.png'),
  discover: require('../assets/icons/navigation/discover-icon.png'),
  create: require('../assets/icons/navigation/create-icon.png'),
  challenges: require('../assets/icons/navigation/challenges-icon.png'),
  profile: require('../assets/icons/navigation/profile-icon.png'),
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
  active: require('../assets/icons/status/status_active_215x44.png'),
  online: require('../assets/icons/status/status_online_215x44.png'),
  offline: require('../assets/icons/status/status_offline_215x44.png'),
} as const satisfies Record<StatusKey, ImageSourcePropType>;

// -----------------------------------------------------------------------
// Top Bar Icons
// -----------------------------------------------------------------------
export const TOP_BAR_ICONS = {
  search: require('../assets/icons/topbar/topbar-search.png'),
  notifications: require('../assets/icons/topbar/topbar-bell.png'),
  menu: require('../assets/icons/topbar/topbar-menu.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type TopBarIconKey = keyof typeof TOP_BAR_ICONS;

// -----------------------------------------------------------------------
// Action Icons
// -----------------------------------------------------------------------
export const ACTION_ICONS = {
  like: require('../assets/icons/actions/action-like.png'),
  comment: require('../assets/icons/actions/action-comment.png'),
  share: require('../assets/icons/actions/action-share.png'),
  save: require('../assets/icons/actions/action-save.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type ActionIconKey = keyof typeof ACTION_ICONS;

// -----------------------------------------------------------------------
// Badges
// -----------------------------------------------------------------------
export const BADGE_ICONS = {
  streak: require('../assets/badges/15a_badge_streak_196x43.png'),
  consistent: require('../assets/badges/15b_badge_consistent_196x43.png'),
  builder: require('../assets/badges/15c_badge_builder_196x43.png'),
  focused: require('../assets/badges/15d_badge_focused_196x45.png'),
  topCreator: require('../assets/badges/15e_badge_topcreator_196x42.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type BadgeKey = keyof typeof BADGE_ICONS;

// -----------------------------------------------------------------------
// Challenge Icons
// -----------------------------------------------------------------------
export const CHALLENGE_ICONS = {
  fire: require('../assets/challenges/16_challenge_fire_78x93.png'),
  mountain: require('../assets/challenges/17_challenge_mountain_83x93.png'),
  target: require('../assets/challenges/18_challenge_target_83x93.png'),
  lightning: require('../assets/challenges/19_challenge_lightning_68x93.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type ChallengeIconKey = keyof typeof CHALLENGE_ICONS;

// -----------------------------------------------------------------------
// Content Type Icons
// -----------------------------------------------------------------------
export const CONTENT_TYPE_ICONS = {
  post: require('../assets/icons/content/20_content_post_73x100.png'),
  bulletin: require('../assets/icons/content/21_content_bulletin_78x100.png'),
  challenge: require('../assets/icons/content/22_content_challenge_78x100.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type ContentTypeIconKey = keyof typeof CONTENT_TYPE_ICONS;

// -----------------------------------------------------------------------
// Avatar Styles (examples)
// -----------------------------------------------------------------------
export const AVATAR_STYLES = {
  wave: require('../assets/avatars/23_avatar_wave_93x108.png'),
  explorer: require('../assets/avatars/24_avatar_hat_93x108.png'),
  beard: require('../assets/avatars/25_avatar_beard_93x108.png'),
  owl: require('../assets/avatars/26_avatar_owl_93x108.png'),
  moon: require('../assets/avatars/27_avatar_moon_93x108.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export type AvatarStyleKey = keyof typeof AVATAR_STYLES;

// -----------------------------------------------------------------------
// Loading Animation
// -----------------------------------------------------------------------

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
  minimal: require('../assets/logo/app-icon.png'),
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
  //loading: LOADING_ANIMATION,
  logoMarks: LOGO_MARKS,
} as const;
