// Wger API integration through server proxy
const WGER_BASE_URL = '/api/wger';

export interface WgerExerciseRaw {
  id: number;
  uuid: string;
  created: string;
  last_update: string;
  category: number;
  muscles: number[];
  muscles_secondary: number[];
  equipment: number[];
  variations: number | null;
  license_author: string;
}

export interface WgerExerciseInfo {
  id: number;
  exercise: number;
  name: string;
  description: string;
  language: number;
}

export interface WgerCategory {
  id: number;
  name: string;
}

export interface WgerMuscle {
  id: number;
  name: string;
  name_en: string;
  is_front: boolean;
}

export interface WgerEquipment {
  id: number;
  name: string;
}

export interface WgerImage {
  id: number;
  exercise: number;
  image: string;
  is_main: boolean;
}

export interface ProcessedExercise {
  id: number;
  uuid: string;
  name: string;
  description: string;
  category: number;
  categoryName: string;
  muscles: number[];
  muscleNames: string[];
  muscles_secondary: number[];
  secondaryMuscleNames: string[];
  equipment: number[];
  equipmentNames: string[];
  variations: number | null;
  license_author: string;
  images: string[];
}

// Fetch functions for Wger API through server proxy
export async function fetchWgerExercises(language = 2): Promise<WgerExerciseRaw[]> {
  const response = await fetch(`${WGER_BASE_URL}/exercises?language=${language}&limit=50`);
  if (!response.ok) throw new Error('Failed to fetch exercises');
  const data = await response.json();
  return data.results;
}

export async function fetchWgerExerciseInfo(language = 2): Promise<WgerExerciseInfo[]> {
  const response = await fetch(`${WGER_BASE_URL}/exerciseinfo?language=${language}&limit=50`);
  if (!response.ok) throw new Error('Failed to fetch exercise info');
  const data = await response.json();
  return data.results;
}

export async function fetchWgerCategories(language = 2): Promise<WgerCategory[]> {
  const response = await fetch(`${WGER_BASE_URL}/categories?language=${language}`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  const data = await response.json();
  return data.results;
}

export async function fetchWgerMuscles(language = 2): Promise<WgerMuscle[]> {
  const response = await fetch(`${WGER_BASE_URL}/muscles?language=${language}`);
  if (!response.ok) throw new Error('Failed to fetch muscles');
  const data = await response.json();
  return data.results;
}

export async function fetchWgerEquipment(language = 2): Promise<WgerEquipment[]> {
  const response = await fetch(`${WGER_BASE_URL}/equipment?language=${language}`);
  if (!response.ok) throw new Error('Failed to fetch equipment');
  const data = await response.json();
  return data.results;
}

export async function fetchWgerImages(): Promise<WgerImage[]> {
  const response = await fetch(`${WGER_BASE_URL}/images?limit=100`);
  if (!response.ok) throw new Error('Failed to fetch images');
  const data = await response.json();
  return data.results;
}

// Helper function to process and combine all data
export async function fetchProcessedExercises(): Promise<ProcessedExercise[]> {
  try {
    console.log('Starting to fetch Wger data...');
    
    const [exercises, exerciseInfo, categories, muscles, equipment, images] = await Promise.all([
      fetchWgerExercises(),
      fetchWgerExerciseInfo(),
      fetchWgerCategories(),
      fetchWgerMuscles(),
      fetchWgerEquipment(),
      fetchWgerImages()
    ]);

    console.log('Raw data received:', {
      exercises: exercises.length,
      exerciseInfo: exerciseInfo.length,
      categories: categories.length,
      muscles: muscles.length,
      equipment: equipment.length,
      images: images.length
    });

    // Create lookup maps
    const infoMap = new Map(exerciseInfo.map(info => [info.exercise, info]));
    const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));
    const muscleMap = new Map(muscles.map(muscle => [muscle.id, muscle.name]));
    const equipmentMap = new Map(equipment.map(eq => [eq.id, eq.name]));
    const imageMap = new Map<number, string[]>();
    
    // Group images by exercise
    images.forEach(img => {
      if (!imageMap.has(img.exercise)) {
        imageMap.set(img.exercise, []);
      }
      imageMap.get(img.exercise)!.push(img.image);
    });

    console.log('Created lookup maps:', {
      infoMapSize: infoMap.size,
      categoryMapSize: categoryMap.size,
      muscleMapSize: muscleMap.size,
      equipmentMapSize: equipmentMap.size,
      imageMapSize: imageMap.size
    });

    // Process exercises
    const processedExercises = exercises
      .filter(exercise => infoMap.has(exercise.id)) // Only include exercises with info
      .map(exercise => {
        const info = infoMap.get(exercise.id)!;
        return {
          id: exercise.id,
          uuid: exercise.uuid,
          name: info.name,
          description: info.description,
          category: exercise.category,
          categoryName: categoryMap.get(exercise.category) || 'Unknown',
          muscles: exercise.muscles,
          muscleNames: exercise.muscles.map(id => muscleMap.get(id) || 'Unknown'),
          muscles_secondary: exercise.muscles_secondary,
          secondaryMuscleNames: exercise.muscles_secondary.map(id => muscleMap.get(id) || 'Unknown'),
          equipment: exercise.equipment,
          equipmentNames: exercise.equipment.map(id => equipmentMap.get(id) || 'Unknown'),
          variations: exercise.variations,
          license_author: exercise.license_author,
          images: imageMap.get(exercise.id) || []
        };
      });

    console.log('Processed exercises:', processedExercises.length);
    console.log('Sample exercise:', processedExercises[0]);
    
    return processedExercises;
  } catch (error) {
    console.error('Error fetching Wger data:', error);
    throw error;
  }
}