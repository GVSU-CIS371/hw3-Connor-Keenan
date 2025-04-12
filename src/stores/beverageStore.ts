import { defineStore } from "pinia";
import { ref } from 'vue';
import { 
  getFirestore, 
  collection, 
  getDocs,
  addDoc
} from 'firebase/firestore';
import { 
  BaseBeverageType, 
  CreamerType, 
  SyrupType, 
  BeverageType 
} from "../types/beverage";

export const useBeverageStore = defineStore("BeverageStore", () => {
  // State
  const temps = ref(["Hot", "Cold"]);
  const currentTemp = ref("Hot");
  const bases = ref<BaseBeverageType[]>([]);
  const currentBase = ref<BaseBeverageType | null>(null);
  const syrups = ref<SyrupType[]>([]);
  const currentSyrup = ref<SyrupType | null>(null);
  const creamers = ref<CreamerType[]>([]);
  const currentCreamer = ref<CreamerType | null>(null);
  const beverages = ref<BeverageType[]>([]);
  const currentBeverage = ref<BeverageType | null>(null);
  const currentName = ref("");

  // Actions
  async function init() {
    const db = getFirestore();

    try {
      // Fetch bases
      const basesSnapshot = await getDocs(collection(db, 'bases'));
      bases.value = basesSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as BaseBeverageType));

      // Fetch creamers
      const creatmersSnapshot = await getDocs(collection(db, 'creamers'));
      creamers.value = creatmersSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as CreamerType));

      // Fetch syrups
      const syrupsSnapshot = await getDocs(collection(db, 'syrups'));
      syrups.value = syrupsSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as SyrupType));

      // Fetch saved beverages
      const beveragesSnapshot = await getDocs(collection(db, 'beverages'));
      beverages.value = beveragesSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as BeverageType));

      // Set default values
      currentBase.value = bases.value[0];
      currentCreamer.value = creamers.value[0];
      currentSyrup.value = syrups.value[0];
    } catch (error) {
      console.error('Error initializing store:', error);
    }
  }

  async function makeBeverage() {
    if (!currentName.value.trim()) {
      alert('Please give your beverage a name!');
      return;
    }

    const db = getFirestore();

    const newBeverage = {
      name: currentName.value,
      id: `${currentBase.value?.id}-${currentSyrup.value?.id}-${currentCreamer.value?.id}`,
      temp: currentTemp.value,
      base: currentBase.value!,
      syrup: currentSyrup.value!,
      creamer: currentCreamer.value!,
    };
    
    try {
      // Save to Firestore
      const docRef = await addDoc(collection(db, 'beverages'), newBeverage);
      
      // Add the document ID to the beverage
      newBeverage.id = docRef.id;
      
      // Add to local state
      beverages.value.push(newBeverage);
      currentBeverage.value = newBeverage;
      
      // Reset name
      currentName.value = '';
    } catch (error) {
      console.error('Error saving beverage:', error);
    }
  }

  function showBeverage(beverage: BeverageType) {
    currentBeverage.value = beverage;
    currentName.value = beverage.name;
    currentTemp.value = beverage.temp;
    currentBase.value = beverage.base;
    currentSyrup.value = beverage.syrup;
    currentCreamer.value = beverage.creamer;
  }

  return {
    // State
    temps,
    currentTemp,
    bases,
    currentBase,
    syrups,
    currentSyrup,
    creamers,
    currentCreamer,
    beverages,
    currentBeverage,
    currentName,

    // Actions
    init,
    makeBeverage,
    showBeverage,
  };
}, {
  persist: {
    storage: localStorage,
  }
});