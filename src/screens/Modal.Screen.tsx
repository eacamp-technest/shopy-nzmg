import React, {useRef} from 'react';
import Modal, {IModalRefCallbacks} from 'components/Modal';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';

export const ModalScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.modalScreen>
> = ({navigation, route}) => {
  const params = route.params;
  const modalRef = useRef<IModalRefCallbacks>(null);

  return (
    <Modal defaultOpen onClose={navigation.pop} ref={modalRef} {...params} />
  );
};
