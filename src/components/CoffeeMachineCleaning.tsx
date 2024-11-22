import { useForm } from 'react-hook-form';
import type { CoffeeMachineCleaning as CoffeeMachineCleaningType } from '../types/haccp';

export const CoffeeMachineCleaning = () => {
  const { register, handleSubmit, reset } = useForm<CoffeeMachineCleaningType>();

  const onSubmit = (data: CoffeeMachineCleaningType) => {
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
      <h2 className="text-2xl font-bold mb-4">Kaffeemaschine Reinigungsprotokoll</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Maschinen-ID</label>
          <input
            {...register('machineId')}
            placeholder="z.B. KM001"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-900">Reinigungsaufgaben</h3>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('tasks.dailyCleaningProgram')}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Tägliches Reinigungsprogramm durchgeführt</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('tasks.milkSystemCleaning')}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Milchsystem gereinigt</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('tasks.groundsContainerEmpty')}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Kaffeesatzbehälter geleert</span>
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
        </div>

        <div className="pt-2">
          <label className="flex items-center space-x-2 text-amber-600">
            <input
              type="checkbox"
              {...register('descalingNeeded')}
              className="rounded border-gray-300 text-amber-600 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            />
            <span className="text-sm font-medium">Entkalkung erforderlich</span>
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
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Reinigung Dokumentieren
        </button>
      </form>
    </div>
  );
};