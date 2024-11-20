import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { ModalTimer } from '../components/ModalTimer';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { getMedicament ,select } from '../db/db';

export default function AddMore() {
  const [quantityDiaryMedicament, setQuantityDiaryMedicament] = useState('');
  const [alarmTime, setAlarmTime] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState('0');
  const [modalVisible, setModalVisible] = useState(false);

  const { nameMedicament } = useLocalSearchParams();

  function very(e?: any) {
    let dateModify = parseInt(alarmTime.replace(':', ''),10)
    let frequency = parseInt(selectedFrequency)
    if (quantityDiaryMedicament.length < 1 || alarmTime.length < 1 || parseInt(selectedFrequency) < 1) {
      if (e) {
        e.preventDefault()
      }
      return 'bg-gray-400'
    } else {
      if (e) {
        for (let i = 0; i < frequency; i++) {
          if(i!==0){
            if(parseInt(selectedFrequency) == 2){
              dateModify += 800;
              frequency = 3
              dateModify> 2400?dateModify-=2400:dateModify
            }
            if(parseInt(selectedFrequency) == 3){
              dateModify += 1200;
              frequency = 2
              dateModify> 2400?dateModify-=2400:dateModify
            }
          }
          getMedicament(nameMedicament.toString(),dateModify,parseInt(selectedFrequency),selectedDays.toString(),quantityDiaryMedicament )
        }
        console.log(select())
      }
      return 'bg-blue-500'
    }
  }

  const handleTimeChange = (timeValue: number) => {
    const hours = Math.floor(timeValue / 60);
    const minutes = timeValue % 60;
    setAlarmTime(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
  };

  const handleDaySelect = (day: string) => {
    setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  return (
    <View className='justify-between h-full bg-slate-300'>
      <Stack.Screen options={{ headerShown:false }} />
      <View>
        <Text className="text-[30px] mt-[40px] mb-[20px] self-center text-slate-500 font-bold">Receita Medica</Text>
        <View className="flex-row justify-between mx-12 mb-[50px]">
          <View className=' h-2 w-[32%] rounded-full bg-zinc-400 ' />
          <View className=' h-2 w-[32%] rounded-full bg-blue-500 ' />
          <View className=' h-2 w-[32%] rounded-full bg-zinc-400 ' />
        </View>
        <View className="mx-7">
          <View className="overflow-hidden rounded-lg mb-[50px]">
            <TextInput
              value={quantityDiaryMedicament}
              onChange={e => setQuantityDiaryMedicament(e.nativeEvent.text)}
              mode="flat"
              activeOutlineColor="blue"
              outlineColor="gray"
              placeholder="Ex: 1 Cápsula ao dia..."
              label="Quantidade Diária"
              style={{ backgroundColor: 'rgba(100,150,255,1)' }}
            />
          </View>
          <View className="overflow-hidden rounded-lg mb-[50px]">
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <TextInput
                mode="flat"
                activeOutlineColor="blue"
                outlineColor="gray"
                placeholder="Selecione a hora"
                label="Escolha um horário"
                value={alarmTime}
                editable={false}
                style={{ backgroundColor: 'rgba(100,150,255,1)' }}
              />
              <ModalTimer modalVisible={modalVisible} timeSet={alarmTime} onValueChange={handleTimeChange} onClose={() => setModalVisible(false)} />
            </TouchableOpacity>
          </View>
          <View className='overflow-hidden rounded-lg'>
            <Picker selectedValue={selectedFrequency} onValueChange={setSelectedFrequency} style={{ backgroundColor: 'rgba(100,150,255,1)', height: 50 }}>
              {['Qual frequencia', 'Uma vez por dia', 'A cada 8 horas', 'A cada 12 horas'].map((label, index) => (
                <Picker.Item key={index} label={label} value={String(index)} />
              ))}
            </Picker>
          </View>
          <Text className="text-xl mt-16 mx-1 text-zinc-600 font-bold">Dias específicos?</Text>
          <View className="flex-row justify-between mt-4 mb-12">
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(day => (
              <TouchableOpacity key={day} onPress={() => handleDaySelect(day)}
                style={{
                  padding: 10, margin: 1, backgroundColor: selectedDays.includes(day) ? 'rgb(0,100,255)' : 'rgb(180,180,180)',
                  borderRadius: 20, flex: 1, alignItems: 'center',
                }} >
                <Text style={{ fontSize: 14, color: 'white' }}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <Link href={'/Finallity'} replace={true} asChild>
        <TouchableOpacity onPress={(event) => very(event)}
          className={`h-[50px] w-[60%] rounded-lg ${very()} items-center justify-center mb-14 self-center`} >
          <Text className="text-[18px] text-white">Adicionar</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}