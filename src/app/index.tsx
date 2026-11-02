import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Task } from '@/components/ui/taskItem';
import TaskList from '@/components/ui/taskList';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

const STARTER_TASKS: Task[] = [];

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(STARTER_TASKS);
  const [newTitle, setNewTitle] = useState('');

  const remaining = tasks.filter((t) => !t.done).length;
  
 const addTask = () => {
    const title = newTitle.trim();
    if (!title) return;
    setTasks((prev) => [{ id: Date.now().toString(), title, done: false }, ...prev]);
    setNewTitle('');
    setModalVisible(false);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const closeModal = () => {
    setNewTitle('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Image source={require('@/assets/images/Oklahoma-logo.png')} style={styles.logo} />
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subtitle}>
          {remaining === 0 ? 'All done!' : `${remaining} of ${tasks.length} left to do`}
        </Text>
      </View>

       <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />

      {/* Floating add button */}
      <Pressable style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={32} color={Colors.creamLight}  />
      </Pressable>

      {/* Add-task modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={closeModal} />
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>New Task</Text>
            <TextInput
              style={styles.input}
              placeholder="What do you need to do?"
              placeholderTextColor={Colors.textFaint}
              value={newTitle}
              onChangeText={setNewTitle}
              onSubmitEditing={addTask}
              returnKeyType="done"
              autoFocus
            />
            <View style={styles.sheetButtons}>
              <Pressable style={[styles.button, styles.cancelButton]} onPress={closeModal}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.addButton, !newTitle.trim() && styles.disabled]}
                onPress={addTask}
                disabled={!newTitle.trim()}
              >
                <Text style={styles.addText}>Add Task</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.creamLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 22,
    backgroundColor: Colors.crimson,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 14,
    resizeMode: 'contain',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.creamLight,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 15,
     color: Colors.cream,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 40,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: Colors.crimson,
    alignItems: 'center',
    justifyContent: 'center',
     shadowColor: Colors.crimson,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.overlay
  },
  sheet: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border, 
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.creamLight,
  },
  sheetButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.cream,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  addButton: {
    backgroundColor: Colors.crimson,
  },
  addText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.creamLight,
  },
  disabled: {
    opacity: 0.5,
  },
});