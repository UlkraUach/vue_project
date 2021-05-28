<template>
  <div>
    <p>Insertar los datos del libro</p>
    <form @submit.prevent="estatusEditar ? updateTodo() : addTodo()">
      <p>
        <input type="text" v-model="name">
        <button type="submit">{{ estatusEditar ? "Editar": "Agregar" }}</button>
        <button v-if="estatusEditar" @click="estatusEditar = false, name = '' ">Cancelar</button>
      </p>
    </form>

    <img src="https://pa1.narvii.com/6707/510b0daee67fbc091f14b9d8ef40aeb6c0d4dc7d_hq.gif" v-if="cargando">
    {{estatusEditar}}

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{todo.nombre}} - 
        <button @click="deleteTodo(todo)">Eliminar</button>
        <button @click="selectTodo(todo)">Editar</button>
      </li>
    </ul>
  </div>
</template>

<script>

import {db} from './firebase'

export default {
  name: 'App',
  data() {
    return{
      todos: [],
      id: "",
      name: "",
      cargando: false,
      estatusEditar: false
    }
  },
  created(){
    this.listarTodos();
  },
  methods: {
    async listarTodos() {

      this.cargando = true;
      const data = await db.collection("todos").get();
      this.todos = data.docs.map(doc => ({
        id: doc.id, ...doc.data()
      }))
      this.cargando = false;
      console.log(this.todos);
    },
    async addTodo(){
      await db.collection('todos').add(
        {
          name: this.name
        }
      )
      this.listarTodos();
    },
    async deleteTodo(todo){

      if (confirm(`Estas seguro de que deseas eliminar ${todo.name}`)){
        await db.collection('todos').doc(todo.id).delete;
        this.listarTodos();
      }
      
    },
    selectTodo(todo){
      this.estatusEditar = true;
      this.id = todo.id;
      this.name = todo.name;
    },
    async updateTodo(){
      await db.collection('todos').doc(this.id).set(
        {
          name: this.name
        }
      )

      this.estatusEditar = false;
      this.id = "";
      this.name = "";
      this.listarTodos();
    }
  }
}
</script>

