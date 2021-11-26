import {currencyType} from '../../Types/types';

export const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};
export const currencyDropDownData: currencyType[] = [
  {
    id: '1',
    name: 'USD',
    img: require('../../../assets/images/usd.jpg'),
  },
  {
    id: '2',
    name: 'GBP',
    img: require('../../../assets/images/gbp.jpg'),
  },
  {
    id: '3',
    name: 'EUR',
    img: require('../../../assets/images/eur.jpg'),
  },
];
