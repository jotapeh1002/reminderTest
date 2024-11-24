import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export interface typeMedicamentsCards {
  id: number;
  nameMedicament?: string;
  alarmHour?: number;
  quantityMedicament?: number;
  typeMedicament?: string;
}

interface CardProps {
  onPress?: (id: number) => void;
  onPressLong?: (id: number) => void;
  data?: any;
}

export function Card({ onPress, onPressLong, data }: CardProps) {
  const formatTime = (time: number) => {
    const hour = Math.floor(time / 100);
    const minutes = time % 100;
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${formattedHour}:${formattedMinutes}`;
  };

  const renderItem = ({ item }: { item: typeMedicamentsCards }) => (
    <>
      <Text className="font-bold text-lg ml-7 text-gray-600">
        Alarme: {formatTime(item.alarmHour || 0)}
      </Text>
      <TouchableOpacity
        onLongPress={() => onPressLong?.(item.id)}
        onPress={() => onPress?.(item.id)}
        className="mx-5 mt-1"
      >
        <View className="flex-row justify-between h-24 overflow-hidden mb-5 border-x border-blue-500/50 bg-slate-200/50 rounded-xl self-center w-full">
          <View className="flex-row">
            <Image
              className="w-24 bg-blue-500/70 h-full self-center "
              source={require('../assets/medicament.png')}
            />
            <View className="mx-3 my-1 pt-2">
              <Text className="font-bold text-[18px] text-black">
                {item.nameMedicament && item.nameMedicament.length > 20
                  ? `${item.nameMedicament.substring(0, 15)}...`
                  : item.nameMedicament}
              </Text>
              <Text className="text-[14px] mt-1 text-gray-600">
                Quantidade: {item.quantityMedicament || 0}
              </Text>
            </View>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            color="rgb(100,100,100)"
            size={21}
            className="self-center mr-2"
          />
        </View>
      </TouchableOpacity>
    </>
  );

  return (
    <View className="flex-1">
      {data.length < 1 && (
        <View className="mt-[45%] items-center justify-center">
          <View className="flex items-center">
            <MaterialIcons name="add-alert" size={100} color="rgb(30,144,255)"
            />
            <Text className="text-center text-2xl mx-10 font-semibold text-gray-500 mt-3">
              Olá Jotapeh, que tal adicionar um lembrete?
            </Text>
            <Text className="text-center text-md mx-10  text-gray-500 mt-3">
              <Text className="font-semibold">Dicas:</Text> para deletar um alarme basta pressiona-lo por 2 segundos...
            </Text>
          </View>
        </View>
      )}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
    </View>
  );
}