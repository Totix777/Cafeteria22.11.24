export interface Temperature {
  id: string;
  location: string;
  temperature: number;
  timestamp: Date;
  checkedBy: string;
}

export interface CleaningLog {
  id: string;
  area: string;
  completedBy: string;
  date: Date;
  tasks: string[];
  verified: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  supplier: string;
  receivedDate: Date;
  expiryDate: Date;
  storageLocation: string;
  temperature: number;
}

export interface MealComponent {
  id: string;
  name: string;
  temperature: number;
  dateTime: Date;
  checkedBy: string;
  appearance: 'gut' | 'akzeptabel' | 'nicht akzeptabel';
  taste: 'gut' | 'akzeptabel' | 'nicht akzeptabel';
  smell: 'gut' | 'akzeptabel' | 'nicht akzeptabel';
  notes: string;
}

export interface TrolleyTemperature {
  id: string;
  trolleyId: string;
  type: 'warm' | 'kalt';
  temperature: number;
  timestamp: Date;
  checkedBy: string;
  notes?: string;
}

export interface BeverageRefrigeration {
  id: string;
  counterId: string;
  temperature: number;
  timestamp: Date;
  checkedBy: string;
  notes?: string;
  isOperating: boolean;
}

export interface CoffeeMachineCleaning {
  id: string;
  machineId: string;
  timestamp: Date;
  checkedBy: string;
  tasks: {
    dailyCleaningProgram: boolean;
    milkSystemCleaning: boolean;
    groundsContainerEmpty: boolean;
    exteriorCleaning: boolean;
    dripTrayCleaning: boolean;
  };
  descalingNeeded: boolean;
  notes?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  images: NoteImage[];
  category: string;
  createdAt: Date;
  createdBy: string;
  priority: 'low' | 'medium' | 'high';
}

export interface NoteImage {
  id: string;
  dataUrl: string;
  caption: string;
}

export interface WaterDispenserCleaning {
  id: string;
  dispenserId: string;
  timestamp: Date;
  checkedBy: string;
  tasks: {
    nozzleCleaning: boolean;
    filterChange: boolean;
    exteriorCleaning: boolean;
    dripTrayCleaning: boolean;
    waterLevelCheck: boolean;
    sanitization: boolean;
  };
  nextFilterChange: Date;
  waterQualityChecked: boolean;
  notes?: string;
}