import { TemperatureLog } from './components/TemperatureLog';
import { CleaningChecklist } from './components/CleaningChecklist';
import { MealDocumentation } from './components/MealDocumentation';
import { FoodTrolleyMonitor } from './components/FoodTrolleyMonitor';
import { BeverageRefrigerationMonitor } from './components/BeverageRefrigerationMonitor';
import { CoffeeMachineCleaning } from './components/CoffeeMachineCleaning';
import { WaterDispenserCleaning } from './components/WaterDispenserCleaning';
import { NotesManager } from './components/NotesManager';
import { CSVDownload } from './components/CSVDownload';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Cafeteria HACCP Management
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <CSVDownload />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <MealDocumentation />
            <FoodTrolleyMonitor />
            <BeverageRefrigerationMonitor />
            <WaterDispenserCleaning />
          </div>
          <div className="space-y-6">
            <NotesManager />
            <CoffeeMachineCleaning />
            <TemperatureLog />
            <CleaningChecklist />
          </div>
        </div>
      </main>
    </div>
  );
}