import React from 'react';
import { useForm } from 'react-hook-form';
import { TrolleyTemperature } from '../types/haccp';

interface TrolleyFormProps {
  type: 'warm' | 'kalt';
}

const TrolleyForm: React.FC<TrolleyFormProps> = ({ type }) => {
  const { register, handleSubmit, reset } = useForm<TrolleyTemperature>();
  const isWarm = type === 'warm';

  const onSubmit = (data: TrolleyTemperature) => {
    const fullData = {
      ...data,
      type,
      timestamp: new Date(),
    };
    console.log(fullData);
    // TODO: Implement submission logic
    reset();
  };

  const temperatureRange = isWarm ? 
    { min: 65, max: 100, warning: "Temperatur sollte über 65°C sein" } :
    { min: 0, max: 7, warning: "Temperatur sollte unter 7°C sein" };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {isWarm ? 'Warmhaltewagen' : 'Kühlwagen'} Temperaturkontrolle
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Wagen Nummer</label>
          <input
            {...register('trolleyId')}
            placeholder="z.B. W001"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Temperatur (°C)
            <span className="text-sm text-gray-500 ml-2">
              ({temperatureRange.warning})
            </span>
          </label>
          <input
            type="number"
            step="0.1"
            min={temperatureRange.min}
            max={temperatureRange.max}
            {...register('temperature')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Geprüft von</label>
          <input
            {...register('checkedBy')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Notizen</label>
          <textarea
            {...register('notes')}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Zusätzliche Bemerkungen..."
          />
        </div>

        <button
          type="submit"
          className={`w-full text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isWarm 
              ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'
          }`}
        >
          Temperatur Dokumentieren
        </button>
      </form>
    </div>
  );
};

export const FoodTrolleyMonitor: React.FC = () => {
  return (
    <div className="space-y-6">
      <TrolleyForm type="warm" />
      <TrolleyForm type="kalt" />
    </div>
  );
};