import React from 'react';
import { useForm } from 'react-hook-form';
import { CleaningLog } from '../types/haccp';

export const CleaningChecklist: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<CleaningLog>();

  const cleaningTasks = [
    {
      area: 'Gläserregal',
      tasks: [
        'Gläser ausgeräumt',
        'Regalböden feucht gereinigt',
        'Regalböden desinfiziert',
        'Gläser auf Sauberkeit geprüft',
        'Gläser eingeräumt',
        'Regalkonstruktion abgewischt'
      ]
    },
    {
      area: 'Warmhaltewagen',
      tasks: [
        'Innenraum gründlich reinigen',
        'Türdichtungen säubern',
        'Ablageroste reinigen',
        'Außenflächen reinigen',
        'Räder/Rollen reinigen',
        'Temperaturanzeige reinigen',
        'Kondenswasser entfernen'
      ]
    },
    {
      area: 'Kühlwagen',
      tasks: [
        'Innenraum desinfizieren',
        'Türdichtungen prüfen und reinigen',
        'Ablageroste desinfizieren',
        'Außenflächen reinigen',
        'Räder/Rollen reinigen',
        'Temperaturanzeige reinigen',
        'Kondenswasser entfernen',
        'Kühlrippen reinigen'
      ]
    },
    {
      area: 'Müllentsorgung',
      tasks: [
        'Restmüll entsorgt',
        'Biomüll entsorgt',
        'Wertstoffe getrennt',
        'Müllbehälter gereinigt',
        'Neue Müllbeutel eingesetzt',
        'Müllraum aufgeräumt',
        'Mülltonnen Außenbereich kontrolliert'
      ]
    },
    {
      area: 'Spülbecken',
      tasks: [
        'Becken gründlich mit Reinigungsmittel säubern',
        'Armaturen reinigen und desinfizieren',
        'Abfluss kontrollieren und reinigen',
        'Umgebung trocken wischen'
      ]
    },
    {
      area: 'Arbeitstisch',
      tasks: [
        'Oberfläche reinigen und desinfizieren',
        'Unterbau abwischen',
        'Auf Beschädigungen prüfen'
      ]
    },
    {
      area: 'Allgemein',
      tasks: [
        'Boden',
        'Oberflächen',
        'Geräte',
        'Abfallentsorgung'
      ]
    }
  ];

  const onSubmit = (data: CleaningLog) => {
    console.log(data);
    // TODO: Implement submission logic
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Reinigungsprotokoll</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Bereich</label>
          <select
            {...register('area')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Bereich auswählen...</option>
            {cleaningTasks.map(({ area }) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Durchgeführt von</label>
          <input
            {...register('completedBy')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          {cleaningTasks.map(({ area, tasks }) => (
            <div key={area} className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">{area}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {tasks.map((task) => (
                  <label key={`${area}-${task}`} className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      {...register('tasks')}
                      value={`${area}: ${task}`}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{task}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Reinigung Dokumentieren
        </button>
      </form>
    </div>
  );
};