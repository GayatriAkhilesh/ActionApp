import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async () => {
    if (!name || !email || !password) {
      Alert.alert('Please fill all fields');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      await firestore().collection('users').doc(userId).set({
        name,
        email,
        password,
        approved: false, 
      });

      Alert.alert('Registration successful! Waiting for admin approval.');
      
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Registration failed!', error.message);
    }
  };

  return (
    <View style={{padding:15, }}>
      <View style={{padding:5, borderColor:'#000', borderWidth:1, backgroundColor:'#fff',marginVertical:10,}}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        
      />
      </View>
      <View style={{padding:5, borderColor:'#000', borderWidth:1, backgroundColor:'#fff',marginVertical:10,}}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      </View>
      <View style={{padding:5, borderColor:'#000', borderWidth:1, backgroundColor:'#fff',marginVertical:10,}}>
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      </View>
      <Button title="Register" onPress={registerUser} color="#000" />
    </View>
  );
};

export default Register;
