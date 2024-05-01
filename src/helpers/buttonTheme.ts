import {TextStyle, ViewStyle} from 'react-native';
import {colors} from '../theme/colors';

export type TTypesButton = 'primary' | 'secondary' | 'outlined' | 'transparent';
type TStates = {
  press?: boolean;
  disabled?: boolean;
};

type ButtonTheme = {
  normal: typeof normal;
  pressed: typeof pressed;
  disabled: typeof disabled;
};

// ! Normal

const normal = {
  primary: {
    component: {
      backgroundColor: colors.primary.Base,
      borderWidth: 0,
    } as ViewStyle,
    text: {
      color: colors.white,
    } as TextStyle,
  },
  secondary: {
    component: {
      borderWidth: 0,
      backgroundColor: colors.primary.Lightest,
    } as ViewStyle,
    text: {
      color: colors.primary.Base,
    } as TextStyle,
  },
  outlined: {
    component: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.primary.Base,
    } as ViewStyle,
    text: {
      color: colors.primary.Base,
    } as TextStyle,
  },
  transparent: {
    component: {
      backgroundColor: colors.white,
      borderWidth: 0,
    } as ViewStyle,
    text: {
      color: colors.primary.Base,
    } as TextStyle,
  },
};

// ! Pressed

const pressed = {
  primary: {
    component: {
      backgroundColor: colors.primary.Darkest,
      borderWidth: 0,
    } as ViewStyle,
    text: {
      color: colors.white,
    } as TextStyle,
  },
  secondary: {
    component: {
      borderWidth: 0,
      backgroundColor: colors.primary.Lighter,
    } as ViewStyle,
    text: {
      color: colors.primary.Dark,
    } as TextStyle,
  },
  outlined: {
    component: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.primary.Dark,
    } as ViewStyle,
    text: {
      color: colors.primary.Dark,
    } as TextStyle,
  },
  transparent: {
    component: {
      backgroundColor: colors.primary.Lightest,
      borderWidth: 0,
    } as ViewStyle,
    text: {
      color: colors.primary.Base,
    } as TextStyle,
  },
};

// ! Disabled

const disabled = {
  primary: {
    component: {
      backgroundColor: colors.sky.Light,
      borderWidth: 0,
    } as ViewStyle,
    text: {
      color: colors.sky.Darkest,
    } as TextStyle,
  },
  secondary: {
    component: {
      backgroundColor: colors.sky.Light,
    } as ViewStyle,
    text: {
      color: colors.sky.Darkest,
    } as TextStyle,
  },
  outlined: {
    component: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.sky.Base,
    } as ViewStyle,
    text: {
      color: colors.sky.Base,
    } as TextStyle,
  },
  transparent: {
    component: {
      backgroundColor: colors.white,
      borderWidth: 0,
    } as ViewStyle,
    text: {
      color: colors.sky.Base,
    } as TextStyle,
  },
};

const buttonTheme: ButtonTheme = {
  normal,
  pressed,
  disabled,
};

const determineStateIndex = (state: TStates) => {
  if (state.press) {
    return 'pressed';
  }
  if (state.disabled) {
    return 'disabled';
  }
  return 'normal';
};

export const buttonThemes = (types: TTypesButton, state: TStates) => {
  const index = determineStateIndex(state);

  const styles = {
    ...buttonTheme[index][types],
  };

  return styles;
};
