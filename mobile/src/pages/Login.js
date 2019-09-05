import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

import logo from '../assets/logo.png';

export default ({ navigation }) => {

  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      if (user) {
        navigation.navigate('Main', { user });
      }
    });
  }, []);

  const [user, setUser] = useState('');

  const handleLogin = async () => {
    const response = await api.post('/devs', { username: user });
    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);
    navigation.navigate('Main', { user: _id });
  }

  return (
    // KeyboardAvoidingView é pra o teclado n ir em cima dos componentes da tela
    // no android ja é padrão, então botamos um enabled pro ios
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <Image source={logo} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu usuário do Github"
        placeholderTextColor="#999"
        style={styles.input}
        value={user}
        onChangeText={setUser}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15
  },
  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#df4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});