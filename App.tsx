import { StyleSheet, StatusBar, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react'

// Icons 
import Entypo from 'react-native-vector-icons/Entypo'

export default function App() {

  interface Todo {
    name: string,
    id: number,
  }

  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<string>("")
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editItemId, setEditItemId] = useState<number>()

  useEffect(() => {
  }, [todos, currentTodo])

  const handleInput = (event: string) => {
    setCurrentTodo(event)
  }

  const addTodo = () => {
    if (isEdit) {
      const todo = todos.find((todo) => todo.id === editItemId)

      if (todo != undefined) {
        todo.name = currentTodo
      }

      setCurrentTodo('')
      setIsEdit(false)
      setEditItemId(0)
    } else if (currentTodo !== "") {
      const id: number = Math.floor(Math.random() * 100000)
      setTodos(prevItems => [...prevItems, { name: currentTodo, id }])
      setCurrentTodo('')
    }
    else alert('Please enter a todo. ^^')
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const editTodo = (id: number) => {

    let todo = todos.find(todo => todo.id === id)

    if (todo !== undefined) {
      setCurrentTodo(todo.name)
      setEditItemId(todo.id)
    }
  }

  let todosMap = todos.map((todo) => (
    <View style={todosStyle.todoField} key={todo.id}>

      <Text style={todosStyle.todoTask}>{todo.name}</Text>

      <View style={todosStyle.icons}>
        <TouchableOpacity style={todosStyle.trashButton} onPress={() => { removeTodo(todo.id) }}>
          <Entypo name="trash" size={22} color='white' />
        </TouchableOpacity>
        <TouchableOpacity style={todosStyle.editButton} onPress={() => {
          editTodo(todo.id)
          setIsEdit(true)
        }}>
          <Entypo name="edit" size={22} color='white' />
        </TouchableOpacity>
      </View>

    </View>
  ))

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />

      <View style={styles.addTodoField}>
        <TextInput maxLength={20} style={styles.input} value={currentTodo} onChangeText={handleInput} />
        {isEdit ? <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Entypo name="check" size={28} color="white" />
        </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Entypo name="plus" size={28} color="white" />
        </TouchableOpacity>}
      </View>

      <View style={todosStyle.todoMapField}>
        {todosMap}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    padding: 50,
  },
  addTodoField: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 250,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
    backgroundColor: 'purple',
    color: 'white',
    textDecorationLine: 'none',
  },
  button: {
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginLeft: 10,
  },
});

const todosStyle = StyleSheet.create({
  todoMapField: {
    flex: 1,
    flexDirection: 'column',
    width: 300,
    marginTop: 30,
  },
  todoField: {
    height: 50,
    width: 310,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
  },
  editButton: {
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  trashButton: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  todoTask: {
    width: 210,
    height: 30,
    paddingHorizontal: 10,
    marginRight: 20,
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 16,
    paddingTop: 5,
  },
  icons: {
    flexDirection: 'row',
  }
})
