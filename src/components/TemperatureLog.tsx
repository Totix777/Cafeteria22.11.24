import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Temperature } from '../types/haccp';
import { db_operations } from '../lib/db';

export const TemperatureLog: React.FC = () => {
  const [temperatures, setTemperatures] = useState<Temperature[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<Temperature>();

  useEffect(() => {
    const fetchTemperatures = async () => {
      try {
        setLoading(true);
        const data = await db_operations.getTemperatures();
        setTemperatures(data);
      } catch (err) {
        setError('Fehler beim Laden der Temperaturdaten');
        console.error('Error fetching temperatures:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemperatures();
  }, []);

  const onSubmit = async (data: Temperature) => {
    try {
      setLoading(true);
      await db_operations.saveTemperature({
        ...data,
        id: crypto.randomUUID(),
        timestamp: new Date(),
      });
      
      // Refresh the temperature list
      const updatedTemperatures = await db_operations.getTemperatures();
      setTemperatures(updatedTemperatures);
      
      reset();
      setError(null);
    } catch (err) {
      setError('Fehler beim Speichern der Temperatur');
      console.error('Error saving temperature:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Temperature Log</h2>
      
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            {...register('location')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
          <input
            type="number"
            step="0.1"
            {...register('temperature')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Checked By</label>
          <input
            {...register('checkedBy')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Speichern...' : 'Record Temperature'}
        </button>
      </form>

      {loading && <div className="mt-4 text-center text-gray-600">Laden...</div>}

      {temperatures.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Letzte Messungen</h3>
          <div className="space-y-2">
            {temperatures.map((temp) => (
              <div key={temp.id} className="p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between">
                  <span className="font-medium">{temp.location}</span>
                  <span>{temp.temperature}°C</span>
                </div>
                <div className="text-sm text-gray-500 flex justify-between mt-1">
                  <span>{temp.checkedBy}</span>
                  <span>{new Date(temp.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};