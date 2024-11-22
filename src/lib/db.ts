import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';
import type { 
  Temperature,
  CleaningLog,
  MealComponent,
  TrolleyTemperature,
  BeverageRefrigeration,
  CoffeeMachineCleaning,
  WaterDispenserCleaning,
  Note
} from '../types/haccp';

// Collection names
const COLLECTIONS = {
  TEMPERATURES: 'temperatures',
  CLEANING_LOGS: 'cleaning_logs',
  MEAL_COMPONENTS: 'meal_components',
  TROLLEY_TEMPERATURES: 'trolley_temperatures',
  BEVERAGE_REFRIGERATION: 'beverage_refrigeration',
  COFFEE_MACHINE_CLEANING: 'coffee_machine_cleaning',
  WATER_DISPENSER_CLEANING: 'water_dispenser_cleaning',
  NOTES: 'notes'
} as const;

// Generic save function
async function saveToCollection<T>(collectionName: string, data: T) {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving document:', error);
    throw error;
  }
}

// Generic fetch function
async function getFromCollection<T>(collectionName: string, limitCount = 100) {
  try {
    const q = query(
      collection(db, collectionName),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
}

// Specific functions for each collection
export const db_operations = {
  // Temperature logs
  saveTemperature: (data: Temperature) => 
    saveToCollection(COLLECTIONS.TEMPERATURES, data),
  getTemperatures: () => 
    getFromCollection<Temperature>(COLLECTIONS.TEMPERATURES),

  // Cleaning logs
  saveCleaningLog: (data: CleaningLog) => 
    saveToCollection(COLLECTIONS.CLEANING_LOGS, data),
  getCleaningLogs: () => 
    getFromCollection<CleaningLog>(COLLECTIONS.CLEANING_LOGS),

  // Meal components
  saveMealComponent: (data: MealComponent) => 
    saveToCollection(COLLECTIONS.MEAL_COMPONENTS, data),
  getMealComponents: () => 
    getFromCollection<MealComponent>(COLLECTIONS.MEAL_COMPONENTS),

  // Trolley temperatures
  saveTrolleyTemperature: (data: TrolleyTemperature) => 
    saveToCollection(COLLECTIONS.TROLLEY_TEMPERATURES, data),
  getTrolleyTemperatures: () => 
    getFromCollection<TrolleyTemperature>(COLLECTIONS.TROLLEY_TEMPERATURES),

  // Beverage refrigeration
  saveBeverageRefrigeration: (data: BeverageRefrigeration) => 
    saveToCollection(COLLECTIONS.BEVERAGE_REFRIGERATION, data),
  getBeverageRefrigeration: () => 
    getFromCollection<BeverageRefrigeration>(COLLECTIONS.BEVERAGE_REFRIGERATION),

  // Coffee machine cleaning
  saveCoffeeMachineCleaning: (data: CoffeeMachineCleaning) => 
    saveToCollection(COLLECTIONS.COFFEE_MACHINE_CLEANING, data),
  getCoffeeMachineCleaning: () => 
    getFromCollection<CoffeeMachineCleaning>(COLLECTIONS.COFFEE_MACHINE_CLEANING),

  // Water dispenser cleaning
  saveWaterDispenserCleaning: (data: WaterDispenserCleaning) => 
    saveToCollection(COLLECTIONS.WATER_DISPENSER_CLEANING, data),
  getWaterDispenserCleanings: () => 
    getFromCollection<WaterDispenserCleaning>(COLLECTIONS.WATER_DISPENSER_CLEANING),

  // Notes
  saveNote: (data: Note) => 
    saveToCollection(COLLECTIONS.NOTES, data),
  getNotes: () => 
    getFromCollection<Note>(COLLECTIONS.NOTES)
};