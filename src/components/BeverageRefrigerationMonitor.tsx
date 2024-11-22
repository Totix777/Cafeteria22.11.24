import React from 'react';
import { useForm } from 'react-hook-form';
import { BeverageRefrigeration } from '../types/haccp';

export const BeverageRefrigerationMonitor: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<BeverageRefrigeration>();

  const onSubmit = (data: BeverageRefrigeration) => {
    const fullData = {
      ...data,
      timestamp: new Date(),
    };
    console.log(fullData);
    // TODO: Implement submission logic
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Getränkekühltheke Temperaturkontrolle</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Theken-ID</label>
          <input
            {...register('counterId')}
            placeholder="z.B. GK001"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Temperatur (°C)
            <span className="text-sm text-gray-500 ml-2">
              (Sollte zwischen 4°C und 8°C liegen)
            </span>
          </label>
          <input
            type="number"
            step="0.1"
            min={0}
            max={10}
            {...register('temperature')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('isOperating')}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Kühlung funktioniert einwandfrei</span>
          </label>
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
          className="w-full bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          Temperatur Dokumentieren
        </button>
      </form>
    </div>
  );
};