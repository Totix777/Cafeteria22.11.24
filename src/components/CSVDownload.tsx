import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export const CSVDownload: React.FC = () => {
  const generateCSV = (type: string) => {
    let csvContent = '';
    
    switch (type) {
      case 'speisekomponenten':
        csvContent = 'Datum,Uhrzeit,Komponente,Temperatur (°C),Optik,Geschmack,Geruch,Bemerkungen,Geprüft von\n';
        break;
      case 'waermewagen':
        csvContent = 'Datum,Uhrzeit,Wagen-Nr,Typ,Temperatur (°C),Bemerkungen,Geprüft von\n';
        break;
      case 'getraenkekuehlung':
        csvContent = 'Datum,Uhrzeit,Theken-ID,Temperatur (°C),Funktioniert,Bemerkungen,Geprüft von\n';
        break;
      case 'kaffeemaschine':
        csvContent = 'Datum,Reinigungsprogramm durchgeführt,Milchsystem gereinigt,Satzbehälter geleert,Außenreinigung,Abtropfschale,Entkalkung nötig,Bemerkungen,Durchgeführt von\n';
        break;
      case 'reinigung':
        csvContent = 'Datum,Bereich,Aufgaben,Status,Bemerkungen,Durchgeführt von\n';
        break;
      default:
        return;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${type}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">CSV Vorlagen Herunterladen</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {[
          { id: 'speisekomponenten', label: 'Speisekomponenten' },
          { id: 'waermewagen', label: 'Wärmewagen' },
          { id: 'getraenkekuehlung', label: 'Getränkekühlung' },
          { id: 'kaffeemaschine', label: 'Kaffeemaschine' },
          { id: 'reinigung', label: 'Reinigung' }
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => generateCSV(id)}
            className="flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};