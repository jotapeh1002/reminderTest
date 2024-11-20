import { View, Text, ImageBackground, Image } from 'react-native';

export function DataHome() {

  const nameUser = 'Jotapeh'; // Trocar pelo nome do banco de dados nao esquece disso!!
  const todayDay = new Date();

  function getballs() {
    const balls = [];
    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    for (let index = -3; index <= 3; index++) {

      const day = new Date(todayDay);
      day.setDate(todayDay.getDate() + index);
      const weekDay = weekDays[day.getDay()];
      const istodayDay = day.getDate() === todayDay.getDate();

      balls.push(
        <View key={index} className={`mt-5 ${istodayDay && 'bg-slate-100 opacity-95'} justify-center h-16 rounded-2xl flex-1`}>
          <Text className={`text-[18px] font-bold ${istodayDay ? 'text-blue-500' : 'text-slate-300'} self-center`}>
            {weekDay.charAt(0)}
          </Text>
          <View className="flex-row self-center">
            <Text className={`my-auto text-[15px] mb-[2px] self-center text-md font-bold ${istodayDay ? 'text-blue-500' : 'text-slate-300'}`}>
              {day.getDate()}
            </Text>
            <Text className={`my-auto text-[11px] self-center text-md font-bold ${istodayDay ? 'text-blue-500' : 'text-slate-300'}`}>
              /{String(day.getMonth() + 1).padStart(2, '0')}
            </Text>
          </View>
        </View>
      );
    } return balls;
  }
  return (
    <ImageBackground style={{ height: 280 }} className={`w-full px-3`} blurRadius={8}
      source={require('../assets/fondo.jpg')}>
      <View className="overflow-hidden h-[95px] mt-5 bg-amber-600 p-[4px] w-[95px] border-2 border-gray-400 rounded-full self-center">
        <Image className="h-full w-full top-[4px]"
          source={require('../assets/user5.png')} />
      </View>
      <Text className="text-[26px]  mb-2 self-center text-white font-bold">{nameUser}</Text>
      <View className="h-full flex-row gap-2 sm:gap-4 md:gap-6 lg:gap-8 self-center ">{getballs()}</View>
    </ImageBackground>
  );
}