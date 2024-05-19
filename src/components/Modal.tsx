import {
  StyleSheet,
  View,
  Modal as NativeModal,
  Pressable,
  StyleProp,
  ViewStyle,
  Text,
  Image,
  ImageSourcePropType,
} from 'react-native';
import React, {
  ForwardRefRenderFunction,
  forwardRef,
  isValidElement,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {colors} from 'theme/colors';
import {windowWidth} from 'theme/consts.styles';
import {Buttons, IButton} from './Buttons';
import {TypographyStyles} from 'theme/typography';

interface IModalButtons extends IButton {}

export interface IModal {
  title?: string;
  subTitle?: string | React.ReactNode;
  buttons?: IModalButtons[];
  closeable?: boolean;
  wrapperStyle?: StyleProp<ViewStyle>;
  imageSize?: 'small' | 'medium' | 'large';
  source?: ImageSourcePropType | undefined;
  modalStyle?: StyleProp<ViewStyle>;
  defaultOpen:boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

export interface IModalRefCallbacks {
  open: () => void;
  close: () => void;
  state: boolean;
}
const Modal: ForwardRefRenderFunction<IModalRefCallbacks, IModal> = (
  props,
  ref,
) => {
  const {
    children,
    closeable,
    modalStyle,
    wrapperStyle,
    defaultOpen,
    onClose,
    buttons,
    subTitle,
    imageSize = 'medium',
    source,
    title,
  } = props;
  const [visible, setVisible] = useState<boolean>(!!defaultOpen);

  const isElement = isValidElement(subTitle);

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
    state: visible,
  }));

  const closeModal = () => {
    setVisible(false);
    onClose?.();
  };

  const renderButtons = useCallback(
    (buttonContext: IModalButtons, index: number) => {
      return <Buttons key={index} {...buttonContext} />;
    },
    [],
  );

  const renderSubTitle = () => {
    if (!subTitle) {
      return null;
    }

    if (isElement) {
      return subTitle;
    }
    return <Text style={[styles.subtitle]}>{subTitle}</Text>;
  };

  return (
    <NativeModal
      onRequestClose={closeModal}
      onDismiss={closeModal}
      animationType="fade"
      statusBarTranslucent
      transparent
      visible={visible}>
      <Pressable
        disabled={!closeable}
        onPress={() => (ref as {current: IModalRefCallbacks})?.current?.close()}
        style={[styles.background, modalStyle]}>
        <View
          style={[
            styles.view,
            imageSize === 'large' && {paddingTop: 0},
            wrapperStyle,
          ]}>
          {source ? (
            <Image
              style={[styles.image, styles[`${imageSize}Image`]]}
              source={source}
            />
          ) : null}
          {title ? (
            <Text
              style={[
                TypographyStyles.title3,
                TypographyStyles.textAlignCenter,
              ]}>
              {title}
            </Text>
          ) : null}
          {renderSubTitle()}
          {buttons?.map(renderButtons)}
          {children}
        </View>
      </Pressable>
    </NativeModal>
  );
};
export default forwardRef(Modal);

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#131515CC',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    backgroundColor: colors.white,
    width: windowWidth - 48,
    padding: 24,
    borderRadius: 16,
  },
  subtitle: {
    ...TypographyStyles.RegularNormalSemiBold,
    textAlign: 'center',
    color: colors.ink.lighter,
  },
  image: {
    borderRadius: 16,
    alignSelf: 'center',
  },
  smallImage: {
    width: 64,
    height: 64,
  },
  mediumImage: {
    width: 120,
    height: 120,
  },
  largeImage: {
    height: 186,
    width: windowWidth - 48,
    overflow: 'hidden',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});
