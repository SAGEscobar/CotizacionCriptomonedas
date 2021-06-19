import React, { Fragment } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Header from './components/Header';
import Form from './components/Form';

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <Header />
      <Image
        source={require('./assets/img/cryptomonedas.png')}
        style={styles.image}
      />

      <View style={styles.container}>
        <Form />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  container: {
    marginHorizontal: '2.5%'
  }
});

export default App;
