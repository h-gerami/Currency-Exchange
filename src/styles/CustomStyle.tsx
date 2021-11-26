import {Dimensions} from 'react-native';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
export function hp(percentage: number) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}
const CColor = {
  black: '#1C3041',
  gray: '#959595',
  blue: '#5AA9E6',
  red: '#FE4A49',
  white: '#fff',
  bgColor: '#ededed',
  lightGray: '#E5E5E5',
  pieBackGround: '#ededed',
  usd: '#89AAE6',
  eur: '#0586C7',
  gbp: '#60C7FB',
};
const CCFont = {
  light: 'SofiaProLight',
  medium: 'SofiaProMedium',
  bold: 'SofiaProBold',
  regular: 'SofiaProRegular',
};

export {CCFont, CColor};
