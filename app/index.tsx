import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import MedicFeed from './MedicFeed';
import { agendarNotificacao } from '~/components/Notifications';
import { select } from '../db/db';

export default function Home() {
  useEffect(() => {
    async function fetchData() {
      try {
        const medicamentsList = await select();
        const currentTime = new Date();
        const formattedTime = `${String(currentTime.getHours())}${String(currentTime.getMinutes()).padStart(2, '0')}`;
        const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
        const hoje = diasSemana[currentTime.getDay()];

        medicamentsList.forEach((medicament) => {
          console.log(`Medicamento: ${medicament.nameMedicament}`);
          console.log(`EspecificDay: ${medicament.especificDay}`); 

          let diasValidos = medicament.especificDay.split(',').map(dia => dia.trim());
          
          console.log(`Dias válidos para o medicamento ${medicament.nameMedicament}:`, diasValidos);
          
          if ((String(medicament.alarmHour) === formattedTime && diasValidos.includes(hoje))||(String(medicament.alarmHour)=== formattedTime && diasValidos.length < 1)) {
            if(diasValidos.includes(hoje)){
            agendarNotificacao(medicament.nameMedicament, medicament.quantityMedicament);
            }
          }
        });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <MedicFeed />
    </>
  );
}
