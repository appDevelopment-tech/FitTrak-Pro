import fs from 'fs';

// Читаем отсортированные упражнения
const data = fs.readFileSync('sorted_exercises.json', 'utf8');
const sortedExercises = JSON.parse(data);

// Функция для обновления упражнения
async function updateExercise(exercise) {
  const response = await fetch(`http://localhost:5000/api/exercises/${exercise.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: exercise.name,
      primaryMuscles: exercise.primaryMuscles,
      secondaryMuscles: exercise.secondaryMuscles,
      difficulty: exercise.difficulty,
      overview: exercise.overview,
      technique: exercise.technique,
      commonMistakes: exercise.commonMistakes,
      contraindications: exercise.contraindications,
      muscleImageUrl: exercise.muscleImageUrl,
      createdBy: exercise.createdBy
    }),
  });
  
  if (response.ok) {
    console.log(`Updated exercise ${exercise.id}: ${exercise.name}`);
  } else {
    console.error(`Failed to update exercise ${exercise.id}: ${exercise.name}`);
  }
}

// Обновляем все упражнения
for (const exercise of sortedExercises) {
  await updateExercise(exercise);
  // Небольшая задержка между запросами
  await new Promise(resolve => setTimeout(resolve, 100));
}

console.log('All exercises updated successfully!');