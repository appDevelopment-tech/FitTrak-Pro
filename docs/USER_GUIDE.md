# FitTrak-Pro User Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Managing Muscle Groups](#managing-muscle-groups)
4. [Managing Exercises](#managing-exercises)
5. [Working with Students](#working-with-students)
6. [Creating Training Plans](#creating-training-plans)
7. [Scheduling Sessions](#scheduling-sessions)
8. [Tracking Progress](#tracking-progress)
9. [Tips and Best Practices](#tips-and-best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Introduction

FitTrak-Pro is a comprehensive fitness training management application designed for personal trainers to manage their students, create custom workout programs, track progress, and schedule training sessions.

### Key Features

- **Student Management:** Maintain detailed student profiles with health information and consent tracking
- **Exercise Database:** Build and manage a library of exercises with muscle group categorization
- **Muscle Groups Management:** Create and organize muscle group categories
- **Training Plans:** Design custom workout programs for each student
- **Progress Tracking:** Monitor student performance and workout history
- **Scheduling:** Schedule and manage training sessions
- **Russian Localization:** Full support for Russian fitness terminology

---

## Getting Started

### Logging In

1. Navigate to the FitTrak-Pro application
2. Enter your trainer credentials (username and password)
3. Click "Войти" (Login)

### Dashboard Overview

After logging in, you'll see the main dashboard with:
- Navigation menu
- Quick stats (number of students, upcoming sessions)
- Recent activity

### Navigation

The main navigation includes:
- **Главная** (Home) - Dashboard
- **Профиль** (Profile) - Your trainer profile and settings
  - **Упражнения** (Exercises) - Exercise management
  - **Группы мышц** (Muscle Groups) - Muscle group management
- **Ученики** (Students) - Student management
- **Расписание** (Schedule) - Session scheduling
- **Тренировки** (Workouts) - Active workouts

---

## Managing Muscle Groups

Muscle groups are the foundation for categorizing exercises. Before creating exercises, you should set up your muscle group categories.

### Accessing Muscle Groups

1. Click **Профиль** (Profile) in the navigation
2. Click the **Группы мышц** (Muscle Groups) tab

### Creating a New Muscle Group

**Step 1: Open Create Dialog**
1. Click the **"Добавить группу"** (Add Group) button in the top-right corner
2. A dialog will open with a form

**Step 2: Fill in Details**
- **Название** (Name) - Required
  - Enter the muscle group name in Russian
  - Examples: "грудь", "спина", "ноги", "руки", "плечи"
  - Must be unique (no duplicates)

- **Описание** (Description) - Optional
  - Add a brief description
  - Example: "Грудные мышцы" for "грудь"

**Step 3: Save**
1. Click **"Создать"** (Create)
2. You'll see a success notification
3. The new muscle group appears in the list

**Example:**
```
Name: пресс
Description: Мышцы брюшного пресса
```

### Editing an Existing Muscle Group

**Step 1: Find the Muscle Group**
1. Locate the muscle group in the list
2. Each group shows:
   - Grip icon (for future drag-and-drop)
   - Name and description
   - Edit and Delete buttons

**Step 2: Open Edit Dialog**
1. Click the **Edit** button (pencil icon)
2. The edit dialog opens with pre-filled information

**Step 3: Make Changes**
1. Modify the name or description
2. Click **"Сохранить"** (Save)
3. You'll see a success notification

### Deleting a Muscle Group

**Important:** Deleting a muscle group doesn't automatically update exercises that reference it. Exercises will still show the old muscle group name.

**Step 1: Select Muscle Group**
1. Click the **Delete** button (trash icon) next to the muscle group

**Step 2: Confirm Deletion**
1. A confirmation dialog appears
2. Read the warning: "Вы уверены, что хотите удалить группу '{name}'? Это действие нельзя отменить."
3. Click **"Удалить"** (Delete) to confirm
4. Click **"Отмена"** (Cancel) to abort

**Best Practice:** Before deleting a muscle group, check if any exercises use it. Consider renaming instead of deleting.

### Default Muscle Groups

The system comes pre-configured with common muscle groups:
1. **грудь** - Chest muscles
2. **спина** - Back muscles
3. **ноги** - Leg muscles
4. **руки** - Arm muscles
5. **плечи** - Shoulder muscles
6. **ягодичные** - Glute muscles
7. **живот** - Abdominal muscles

### Muscle Group Display Order

Muscle groups are displayed in a specific order controlled by the `display_order` field. Currently, reordering requires database access, but drag-and-drop functionality is planned for a future update.

---

## Managing Exercises

The exercise database is the core of your training programs. Each exercise includes detailed information about technique, muscles worked, and safety considerations.

### Accessing Exercise Management

1. Click **Профиль** (Profile) in the navigation
2. Click the **Упражнения** (Exercises) tab (default tab)

### Filtering and Searching Exercises

**Search by Name:**
1. Use the search box at the top of the page
2. Type any part of the exercise name
3. Results filter in real-time
4. Search is case-insensitive

**Filter by Muscle Group:**
1. Use the "Группа мышц" (Muscle Group) dropdown
2. Select a specific muscle group
3. Only exercises with that primary muscle group will show
4. Select "Все группы" (All Groups) to clear the filter

**Combined Filtering:**
- You can use search and muscle group filter together
- Both filters must match for an exercise to appear

### Creating a New Exercise

**Step 1: Open Create Dialog**
1. Click **"Добавить упражнение"** (Add Exercise) button
2. A large dialog opens with a comprehensive form

**Step 2: Basic Information**

Fill in the basic details (top section):

- **Название упражнения** (Exercise Name) - Required
  - Enter the Russian name
  - Examples: "Отжимания", "Приседания", "Жим лежа"

- **Сложность** (Difficulty) - Required
  - Select from dropdown:
    - **начинающий** (Beginner) - Blue badge
    - **средний** (Intermediate) - Green badge
    - **продвинутый** (Advanced) - Red badge

- **Ссылка на изображение мышц** (Muscle Image URL) - Optional
  - Paste a URL to an image showing the muscles worked
  - Example: `https://example.com/muscles.jpg`

- **Изображение с техникой выполнения** (Technique Image URL) - Optional
  - Paste a URL to an image demonstrating the technique
  - You can upload to any image hosting service and paste the link

**Step 3: Overview**

- **Обзор упражнения** (Exercise Overview) - Required
  - Write a brief description of the exercise
  - Example: "Базовое упражнение для развития грудных мышц и трицепсов"
  - This appears in the exercise card preview

**Step 4: Select Muscle Groups**

**Primary Muscles (Основные группы мышц):**
- Click on muscle group badges to toggle selection
- Selected badges are highlighted (filled)
- At least one primary muscle is required
- Examples for push-ups: "грудь", "руки"

**Secondary Muscles (Вспомогательные группы мышц):**
- Click on muscle group badges to toggle selection
- Selected badges are highlighted (filled, but lighter)
- Optional, can be empty
- Examples for push-ups: "плечи", "живот"

**Step 5: Technique Steps**

Add step-by-step instructions:

1. Each step has its own input field
2. Fill in "Шаг 1", "Шаг 2", etc.
3. Click **"Добавить шаг"** (Add Step) to add more steps
4. Click the trash icon to remove a step
5. Minimum 1 step required

**Example for Push-ups:**
```
Шаг 1: Примите упор лежа, руки на ширине плеч
Шаг 2: Опуститесь до касания грудью пола
Шаг 3: Выпрямите руки, вернувшись в исходное положение
Шаг 4: Сохраняйте прямую линию тела на протяжении всего упражнения
```

**Step 6: Common Mistakes**

Add common mistakes and how to fix them:

1. Each mistake has its own input field
2. Describe the mistake and correction
3. Click **"Добавить ошибку"** (Add Mistake) for more
4. Click trash icon to remove
5. Optional - can be empty

**Example:**
```
Ошибка 1: Провисание поясницы - держите пресс напряженным
Ошибка 2: Отведение локтей в стороны - прижимайте локти к телу
Ошибка 3: Неполная амплитуда - опускайтесь до касания грудью пола
```

**Step 7: Contraindications**

Add medical contraindications:

1. Each contraindication has its own input field
2. List conditions where this exercise should be avoided
3. Click **"Добавить противопоказание"** (Add Contraindication) for more
4. Click trash icon to remove
5. Optional - can be empty

**Example:**
```
Противопоказание 1: Травмы плечевых суставов
Противопоказание 2: Острые боли в запястьях
Противопоказание 3: Недавние операции на грудной клетке
```

**Step 8: Submit**

1. Review all information
2. Click **"Создать"** (Create)
3. If successful, you'll see "Упражнение создано успешно"
4. The dialog closes and the new exercise appears in the list

### Viewing Exercise Details

**Step 1: Find the Exercise**
1. Use search or filter to locate the exercise
2. Each exercise card shows:
   - Exercise image (placeholder icon)
   - Name
   - Muscle group badges (primary in blue, secondary in gray)
   - Difficulty badge (color-coded)
   - Overview (truncated to 2 lines)
   - Action buttons

**Step 2: Open View Dialog**
1. Click **"Просмотр"** (View) button
2. A detailed view dialog opens

**What You'll See:**
- Large exercise image
- Basic information (name, difficulty)
- Muscle groups (primary and secondary)
- Full overview
- Muscle diagram (if provided)
- Technique steps (numbered list)
- Common mistakes (bulleted list)
- Contraindications (bulleted list)

### Editing an Exercise

**Step 1: Select Exercise**
1. Find the exercise you want to edit
2. Click the **Edit** button (pencil icon)

**Step 2: Make Changes**
1. The edit dialog opens with all fields pre-filled
2. Modify any fields you want to change
3. The form is identical to the create form

**Step 3: Save**
1. Click **"Обновить"** (Update)
2. If successful, you'll see "Упражнение обновлено успешно"
3. Changes are immediately visible

### Deleting an Exercise

**Important:** Deleting an exercise may affect workout programs and training plans that use it.

**Step 1: Select Exercise**
1. Find the exercise you want to delete
2. Click the **Delete** button (trash icon)

**Step 2: Confirm Deletion**
1. A confirmation dialog appears
2. Warning: "Это действие нельзя отменить. Упражнение '{name}' будет удалено навсегда."
3. Click **"Удалить"** (Delete) to confirm (red button)
4. Click **"Отмена"** (Cancel) to abort

**Best Practice:** Check if the exercise is used in any active training plans before deleting.

### Understanding Exercise Cards

Each exercise card displays:

**Header:**
- Exercise icon/image (left)
- Exercise name (bold)
- Muscle group badges:
  - Blue badges = Primary muscles
  - Gray badges = Secondary muscles

**Body:**
- Difficulty level with color coding:
  - Blue = Beginner (начинающий)
  - Green = Intermediate (средний)
  - Red = Advanced (продвинутый)
- Overview text (truncated)

**Footer:**
- View button (eye icon) - Opens detail view
- Edit button (pencil icon) - Opens edit form
- Delete button (trash icon) - Deletes exercise

---

## Working with Students

*(To be expanded in future updates)*

### Adding a New Student

1. Navigate to **Ученики** (Students)
2. Click **"Добавить ученика"** (Add Student)
3. Fill in student details:
   - Personal information (name, contact, birthdate)
   - Physical stats (height, weight)
   - Goals and medical notes
   - Parent/guardian info (for minors under 16)
4. Click **"Создать"** (Create)

### Managing Student Profiles

- View student details
- Edit student information
- Track consent and documentation status
- View training history

---

## Creating Training Plans

*(To be expanded in future updates)*

### Designing a Custom Plan

1. Select a student
2. Click **"Создать план"** (Create Plan)
3. Give the plan a name
4. Add exercises from your database
5. Set sets, reps, and weights for each exercise
6. Save and activate the plan

---

## Scheduling Sessions

*(To be expanded in future updates)*

### Creating an Appointment

1. Navigate to **Расписание** (Schedule)
2. Click on a date/time slot
3. Select the student
4. Add any notes
5. Confirm the appointment

---

## Tracking Progress

*(To be expanded in future updates)*

### Recording a Workout Session

1. Start an active workout
2. Log exercises, sets, reps, and weights
3. Add notes about performance
4. Complete and save the session

### Viewing History

- Access student workout history
- View progress charts
- Export reports

---

## Tips and Best Practices

### Muscle Groups

1. **Keep it simple:** Start with 7-10 main muscle groups
2. **Use Russian names:** Stay consistent with Russian terminology
3. **Add descriptions:** Help differentiate similar muscle groups
4. **Plan before deleting:** Check exercise references before removing groups

### Exercises

1. **Be detailed:** More information = better training
2. **Use images:** Visual aids improve understanding
3. **Include progressions:** Create variations (beginner to advanced)
4. **Update regularly:** Keep exercise database current
5. **Standardize naming:** Use consistent Russian terminology

**Naming Conventions:**
- Use lowercase for consistency
- Include equipment if specific: "жим штанги лежа" vs "жим гантелей лежа"
- Be specific: "приседания со штангой на спине" vs just "приседания"

### Technique Instructions

1. **Number steps clearly:** Use sequential numbering
2. **One action per step:** Keep steps simple and focused
3. **Include breathing cues:** Mention when to inhale/exhale
4. **Note body position:** Describe proper form and alignment

### Common Mistakes

1. **Be specific:** Don't just say "bad form"
2. **Include corrections:** Tell how to fix the mistake
3. **Prioritize safety:** Focus on injury-preventing corrections first

### Contraindications

1. **Be conservative:** Better safe than sorry
2. **Include acute and chronic conditions:** Cover immediate and long-term issues
3. **Reference medical conditions:** Use proper medical terminology

---

## Troubleshooting

### Muscle Groups

**Problem:** Can't create muscle group - "Name already exists"
- **Solution:** Check existing muscle groups for duplicates
- Use a different name or edit the existing one

**Problem:** Deleted muscle group still appears in exercises
- **Solution:** This is expected behavior
- Exercises use TEXT arrays, not foreign keys
- Edit affected exercises manually to update muscle groups

**Problem:** Muscle groups not loading
- **Solution:** Check internet connection
- Refresh the page
- Contact support if issue persists

### Exercises

**Problem:** Can't save exercise - Missing required field
- **Solution:** Check that you've filled in:
  - Exercise name
  - Difficulty level
  - Overview
  - At least one primary muscle group
  - At least one technique step

**Problem:** Image URLs not working
- **Solution:**
  - Verify the URL is publicly accessible
  - Use direct image links (ends in .jpg, .png, etc.)
  - Try a different image hosting service
  - Check CORS policy if loading from external domain

**Problem:** Exercise not appearing in filter
- **Solution:**
  - Check that the muscle group is set as PRIMARY (not secondary)
  - Clear all filters and search again
  - Verify the exercise was saved successfully

**Problem:** Can't delete exercise
- **Solution:**
  - Check if exercise is used in active workouts
  - You may need to remove from workouts first
  - Contact support if issue persists

### General Issues

**Problem:** Changes not saving
- **Solution:**
  - Check internet connection
  - Look for error notifications (red toasts)
  - Try refreshing the page
  - Check browser console for errors

**Problem:** Slow performance
- **Solution:**
  - Clear browser cache
  - Close unused tabs
  - Check internet connection speed
  - Try a different browser

**Problem:** Data not loading
- **Solution:**
  - Refresh the page
  - Check Supabase service status
  - Verify authentication (try logging out and back in)
  - Clear browser cache and cookies

---

## Keyboard Shortcuts

*(Planned for future update)*

- `Ctrl/Cmd + K` - Quick search
- `Ctrl/Cmd + N` - New exercise
- `Esc` - Close dialog
- `Enter` - Submit form

---

## Getting Help

### Support Resources

- **Documentation:** Full API and component docs in `/docs/`
- **In-App Help:** Look for (?) icons throughout the app
- **Error Messages:** Read error toasts for specific guidance

### Reporting Issues

When reporting a problem, include:
1. What you were trying to do
2. What happened instead
3. Error messages (if any)
4. Browser and version
5. Steps to reproduce

### Feature Requests

Have an idea? We'd love to hear it! Consider:
- How would this feature help trainers?
- What problem does it solve?
- Any examples from other apps?

---

## Glossary

### Russian Terms

- **Группа мышц** - Muscle group
- **Упражнение** - Exercise
- **Сложность** - Difficulty
- **Начинающий** - Beginner
- **Средний** - Intermediate
- **Продвинутый** - Advanced
- **Техника выполнения** - Execution technique
- **Частые ошибки** - Common mistakes
- **Противопоказания** - Contraindications
- **Ученик** - Student
- **Тренировка** - Workout
- **План тренировок** - Training plan

### Common Muscle Groups

- **грудь** - Chest
- **спина** - Back
- **ноги** - Legs
- **руки** - Arms
- **плечи** - Shoulders
- **ягодичные** - Glutes
- **живот/пресс** - Abs/Core

---

## Appendix: Workflow Examples

### Example Workflow 1: Setting Up a New Trainer Account

1. Create muscle group categories
2. Import or create 20-30 basic exercises
3. Add your first student
4. Create a training plan for the student
5. Schedule first session

### Example Workflow 2: Preparing for a Training Session

1. Check schedule for upcoming sessions
2. Review student's current training plan
3. Review student's recent workout history
4. Prepare any notes or modifications
5. Start active workout when student arrives

### Example Workflow 3: Expanding Exercise Database

1. Research new exercise
2. Create muscle group if needed (e.g., "трапеции")
3. Add exercise with full details
4. Create variations (beginner, intermediate, advanced)
5. Test in a training plan
6. Refine based on feedback

---

## Version History

**v1.0** - Initial release
- Muscle groups management
- Exercise management
- Student profiles
- Basic training plans

**Future Versions:**
- v1.1 - Drag-and-drop muscle group reordering
- v1.2 - Exercise templates and import/export
- v1.3 - Advanced analytics and progress tracking
- v2.0 - Mobile app

---

*Last updated: October 3, 2025*
