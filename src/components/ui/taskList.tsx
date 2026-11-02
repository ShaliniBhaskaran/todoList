import { Ionicons } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';
import TaskItem, { type Task } from './taskItem';

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  emptyTitle?: string;
  emptyHint?: string;
};

// A scrolling list of tasks built on FlatList.
// It draws one TaskItem per task and shows a message when there are none.
export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  emptyTitle = 'No tasks yet',
  emptyHint = 'Tap + to add your first task',
}: TaskListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TaskItem task={item} onToggle={onToggle} onDelete={onDelete} />}
      contentContainerStyle={tasks.length === 0 ? styles.emptyContainer : styles.listContent}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ionicons name="clipboard-outline" size={56} color={Colors.cream} />
          <Text style={styles.emptyTitle}>{emptyTitle}</Text>
          <Text style={styles.emptyHint}>{emptyHint}</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    paddingTop: 20,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  separator: {
    height: 10,
  },
  empty: {
    alignItems: 'center',
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  emptyHint: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.textFaint,
  },
});
