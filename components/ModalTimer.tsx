import React, { useState, useEffect } from 'react';
import { View, Text, Modal, ImageBackground, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

interface ModalTimerProps {
  modalVisible: boolean;
  onClose: () => void;
  onValueChange: (value: number) => void;
  timeSet:any
}

export function ModalTimer({ modalVisible, onClose, onValueChange ,timeSet}: ModalTimerProps) {
  const [tempTimeValue, setTempTimeValue] = useState<number>(0); 
  const [confirmedTimeValue, setConfirmedTimeValue] = useState<number>(0); 

  useEffect(() => {
    if (modalVisible) {
      const currentMinutes = new Date().getHours() * 60 + new Date().getMinutes();
      setTempTimeValue(currentMinutes); 
    }
  }, [modalVisible]);

  const formatTime = (value: number) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${String(hours % 24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };


  const handleSliderChange = (value: number) => {setTempTimeValue(value)};

  const handleConfirm = () => {
    setConfirmedTimeValue(tempTimeValue);
    onValueChange(tempTimeValue);
    onClose();
  };

  const handleCancel = () => {
    setTempTimeValue(confirmedTimeValue);
    onClose();
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Modal transparent visible={modalVisible} animationType="slide" onRequestClose={onClose}>
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="w-4/5 overflow-hidden h-[338px] bg-white rounded-lg px-6 items-center relative">
            <ImageBackground 
              blurRadius={4} source={parseInt(formatTime(tempTimeValue))>= 6 && parseInt(formatTime(tempTimeValue)) < 17 ? require('../assets/dia.jpg') : require('../assets/noite.jpg')}
              style={{ height: 135, width: 370 }}
            />
            <Text className="text-5xl font-bold text-blue-500 mb-7 mt-[33px]">
              {formatTime(tempTimeValue)}
            </Text>
            <Slider
              style={{ width: 300 }} minimumValue={0}  maximumValue={1440} step={1}
               onValueChange={handleSliderChange} minimumTrackTintColor="#3b82f6"
              maximumTrackTintColor="#e5e7eb" thumbTintColor="#3b82f6"
            />
            <View className="flex-row justify-between w-full mt-7">
              <TouchableOpacity className="flex-1 bg-gray-300 py-3 rounded-lg mr-2" onPress={handleCancel} >
                <Text className="text-gray-700 text-center text-lg font-medium">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-blue-500 py-3 rounded-lg ml-2" onPress={handleConfirm} >
                <Text className="text-white text-center text-lg font-bold">OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}