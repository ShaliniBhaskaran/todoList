import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';

export type Task = {
  id: string;
  title: string;
  done: boolean;
};

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

// One row in the to-do list: a checkbox, the task title, and a delete button.
export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <View style={styles.card}>
      <Pressable style={styles.main} onPress={() => onToggle(task.id)}>
        <Ionicons
          name={task.done ? 'checkmark-circle' : 'ellipse-outline'}
          size={26}
          color={task.done ? '#22A06B' : Colors.textFaint}
        />
        <Text style={[styles.text, task.done && styles.done]}>{task.title}</Text>
      </Pressable>
      <Pressable hitSlop={10} onPress={() => onDelete(task.id)}>
        <Ionicons name="trash-outline" size={22} color={Colors.crimson} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card, 
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: Colors.text,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  done: {
    color: Colors.textFaint,
    textDecorationLine: 'line-through',
  },
});
