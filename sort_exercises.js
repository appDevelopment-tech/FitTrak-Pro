const fs = require('fs');

// Читаем данные упражнений
const data = fs.readFileSync('exercises.json', 'utf8');
const exercises = JSON.parse(data);

// Сортируем по алфавиту по полю name
const sortedExercises = exercises.sort((a, b) => {
  return a.name.localeCompare(b.name, 'ru');
});

// Переназначаем ID в порядке сортировки
sortedExercises.forEach((exercise, index) => {
  exercise.id = index + 1;
});

// Выводим отсортированный список с новыми ID
console.log(JSON.stringify(sortedExercises, null, 2));