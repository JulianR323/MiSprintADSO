import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, FlatList, ScrollView } from 'react-native';

export default function App() {
  const [estudiante, setEstudiante] = useState('');
  const [ficha, setFicha] = useState('3409609'); 
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
    } else {
      setMensaje(`Tareas registradas: ${listaTareas.length}`);
    }
  };

  const tareasCompletadas = listaTareas.filter(tarea => tarea.estado).length;
  const tareasPendientes = listaTareas.filter(tarea => !tarea.estado).length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mi Sprint ADSO</Text>
      <Text style={styles.subtitle}>Ficha: {ficha}</Text>
      <Text style={styles.mensajeAlerta}>{mensaje}</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Nombre del estudiante" 
        value={estudiante} 
        onChangeText={setEstudiante} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Número de ficha" 
        value={ficha} 
        onChangeText={setFicha} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Título de la tarea" 
        value={titulo} 
        onChangeText={setTitulo} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Categoría (Análisis, Diseño, Código)" 
        value={categoria} 
        onChangeText={setCategoria} 
      />

      <Pressable style={styles.btnAgregar} onPress={agregarNuevaTarea}>
        <Text style={styles.btnText}>Agregar Tarea</Text>
      </Pressable>

      <Pressable style={styles.btnConsultar} onPress={consultarTareas}>
        <Text style={styles.btnText}>Consultar Estado General</Text>
      </Pressable>
      <View style={styles.resumenContainer}>
        <Text style={styles.resumenTexto}>Total: {listaTareas.length}</Text>
        <Text style={styles.resumenTexto}>Pendientes: {tareasPendientes}</Text>
        <Text style={styles.resumenTexto}>Completadas: {tareasCompletadas}</Text>
      </View>

      <Text style={styles.subtituloSeccion}>Listado de Tareas:</Text>
      {listaTareas.length === 0 ? (
        <Text style={styles.textoVacio}>No hay tareas registradas todavía.</Text>
      ) : (
        <FlatList
          data={listaTareas}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <View style={styles.tareaCard}>
              <Text style={styles.tareaTitulo}>{item.titulo}</Text>
              <Text style={styles.tareaDetalle}>Categoría: {item.categoria}</Text>
              <Text style={styles.tareaDetalle}>Responsable: {item.estudiante} (Ficha: {item.ficha})</Text>
              <Text style={[styles.estadoTexto, item.estado ? styles.textCompletada : styles.textPendiente]}>
                Estado: {item.estado ? 'Completada' : 'Pendiente'}
              </Text>

              <View style={styles.accionesRow}>
                <Pressable style={styles.btnCambiar} onPress={() => cambiarEstadoTarea(index)}>
                  <Text style={styles.btnTextSmall}>Cambiar Estado</Text>
                </Pressable>
                <Pressable style={styles.btnEliminar} onPress={() => eliminarUnaTarea(index)}>
                  <Text style={styles.btnTextSmall}>Eliminar</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f6f8',
    flexGrow: 1,
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#4b5563',
    marginBottom: 15,
  },
  mensajeAlerta: {
    textAlign: 'center',
    color: '#2563eb',
    backgroundColor: '#eff6ff',
    padding: 8,
    borderRadius: 6,
    marginBottom: 15,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 15,
  },
  btnAgregar: {
    backgroundColor: '#16a34a',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnConsultar: {
    backgroundColor: '#0284c7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resumenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e5e7eb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  resumenTexto: {
    fontWeight: 'bold',
    color: '#374151',
  },
  subtituloSeccion: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#374151',
  },
  textoVacio: {
    textAlign: 'center',
    color: '#9ca3af',
    fontStyle: 'italic',
    marginTop: 10,
  },
  tareaCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tareaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  tareaDetalle: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 2,
  },
  estadoTexto: {
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 10,
  },
  textCompletada: {
    color: '#16a34a',
  },
  textPendiente: {
    color: '#d97706',
  },
  accionesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  btnCambiar: {
    backgroundColor: '#ca8a04',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  btnEliminar: {
    backgroundColor: '#dc2626',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  btnTextSmall: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});