import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';  

interface ModalTimerProps {
  modalVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export function ModalDelete({ modalVisible, onClose, onDelete }: ModalTimerProps) {
  const handleConfirm = () => {
    onDelete();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-4/5 h-[300px] bg-slate-200 rounded-xl p-6 justify-between items-center relative shadow-lg">
          <Text className="text-2xl font-bold text-blue-600 mb-4 mt-5">
            Deletar Alarme?
          </Text>
          <MaterialIcons name="warning" size={40} color="rgb(200,100,100)" className="bottom-2" />
          <Text className="text-xl text-gray-500 text-center">
            Esta ação não pode ser desfeita.
          </Text>
          <View className="flex-row w-full justify-around mt-5">
            <TouchableOpacity
              className="flex-1 bg-gray-400/40 py-3 rounded-lg mr-2"
              onPress={handleCancel}
            >
              <Text className="text-gray-700 text-center text-lg font-medium">
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-red-500 py-3 rounded-lg ml-2"
              onPress={handleConfirm}
            >
              <Text className="text-white text-center text-lg font-bold">
                Deletar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
