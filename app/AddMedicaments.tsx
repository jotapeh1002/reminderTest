import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Link, Stack } from 'expo-router';
import { useRouter } from 'expo-router';

export default function AddMedicaments() {

  const [nameMedicament, setNameMedicament] = useState('');

  function very(e?:any) {
    if (nameMedicament.length < 1) {
      if(e){
        e.preventDefault()}
        return 'bg-gray-400'
      } else {
        return 'bg-blue-500'
      }
  }
  
  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <View className='bg-slate-300 h-full'>
        <Text className="text-[30px] mt-[40px] mb-[20px] self-center text-slate-500 font-bold">Adicionar Medicamento</Text>
        <View className="flex-row justify-between mx-12 mb-[50px]">
          <View className=' h-2 w-[32%] rounded-full bg-blue-500 ' />
          <View className=' h-2 w-[32%] rounded-full bg-zinc-400 ' />
          <View className=' h-2 w-[32%] rounded-full bg-zinc-400 ' />
        </View>
        <View className='mx-7 mb-[30px] overflow-hidden rounded-lg'>
          <TextInput
            value={nameMedicament}
            onChange={(e) => setNameMedicament(e.nativeEvent.text)}
            mode="flat"
            activeOutlineColor="gray"
            outlineColor="gray"
            style={{ backgroundColor: 'rgba(100,150,255,1)' }}
            placeholder="Digite algo"
            label={'Nome do Medicamento'}
          />
        </View>
        <Image className=' opacity-50 bottom-6 h-[400px] w-[400px] mx-auto my-auto' source={require('../assets/medicaments1.png')} />
        <Link href={{
          pathname: '/AddMore',
          params: { nameMedicament: nameMedicament },
        }} push={true} asChild>
          <TouchableOpacity onPress={(event) => very(event)}
            className={`h-[50px] w-[60%] rounded-lg ${very()} items-center justify-center mb-14 self-center`} >
            <Text className="text-[18px] text-white">Adicionar</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View >
  );
}