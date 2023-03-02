import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { theme } from './colors';

export default function App() {
  const [Working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const Travel = () => setWorking(false);
  const Work = () => setWorking(true);
  const onChangeText = (event) => setText(event);
  const addToDo = () => {
    if(text === "") {
      return;
    }
    // save to do
    const newToDos = {...toDos, [Date.now()]: {text, work: Working}};
    setToDos(newToDos);
    setText("");
  };
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
        {Object.keys(toDos).map(key => <View key={key} style={styles.toDo}>
          <Text style={styles.toDoText}>{toDos[key].text}</Text>
        </View>)}
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
  },
  toDoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: "500",
  }
});
