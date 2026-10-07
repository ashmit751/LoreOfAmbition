declare module 'nativewind/jsx-runtime' {
  export const Fragment: typeof import('react/jsx-runtime').Fragment;
  export const jsx: typeof import('react/jsx-runtime').jsx;
  export const jsxs: typeof import('react/jsx-runtime').jsxs;
  export const jsxDEV: typeof import('react/jsx-runtime').jsxDEV;

  namespace JSX {
    interface IntrinsicAttributes {
      key?: string | number | null | undefined;
      ref?: any;
    }
  }
}



