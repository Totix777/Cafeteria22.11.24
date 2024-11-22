import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { WaterDispenserCleaning } from '../types/haccp';
import { db_operations } from '../lib/db';

export const WaterDispenserCleaning: React.FC = () => {
  const [cleaningLogs, setCleaningLogs] = useState<WaterDispenserCleaning[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<WaterDispenserCleaning>();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const data = await db_operations.getWaterDispenserCleanings();
        setCleaningLogs(data);
      } catch (err) {
        setError('Fehler beim Laden der Reinigungsprotokolle');
        console.error('Error fetching cleaning logs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const onSubmit = async (data: WaterDispenserCleaning) => {
    try {
      setLoading(true);
      await db_operations.saveWaterDispenserCleaning({
        ...data,
        id: crypto.randomUUID(),
        timestamp: new Date(),
      });
      
      const updatedLogs = await db_operations.getWaterDispenserCleanings();
      setCleaningLogs(updatedLogs);
      
      reset();
      setError(null);
    } catch (err) {
      setError('Fehler beim Speichern des Reinigungsprotokolls');
      console.error('Error saving cleaning log:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Wasserspender Reinigungsprotokoll</h2>
      
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Spender-ID</label>
          <input
            {...register('dispenserId')}
            placeholder="z.B. WS001"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-900">Reinigungsaufgaben</h3>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('tasks.nozzleCleaning')}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Ausgabedüse gereinigt</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('tasks.filterChange')}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Filter gewechselt</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('tasks.exteriorCleaning')}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Außenreinigung durchgeführt</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('tasks.dripTrayCleaning')}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Abtropfschale gereinigt</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('tasks.waterLevelCheck')}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Wasserstand kontrolliert</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('tasks.sanitization')}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Desinfektion durchgeführt</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nächster Filterwechsel</label>
          <input
            type="date"
            {...register('nextFilterChange')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('waterQualityChecked')}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Wasserqualität geprüft</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Durchgeführt von</label>
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
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Speichern...' : 'Reinigung Dokumentieren'}
        </button>
      </form>

      {loading && <div className="mt-4 text-center text-gray-600">Laden...</div>}

      {cleaningLogs.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Letzte Reinigungen</h3>
          <div className="space-y-2">
            {cleaningLogs.map((log) => (
              <div key={log.id} className="p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between">
                  <span className="font-medium">Spender {log.dispenserId}</span>
                  <span>{new Date(log.timestamp).toLocaleDateString()}</span>
                </div>
                <div className="mt-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span>Filter gewechselt: {log.tasks.filterChange ? '✓' : '✗'}</span>
                    <span>Düse gereinigt: {log.tasks.nozzleCleaning ? '✓' : '✗'}</span>
                    <span>Desinfektion: {log.tasks.sanitization ? '✓' : '✗'}</span>
                    <span>Wasserqualität: {log.waterQualityChecked ? '✓' : '✗'}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  <span>Durchgeführt von: {log.checkedBy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};