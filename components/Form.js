import React, { useEffect, useState } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, Alert } from 'react-native'
import { Picker } from '@react-native-community/picker'
import axios from 'axios';
const Form = ({coin, criptocoin, setCoin, setCriptocoin, setFetch}) => {
  const [criptocoins, setCriptocoins] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
      const result = await axios.get(url)
      setCriptocoins(result.data.Data)
    }
    fetchApi();
  }, [])

  const getCoin = coin => {
    setCoin(coin)
  }

  const getCripto = cripto => {
    setCriptocoin(cripto)
  }

  const quotePrice = () => {
    if(coin === '' || criptocoin === ''){
      Alert.alert(
        'Error',
        'Debe seleccionar la moneda y criptomoneda para poder cotizar',
        [{
          text: 'Ok'
        }]
      )
      return;
    }

    setFetch(true)

  }

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <View style={{ backgroundColor: 'rgba(0, 0, 0, .3)', position: 'relative', borderRadius: 10 }}>
        <Picker
          selectedValue={coin}
          onValueChange={getCoin}
          itemStyle={{ height: 120 }}
        >
          <Picker.Item label="- Seleccione -" value='' />
          <Picker.Item label="Dolar de USA" value='USD' />
          <Picker.Item label="Peso Mexicano" value='MXN' />
          <Picker.Item label="Euro" value='EUR' />
          <Picker.Item label="Libra Esterlina" value='GBP' />
        </Picker>
      </View>

      <Text style={styles.label}>Criptomoneda</Text>
      <View style={{ backgroundColor: 'rgba(0, 0, 0, .3)', position: 'relative', borderRadius: 10}}>
        <Picker
          selectedValue={criptocoin}
          onValueChange={getCripto}
        >
          {criptocoins.map(cripto => <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />)}
        </Picker>
      </View>

      <TouchableHighlight style={styles.quote} onPress={() => quotePrice()}>
        <Text style={styles.txtQuote}>Cotizar</Text>
      </TouchableHighlight>

    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20
  },
  quote: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 10
  },
  txtQuote: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textAlign: 'center',
    textTransform: 'uppercase'
  }
})

export default Form