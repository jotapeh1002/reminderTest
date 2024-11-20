import { Link, Stack, useFocusEffect } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '../components/Card';
import { DataHome } from '../components/DataHome';
import { createTable, deletedb, deleteItem, getMedicament, select } from '../db/db';
import React, { useState } from 'react';
import { ModalDelete } from '../components/ModalDelete';

// Tipagem do tipo de dados
export interface typeMedicamentsCards {
  id: number; 
  nameMedicament?: string;
  alarmHour?: number;
  quantityDiaryMedicament?: number;
  typeMedicament?: string;
}

export default function MedicFeed() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [id, setId] = useState<number>(0); 
  const [data, setData] = useState<typeMedicamentsCards[]>([]); 

  const bda = async (): Promise<void> => { 
    console.log('Executando operações no banco...');
    const value = await select();
    value.forEach((element) => {
      console.log(element);
    });
  };

  const handlePress = (id: number): void => {
    setIsVisible(true);
    setId(id);
  };

  const getSelect = async (): Promise<void> => { 
    setData(v);
    console.log(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      getSelect();
    }, [isVisible])
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <DataHome />
      <View className="flex-1 bg-slate-300 rounded-t-3xl mt-[-30]">
        <ScrollView>
          <View>
            <Card onPressLong={handlePress} data={data} />
            <ModalDelete onDelete={() => deleteItem(id)} modalVisible={isVisible} onClose={() => setIsVisible(false)} />
          </View>
        </ScrollView>
        <Link href={'/AddMedicaments'} push={true} asChild>
          <TouchableOpacity
            onLongPress={bda}
            className="h-16 w-16 rounded-full bg-blue-500 absolute bottom-12 right-8 flex items-center justify-center"
          >
            <Text className="text-white text-3xl"> + </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}
