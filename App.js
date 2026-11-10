import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, FlatList, ScrollView } from 'react-native';

export default function App() {
  const [estudiante, setEstudiante] = useState('');
  const [ficha, setFicha] = useState('');
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [estado, setEstado] = useState(false);
  const [listaTareas, setListaTareas] = useState([]);
  const [mensaje, setMensaje] = useState('Ingrese los datos de la tarea');

  const agregarNuevaTarea = () => {
    if (!estudiante.trim()) {
      setMensaje('Por favor, ingrese el nombre del estudiante');
      return;
    }
    if (!ficha.trim()) {
      setMensaje('Por favor, ingrese la ficha');
      return;
    }
    if (!titulo.trim()) {
      setMensaje('Por favor, ingrese el título');
      return;
    }
    if (!categoria.trim()) {
      setMensaje('Por favor, ingrese la categoría');
      return;
    }

    const nuevaTarea = {
      estudiante,
      ficha,
      titulo,
      categoria,
      estado,
    };

    setListaTareas([...listaTareas, nuevaTarea]);
    setMensaje('Tarea agregada con exito');
    setTitulo('');
    setCategoria('');
    setEstudiante('');
    setFicha('');
    setEstado(false);
  };

  const cambiarEstadoTarea = (index) => {
    setListaTareas(listaTareas.map((tarea, i) => 
      i === index ? { ...tarea, estado: !tarea.estado } : tarea
    ));
  };  

  const eliminarUnaTarea = (index) => {
    if (!listaTareas[index].estado) {
      setMensaje('Solo se pueden eliminar tareas completadas');
      return;
    }

    setListaTareas(listaTareas.filter((_, i) => i !== index));
    setMensaje('Tarea eliminada correctamente');
  };

  const consultarTareas = () => {
    if (listaTareas.length === 0) {
      setMensaje('No hay tareas registradas');
      return;
    }else{
      setMensaje(`Tareas registradas: ${listaTareas.length}`);
    }
  };
  const tareasCompletadas = listaTareas.filter(tarea => tarea.estado).length;
  const tareasPendientes = listaTareas.filter(tarea => !tarea.estado).length;
}