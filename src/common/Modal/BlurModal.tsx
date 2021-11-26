import React from 'react';
import {
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Platform,
} from 'react-native';

import {BlurView} from '@react-native-community/blur';
import {wp, CColor} from '../../styles/CustomStyle';
export interface Blur_ModalType {
  style?: object;
  visible: boolean;
  contentStyle?: object;
  content: any;
  modalViewStyle?: object;
  onOutsideClickHandler: () => void;
}
const Blur_Modal = (props: Blur_ModalType) => {
  const {
    visible,
    contentStyle,
    content,
    modalViewStyle,
    onOutsideClickHandler,
    style,
  } = props;
  return (
    <View style={[style]}>
      {Platform.OS === 'android' && (
        <Modal
          statusBarTranslucent={true}
          animationType="fade"
          visible={visible}>
          <BlurView style={styles.absolute} blurType="dark" blurRadius={1} />
        </Modal>
      )}
      <Modal
        transparent={true}
        animationType={Platform.OS === 'ios' ? 'fade' : 'slide'}
        visible={visible}>
        {Platform.OS === 'ios' && (
          <BlurView style={styles.absolute} blurType="dark" blurRadius={0} />
        )}

        <TouchableOpacity
          activeOpacity={1}
          onPressOut={onOutsideClickHandler}
          style={styles.centeredView}>
          <View style={[styles.modalView, modalViewStyle]}>
            <View style={[contentStyle]}>
              <TouchableWithoutFeedback>
                <View>
                  <View style={styles.line} />
                  {content}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: wp(1),
  },
  line: {
    position: 'absolute',
    top: -wp(2),
    width: wp(19),
    height: wp(1),
    alignSelf: 'center',
    borderRadius: wp(10),
    backgroundColor: CColor.white,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalView: {
    backgroundColor: CColor.white,
    borderRadius: wp(3),
    width: wp(90),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export {Blur_Modal};
