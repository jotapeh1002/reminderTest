import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';

export default function Finallity() {
  const [scale] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  return (
    <View className='justify-between h-full bg-slate-300'>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <Text className="text-[30px] mt-[40px] mb-[20px] self-center text-slate-500 font-bold">Olá Jotapeh!</Text>
        <View className="flex-row justify-between mx-12 mb-[50px]">
          <View className=' h-2 w-[32%] rounded-full bg-zinc-400 ' />
          <View className=' h-2 w-[32%] rounded-full bg-zinc-400 ' />
          <View className=' h-2 w-[32%] rounded-full bg-blue-500 ' />
        </View>
      </View>
      <View className="mx-7 bottom-10">
        <View className="p-6 mx-4 flex items-center justify-center">
          <Animated.View style={{ transform: [{ scale }] }}>
            <MaterialIcons name="check-circle" size={120} color="rgb(100,150,255)" />
          </Animated.View>
          <Animated.Text
            style={{
              textAlign: 'center', marginTop: 16, color: '#3b82f6',
              fontSize: 24, fontWeight: '600', opacity: scale,
            }} >
            Medicamento Adicionado com Sucesso!
          </Animated.Text>
        </View>
      </View>
      <Link href={'/'} replace={true} asChild>
        <TouchableOpacity
          className={`h-[50px] w-[60%] rounded-lg bg-blue-500 items-center justify-center mb-14 self-center`} >
          <Text className="text-[18px] text-white">Adicionar</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
