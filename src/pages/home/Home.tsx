import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {
  AssetCard,
  Blur_Modal,
  CurrencyInput,
  CurrencyList,
  DropDownButton,
} from '../../common';
import {ExchangeButton} from '../../common/Button/ExchangeButton';
import {EMPTY_FIELD} from '../../global/Errors';
import {update_wallet, get_currency_rate, set_err} from '../../Redux/Actions';
import {CCFont, CColor, wp} from '../../styles/CustomStyle';
import {currencyType, walletBoardItemType, walletType} from '../../Types/types';
import {
  convert,
  currencyPrefixReturner,
  rateReturner,
  rateReverseReturner,
} from '../../Types/utils';
import HomePie from './HomePie';
import {currencyDropDownData} from './StaticsData';
export interface MarketCapType {
  id: string;
  title: string;
  total: string;
  icon: string;
}

export interface HomePageType {
  update_wallet: (wallet: walletType) => void;
  wallet: walletType;
  loading: boolean;
  err: string;
  rates: object | any;
  get_currency_rate: (base: string) => void;
  set_err: (v: string) => void;
}

export enum Cnames {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
}
export const cc: {[key: string]: Cnames} = Cnames;

function Home(props: HomePageType) {
  const {
    update_wallet,
    err,
    rates,
    get_currency_rate,
    wallet,
    loading,
    set_err,
  } = props;

  const [selectedAssetCardId, setSelectedAssetCardId] = useState<string>('1');
  const [currencyModalShowntoBuy, setCurrencyModalShowntoBuy] =
    useState<boolean>(false);
  const [currencyModalShowntoSell, setCurrencyModalShowntoSell] =
    useState<boolean>(false);
  const [selectedCurrencyToBuy, setSelectedCurrencyToBuy] =
    useState<currencyType>({
      id: '1',
      name: 'USD',
      img: require('../../../assets/images/usd.jpg'),
    });
  const [selectedCurrencyToSell, setSelectedCurrencyToSell] =
    useState<currencyType>({
      id: '2',
      name: 'GBP',
      img: require('../../../assets/images/gbp.jpg'),
    });
  const [valueToBuy, setValueToBuy] = useState<string>('');
  const [valueToSell, setValueToSell] = useState<string>('');
  const [sellInputError, setSellInputError] = useState<boolean>(false);
  const [isBuyInputActive, setIsBuyInputActive] = useState<boolean>(false);
  const [isSellInputActive, setIsSellInputActive] = useState<boolean>(false);

  useEffect(() => {
    if (err) {
      Alert.alert('Error', err, [
        {
          text: 'OK',
          onPress: () => set_err(''),
          style: 'cancel',
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [err]);

  useEffect(() => {
    get_currency_rate(selectedCurrencyToSell.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrencyToSell, selectedCurrencyToBuy]);

  const onAssetCardClickHandler = (assetCardId: string) => {
    setSelectedAssetCardId(assetCardId);
  };

  const walletDataArray = useMemo(() => {
    let res: walletBoardItemType[] = [];
    res.push(wallet.USD);
    res.push(wallet.EUR);
    res.push(wallet.GBP);
    return res;
  }, [wallet]);

  const handleToBuyChange = (t: string) => {
    setValueToBuy(t);
  };

  const handleToSellChange = (t: string) => {
    setValueToSell(t);
  };

  useEffect(() => {
    if (!isSellInputActive) {
      return;
    }
    let total: number = 0;
    total = wallet[cc[selectedCurrencyToSell.name]].total;
    if (parseInt(valueToSell, 10) > total) {
      setSellInputError(true);
    } else {
      setSellInputError(false);
      setValueToBuy(
        convert(
          valueToSell ? parseInt(valueToSell, 10) : 0,
          rateReturner(selectedCurrencyToSell, selectedCurrencyToBuy, rates),
        ).toString(),
      );
    }
  }, [
    isSellInputActive,
    rates,
    rates.EUR,
    rates.GBP,
    rates.USD,
    selectedCurrencyToBuy,
    selectedCurrencyToSell,
    selectedCurrencyToSell.name,
    valueToSell,
    wallet,
    wallet.EUR.total,
    wallet.GBP.total,
    wallet.USD.total,
  ]);

  useEffect(() => {
    if (!isBuyInputActive) {
      return;
    }
    let total: number = 0;
    total = wallet[cc[selectedCurrencyToSell.name]].total;
    let ex = convert(
      valueToBuy ? parseInt(valueToBuy, 10) : 0,
      rateReverseReturner(selectedCurrencyToSell, selectedCurrencyToBuy, rates),
    );
    if (total < ex) {
      setSellInputError(true);
    } else {
      setSellInputError(false);
      setValueToSell(ex.toString());
    }
  }, [
    isBuyInputActive,
    rates,
    rates.EUR,
    rates.GBP,
    rates.USD,
    selectedCurrencyToBuy,
    selectedCurrencyToSell,
    selectedCurrencyToSell.name,
    valueToBuy,
    valueToSell,
    wallet,
    wallet.EUR.total,
    wallet.GBP.total,
    wallet.USD.total,
  ]);

  const onExchangePress = () => {
    if (
      valueToSell === '' ||
      valueToBuy === '' ||
      valueToSell === '0' ||
      valueToBuy === '0'
    ) {
      Alert.alert('Error', EMPTY_FIELD, [
        {
          text: 'OK',
          onPress: () => set_err(''),
          style: 'cancel',
        },
      ]);
    } else {
      let deCrease = parseFloat(valueToSell);
      let inCrease = parseFloat(valueToBuy);
      let updatedWallet = {...wallet};
      updatedWallet[cc[selectedCurrencyToSell.name]].total =
        updatedWallet[cc[selectedCurrencyToSell.name]].total - deCrease;
      updatedWallet[cc[selectedCurrencyToBuy.name]].total =
        updatedWallet[cc[selectedCurrencyToBuy.name]].total + inCrease;
      setValueToSell('');
      setValueToBuy('');
      update_wallet(updatedWallet);
    }
  };
  const onChangeCurrencyClick = () => {
    setSelectedCurrencyToBuy(selectedCurrencyToSell);
    setSelectedCurrencyToSell(selectedCurrencyToBuy);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.walletsWrapper}>
        {walletDataArray.map(item => {
          const isSelected = selectedAssetCardId === item.currency.id;
          return (
            <AssetCard
              key={item.currency.id}
              style={
                (item.currency.id === '2' && {marginHorizontal: wp(1)}) || {}
              }
              id={item.id}
              currency={item.currency}
              total={item.total}
              onPress={() => onAssetCardClickHandler(item.currency.id)}
              selected={isSelected}
            />
          );
        })}
      </View>
      <HomePie />
      <View style={styles.tradeWrapper}>
        <View style={styles.tradeWrapperHeader}>
          <Text style={styles.headerText}>Buy</Text>
          <TouchableOpacity
            style={styles.changeIconWrapper}
            onPress={onChangeCurrencyClick}>
            <Icon name="swap-horizontal" size={wp(7)} color={CColor.black} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Sell</Text>
        </View>
        <View style={styles.buySellWrapper}>
          <View style={styles.buyWrapper}>
            <DropDownButton
              onPress={() => setCurrencyModalShowntoBuy(true)}
              {...selectedCurrencyToBuy}
            />
            <CurrencyInput
              prefix={currencyPrefixReturner(selectedCurrencyToBuy)}
              icon="plus"
              placeHolder="Enter Amount"
              value={valueToBuy}
              onFocus={() => {
                setValueToBuy('');
                setIsBuyInputActive(true);
              }}
              onBlur={() => setIsBuyInputActive(false)}
              onChangeText={t => handleToBuyChange(t)}
              style={{marginTop: wp(2)}}
              disable={false}
              labelPadding={0}
              error={sellInputError}
            />
          </View>
          <View style={styles.sellWrapper}>
            <DropDownButton
              onPress={() => setCurrencyModalShowntoSell(true)}
              {...selectedCurrencyToSell}
            />
            <CurrencyInput
              prefix={currencyPrefixReturner(selectedCurrencyToSell)}
              icon="minus"
              placeHolder="Enter Amount"
              value={valueToSell}
              onFocus={() => {
                setValueToSell('');
                setIsSellInputActive(true);
              }}
              onBlur={() => setIsSellInputActive(false)}
              onChangeText={t => handleToSellChange(t)}
              style={{marginTop: wp(2)}}
              disable={false}
              labelPadding={0}
              error={sellInputError}
            />
          </View>
        </View>
        <ExchangeButton
          rates={rates}
          loading={loading}
          onPress={() => onExchangePress()}
          currencyToBuy={selectedCurrencyToBuy}
          currencyToSell={selectedCurrencyToSell}
          style={{marginTop: wp(4)}}
          error={sellInputError}
        />
      </View>

      <Blur_Modal
        visible={currencyModalShowntoBuy}
        onOutsideClickHandler={() => {
          setCurrencyModalShowntoBuy(false);
        }}
        content={
          <View>
            <View style={styles.modalTitrWrapper}>
              <Text style={styles.modalTitr}>
                Select currency you want to buy
              </Text>
            </View>
            <FlatList
              data={currencyDropDownData.filter(function (obj) {
                return obj.name !== selectedCurrencyToSell.name;
              })}
              renderItem={({item}) => {
                const isLastItem = item.id === '3';
                return (
                  <CurrencyList
                    onPress={() => {
                      setSelectedCurrencyToBuy(item);
                      setCurrencyModalShowntoBuy(false);
                      setValueToBuy('');
                    }}
                    name={item.name!}
                    img={item.img!}
                    isLast={isLastItem}
                  />
                );
              }}
            />
          </View>
        }
      />

      <Blur_Modal
        visible={currencyModalShowntoSell}
        onOutsideClickHandler={() => {
          setCurrencyModalShowntoSell(false);
        }}
        content={
          <View>
            <View style={styles.modalTitrWrapper}>
              <Text style={styles.modalTitr}>
                Select currency you want to buy
              </Text>
            </View>
            <FlatList
              data={currencyDropDownData.filter(function (obj) {
                return obj.name !== selectedCurrencyToBuy.name;
              })}
              renderItem={({item}) => {
                const isLastItem = item.id === '3';
                return (
                  <CurrencyList
                    onPress={() => {
                      setSelectedCurrencyToSell(item);
                      setCurrencyModalShowntoSell(false);
                      setValueToSell('');
                    }}
                    name={item.name!}
                    img={item.img!}
                    isLast={isLastItem}
                  />
                );
              }}
            />
          </View>
        }
      />
    </ScrollView>
  );
}

// Redux
const mapStateToProps = (state: {
  CurrencyReducer: {
    wallet: walletType;
    loading: boolean;
    err: string;
    rates: object;
  };
}) => {
  const {wallet, loading, err, rates} = state.CurrencyReducer;
  return {
    wallet,
    loading,
    err,
    rates,
  };
};
const mapDispatchToProps = {
  update_wallet,
  get_currency_rate,
  set_err,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
const styles = StyleSheet.create({
  container: {
    backgroundColor: CColor.white,
    paddingBottom: wp(20),
    flex: 1,
  },
  modalTitrWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp(4),
    paddingBottom: wp(4),
    borderBottomWidth: 0.5,
    borderColor: CColor.gray,
  },
  modalTitr: {
    fontFamily: CCFont.medium,
    fontSize: wp(4),
    color: CColor.black,
  },
  headerText: {
    fontFamily: CCFont.bold,
    fontSize: wp(4),
    color: CColor.black,
  },
  walletsWrapper: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingHorizontal: wp(5),
  },
  total: {
    fontFamily: CCFont.medium,
    fontSize: wp(8),
    color: CColor.black,
  },
  buySellWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tradeWrapper: {
    flex: 1,
    marginHorizontal: wp(5),
  },
  tradeWrapperHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: wp(10),
    // backgroundColor: 'red',
    marginBottom: wp(2),
  },
  buyWrapper: {
    flex: 1,
    marginRight: wp(1),
  },
  sellWrapper: {
    flex: 1,
    marginLeft: wp(1),
  },
  changeIconWrapper: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(2),
    // backgroundColor: CColor.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
