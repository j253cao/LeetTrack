export const colors = {
  white: "white",
  black: "#000000",
  superLight: "#dddddd",
  background: "#F7FBFF",
  defaultFont: "#626262",
  light: "#b1b1b1",
  buttonBackground: "#2c7be5",
  easy: "#00b8A3",
  medium: "#FFC01E",
  hard: "#FF375F",
};

export const styles = {
  containedButtonBlack: {
    "background": "black",
    "borderRadius": 1,
    "color": "white",
    "&:hover": {
      backgroundColor: "#565656",
    },
  },
  containedButtonWhite: {
    "background": "white",
    "borderRadius": 1,
    "color": "black",
    "&:hover": {
      backgroundColor: "#bfbfbf",
    },
  },
  defaultContainedButton: {
    "background": colors.buttonBackground,
    "borderRadius": 1,
    "color": colors.white,
    "textTransform": "none",
    "&:hover": {
      background: "#0464e0",
    },
    "fontWeight": "bold",
  },
};

export const fonts = {
  default: "'Noto Sans', sans-serif",
};
