import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {connect} from 'react-redux';
import {CColor, wp} from '../../styles/CustomStyle';
import {walletType} from '../../Types/types';
import {chartConfig} from './StaticsData';
export interface HomePieType {
  wallet: walletType;
}
const HomePie = (props: HomePieType) => {
  const {wallet} = props;
  const data = [
    {
      name: wallet.USD.currency.name,
      population: Math.round(wallet.USD.total),
      color: CColor.usd,
      legendFontColor: '#7F7F7F',
      legendFontSize: wp(3),
    },
    {
      name: wallet.EUR.currency.name,
      population: Math.round(wallet.EUR.total),
      color: CColor.eur,
      legendFontColor: '#7F7F7F',
      legendFontSize: wp(3),
    },
    {
      name: wallet.GBP.currency.name,
      population: Math.round(wallet.GBP.total),
      color: CColor.gbp,
      legendFontColor: '#7F7F7F',
      legendFontSize: wp(3),
    },
  ];
  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        width={wp(100)}
        height={wp(40)}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        center={[0, 0]}
        absolute
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: CColor.pieBackGround,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(5),
    marginVertical: wp(2),
    borderRadius: wp(1),
  },
});

// Redux
const mapStateToProps = (state: {
  CurrencyReducer: {
    wallet: walletType;
  };
}) => {
  const {wallet} = state.CurrencyReducer;
  return {
    wallet,
  };
};
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(HomePie);
