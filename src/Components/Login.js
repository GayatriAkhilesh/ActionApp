import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Please fill all fields');
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      const userDoc = await firestore().collection('users').doc(userId).get();
      if (userDoc.exists) {
        const { approved } = userDoc.data();
        if (approved) {
          Alert.alert('Login successful!');
          navigation.navigate('Home');
        } else {
          Alert.alert('Your account is not approved yet. Please wait for admin approval.');
        }
      } else {
        Alert.alert('User data not found.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Login failed!', error.message);
    }
  };

  return (
    <View style={{padding:15, }}>
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
      <Button title="Login" onPress={handleLogin} color="#000" />
      <Text style={{ marginTop: 20, textAlign: 'center' }}>
        Don't have an account?{' '}
        <Text style={{ color: 'maroon' }} onPress={() => navigation.navigate('Register')}>
          Register here
        </Text>
      </Text>
    </View>
  );
};

export default Login;
