import React, { Fragment, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Header from './components/Header';
import Form from './components/Form';
import Quotation from './components/Quotation';
import axios from 'axios';

const App = () => {
  const [coin, setCoin] = useState('');
  const [criptocoin, setCriptocoin] = useState('');
  const [fetchApi, setFetch] = useState(false);
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCriptocoin = async () => {
      if (fetchApi) {
        setLoading(true)
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptocoin}&tsyms=${coin}`;
        const result = await axios.get(url)

        setResult(result.data.DISPLAY[criptocoin][coin])
        setLoading(false)
        setFetch(false)
      }
    }
    fetchCriptocoin()
  }, [fetchApi])

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ScrollView>
        <Header />
        <Image
          source={require('./assets/img/cryptomonedas.png')}
          style={styles.image}
        />

        <View style={styles.container}>
          <Form
            coin={coin}
            criptocoin={criptocoin}
            setCoin={setCoin}
            setCriptocoin={setCriptocoin}
            setFetch={setFetch}
          />
        </View>
        {
          loading ?
            <ActivityIndicator size='large' color='#5E49E2' style={{marginTop: 20}} />:
            <Quotation result={result} />
        }
      </ScrollView>
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
