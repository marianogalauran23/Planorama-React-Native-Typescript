import React, { useState, useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated, Image, Text, Dimensions } from 'react-native';

interface TableItem {
  id: string;
  x: number;
  y: number;
  image: any;
}

const TableArrangementScreen: React.FC = () => {
  const table1 = require('../assets/table1.png');
  const table2 = require('../assets/table2.png');
  
  const [tables, setTables] = useState<TableItem[]>([]);
  const [draggingTable, setDraggingTable] = useState<{type: 'table1' | 'table2', image: any} | null>(null);
  
  const dragPosition = useRef(new Animated.ValueXY()).current;
  const currentPosition = useRef({ x: 0, y: 0 });

  dragPosition.addListener(value => {
    currentPosition.current = { x: value.x, y: value.y };
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        const { locationX, locationY } = e.nativeEvent;
        const screenHeight = Dimensions.get('window').height;
        
        if (locationY > screenHeight - 150) {
          if (locationX < Dimensions.get('window').width / 2) {
            setDraggingTable({ type: 'table1', image: table1 });
          } else {
            setDraggingTable({ type: 'table2', image: table2 });
          }
          dragPosition.setValue({
            x: locationX - 50,
            y: locationY - 50
          });
        }
      },
      onPanResponderMove: Animated.event(
        [null, { dx: dragPosition.x, dy: dragPosition.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gestureState) => {
        if (draggingTable) {
          const newTable: TableItem = {
            id: Math.random().toString(36).substring(7),
            x: currentPosition.current.x,
            y: currentPosition.current.y,
            image: draggingTable.image
          };
          
          setTables([...tables, newTable]);
          setDraggingTable(null);
        }
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.arrangementArea}>
        {tables.map((table) => (
          <Image
            key={table.id}
            source={table.image}
            style={[
              styles.tableImage,
              {
                position: 'absolute',
                left: table.x,
                top: table.y,
              },
            ]}
          />
        ))}
        
        {draggingTable && (
          <Animated.Image
            source={draggingTable.image}
            style={[
              styles.tableImage,
              {
                position: 'absolute',
                left: dragPosition.x,
                top: dragPosition.y,
                opacity: 0.8,
              },
            ]}
          />
        )}
      </View>
      
      <View style={styles.bottomPanel}>
        <Text style={styles.panelTitle}>Drag tables to arrange</Text>
        <View style={styles.tableOptions}>
          <Image source={table1} style={styles.tableOption} />
          <Image source={table2} style={styles.tableOption} />
        </View>
      </View>
    </View>
  );
};

// ... (keep the same styles as before)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  arrangementArea: {
    flex: 1,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  bottomPanel: {
    height: 150,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  tableOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  tableOption: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  tableImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default TableArrangementScreen;