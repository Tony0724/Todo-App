import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native';
import { theme } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons'; 

const STROAGE_KEY = "@toDos"

export default function App() {
  const [Working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const Travel = () => setWorking(false);
  const Work = () => setWorking(true);
  const onChangeText = (event) => setText(event);
  const saveToDos = async(toSave) => {
    const string = JSON.stringify(toSave)
    await AsyncStorage.setItem(STROAGE_KEY, string)
  }
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STROAGE_KEY);
    s !== null ? setToDos(JSON.parse(s)) : null;
    };
  useEffect(() => {
    loadToDos()
  }, [])
  const addToDo = async() => {
    if(text === "") {
      return;
    }
    // save to do
    const newToDos = {...toDos, [Date.now()]: {text, Working}};
    setToDos(newToDos);
    await saveToDos(newToDos)
    setText("");
  };
  const deleteToDo = async(id) => {
    Alert.alert("Delete To Do", "Are you sure?", [{text: "Cancel"}, {text: "I'm sure", onPress: () => {
      const newToDos = {...toDos}
      delete newToDos[id]
      setToDos(newToDos);
      saveToDos(newToDos)
    }}])
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.header}>
        <TouchableOpacity onPress={Work}>
          <Text style={{...styles.btnText, color: Working ? "white" : theme.gray}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Travel}>
          <Text style={{...styles.btnText,  color: !Working ? "white" : theme.gray}}>Travel</Text>
        </TouchableOpacity>
      </View>
        <TextInput onSubmitEditing={addToDo} value={text} onChangeText={onChangeText} returnKeyType='done' placeholder={Working ? "Add a To Do" : "Where do you want to go?"} style={styles.input} />
      <ScrollView>
        {Object.keys(toDos).map((key) => 
          toDos[key].Working === Working ? <View key={key} style={styles.toDo}>
          <Text style={styles.toDoText}>{toDos[key].text}</Text>
          <TouchableOpacity onPress={() => deleteToDo(key)}><Fontisto name="trash" size={18} color={theme.gray} /></TouchableOpacity>
          </View> : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 50
  }, 
  btnText: {
    fontSize: 38,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18
  },
  toDo: {
    backgroundColor: theme.toDobackground,
    marginTop: 15,
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  toDoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: "500",
  }
});
