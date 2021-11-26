import * as React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {store, persistor} from './Redux/Store';
import {wp} from './styles/CustomStyle';
import Tabs from './Navigation/Tabs';
function App() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <View style={styles.container}>
            <Tabs />
          </View>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? wp(10) : 0,
  },
});
