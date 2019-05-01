import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Heading from './Header';
import Input from './Input';
import Button from './Button';
import TodoList from './TodoList';
import TabBar from './TabBar';

let todoIndex = 0;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      todos: [],
      type: 'All',
    }
  }

  inputChange(inputValue) {
    console.log('Input Change: ', inputValue)
    this.setState({
      inputValue,
    })
    this.submitTodo = this.submitTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.toggleComplete = this.toggleComplete.bind(this)
    this.setType = this.setType.bind(this)
  }

  submitTodo() {
    if (this.state.inputValue.match(/^\s*$/)) {
      return
    }
    const todo = {
      title: this.state.inputValue,
      todoIndex,
      complete: false,
    }
    todoIndex++;
    const todos = [...this.state.todos, todo];
    this.setState({todos, inputValue: '' }, () => {
      console.log('State: ', this.state);
    })
  }

  deleteTodo(todoIndex) {
    let { todos } = this.state;
    todos = todos.filter((todo) => todoIndex !== todoIndex);
    this.setState({ todos })
  }

  toggleComplete(todoIndex) {
    let todos = this.state.todos
    todos.forEach((todo) => {
      if (todo.todoIndex === todoIndex) {
        todo.complete = !todo.complete
      }
    })
    this.setState({ todos })
  }

  setType(type) {
    this.setState({ type })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content} keyboardShouldPersistTaps="always">
          <Heading />
          <Input 
            inputValue={this.state.inputValue}
            inputChange={(text) => this.inputChange(text)}
          />
          <TodoList
            todos={this.state.todos}
            toggleComplete={this.toggleComplete}
            deleteTodo={this.deleteTodo}
            type={this.state.type}
          />
          <Button submitTodo={this.submitTodo} />
        </ScrollView>
        <TabBar
          type={this.state.type}
          setType={this.setType}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingTop: 60,
  }
});
