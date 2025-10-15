# Muscle Groups & Exercise Management API

## Overview

This document provides comprehensive API documentation for the muscle groups and exercise management features in FitTrak-Pro. The system uses Supabase (PostgreSQL) for data persistence with a React Query-based frontend layer.

**Key Features:**
- Dynamic muscle group management with CRUD operations
- Exercise management integrated with muscle groups
- Real-time data synchronization via React Query
- Optimistic UI updates for better UX
- Type-safe operations with TypeScript

---

## Table of Contents

1. [Muscle Groups API](#muscle-groups-api)
2. [Exercises API](#exercises-api)
3. [Data Types](#data-types)
4. [Error Handling](#error-handling)
5. [Code Examples](#code-examples)

---

## Muscle Groups API

### Database Schema

**Table:** `muscle_groups`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | SERIAL | PRIMARY KEY | Auto-incrementing identifier |
| `name` | TEXT | NOT NULL, UNIQUE | Russian muscle group name |
| `description` | TEXT | NULLABLE | Optional description |
| `display_order` | INTEGER | NOT NULL, UNIQUE, DEFAULT 0 | Display ordering (0-based) |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `muscle_groups_pkey` on `id` (PRIMARY KEY)
- `muscle_groups_name_key` on `name` (UNIQUE)
- `muscle_groups_display_order_key` on `display_order` (UNIQUE)
- `idx_muscle_groups_display_order` on `display_order` (PERFORMANCE)

---

### 1. Get All Muscle Groups

**Query Key:** `['muscleGroups']`

**Operation:**
```typescript
const { data, error } = await supabase
  .from('muscle_groups')
  .select('*')
  .order('display_order', { ascending: true });
```

**Response:**
```typescript
{
  data: MuscleGroup[] | null,
  error: PostgrestError | null
}
```

**Example Response:**
```json
[
  {
    "id": 1,
    "name": "грудь",
    "description": "Грудные мышцы",
    "display_order": 0,
    "created_at": "2025-10-03T10:00:00.000Z",
    "updated_at": "2025-10-03T10:00:00.000Z"
  },
  {
    "id": 2,
    "name": "спина",
    "description": "Мышцы спины",
    "display_order": 1,
    "created_at": "2025-10-03T10:00:00.000Z",
    "updated_at": "2025-10-03T10:00:00.000Z"
  }
]
```

**React Query Hook:**
```typescript
const { data: muscleGroups = [], isLoading } = useQuery<MuscleGroup[]>({
  queryKey: ['muscleGroups'],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('muscle_groups')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return data || [];
  },
});
```

**Error Scenarios:**
- Database connection failure
- Network timeout
- Insufficient permissions (RLS policies)

---

### 2. Create Muscle Group

**Mutation:**
```typescript
const { data, error } = await supabase
  .from('muscle_groups')
  .insert({
    name: string,
    description: string | null,
    display_order: number
  })
  .select()
  .single();
```

**Request Payload:**
```typescript
{
  name: string;          // Required, unique
  description: string;   // Optional
  display_order: number; // Auto-calculated (max + 1)
}
```

**Example Request:**
```json
{
  "name": "пресс",
  "description": "Мышцы брюшного пресса",
  "display_order": 7
}
```

**Response:**
```typescript
{
  data: MuscleGroup | null,
  error: PostgrestError | null
}
```

**React Query Mutation:**
```typescript
const createMutation = useMutation({
  mutationFn: async (data: { name: string; description: string }) => {
    const maxOrder = muscleGroups.reduce((max, g) => Math.max(max, g.display_order), 0);
    const { data: newGroup, error } = await supabase
      .from('muscle_groups')
      .insert({
        name: data.name,
        description: data.description || null,
        display_order: maxOrder + 1
      })
      .select()
      .single();
    if (error) throw error;
    return newGroup;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['muscleGroups'] });
    toast({ title: "Группа мышц создана" });
  },
  onError: (error: any) => {
    toast({
      title: "Ошибка создания",
      description: error.message,
      variant: "destructive"
    });
  }
});
```

**Validation Rules:**
- `name`: Required, must be non-empty string, must be unique
- `description`: Optional string
- `display_order`: Auto-calculated based on existing groups

**Error Scenarios:**
- Duplicate name (UNIQUE constraint violation)
- Duplicate display_order (UNIQUE constraint violation)
- Missing required field (name)
- Invalid data type

---

### 3. Update Muscle Group

**Mutation:**
```typescript
const { data, error } = await supabase
  .from('muscle_groups')
  .update({
    name: string,
    description: string | null,
    updated_at: string // ISO 8601 timestamp
  })
  .eq('id', number)
  .select()
  .single();
```

**Request Payload:**
```typescript
{
  id: number;           // Target record ID
  data: {
    name: string;       // Optional (but should not be empty)
    description: string; // Optional
  }
}
```

**Example Request:**
```json
{
  "id": 1,
  "data": {
    "name": "грудь",
    "description": "Большая и малая грудные мышцы"
  }
}
```

**Response:**
```typescript
{
  data: MuscleGroup | null,
  error: PostgrestError | null
}
```

**React Query Mutation:**
```typescript
const updateMutation = useMutation({
  mutationFn: async ({ id, data }: { id: number; data: { name: string; description: string } }) => {
    const { data: updated, error } = await supabase
      .from('muscle_groups')
      .update({
        name: data.name,
        description: data.description || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return updated;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['muscleGroups'] });
    toast({ title: "Группа мышц обновлена" });
  },
  onError: (error: any) => {
    toast({
      title: "Ошибка обновления",
      description: error.message,
      variant: "destructive"
    });
  }
});
```

**Validation Rules:**
- `id`: Must exist in database
- `name`: If provided, must be non-empty and unique
- `description`: Optional
- `updated_at`: Auto-set to current timestamp

**Error Scenarios:**
- Record not found
- Duplicate name (if changing to existing name)
- Invalid ID

---

### 4. Delete Muscle Group

**Mutation:**
```typescript
const { error } = await supabase
  .from('muscle_groups')
  .delete()
  .eq('id', number);
```

**Request Payload:**
```typescript
{
  id: number; // ID of muscle group to delete
}
```

**Response:**
```typescript
{
  error: PostgrestError | null
}
```

**React Query Mutation:**
```typescript
const deleteMutation = useMutation({
  mutationFn: async (id: number) => {
    const { error } = await supabase
      .from('muscle_groups')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['muscleGroups'] });
    toast({ title: "Группа мышц удалена" });
  },
  onError: (error: any) => {
    toast({
      title: "Ошибка удаления",
      description: error.message,
      variant: "destructive"
    });
  }
});
```

**Important Considerations:**
- **Referential Integrity:** Deleting a muscle group may affect exercises that reference it
- **Foreign Key Constraints:** Currently, exercises use TEXT arrays for muscle groups (no FK constraint)
- **Data Orphaning:** Exercises referencing deleted muscle groups will retain the old name in their arrays
- **Recommendation:** Consider implementing soft deletes or cascade updates

**Error Scenarios:**
- Record not found
- Foreign key constraint violation (if FK implemented in future)
- Insufficient permissions

---

## Exercises API

### Database Schema

**Table:** `exercises`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | SERIAL | PRIMARY KEY | Auto-incrementing identifier |
| `name` | TEXT | NOT NULL | Russian exercise name |
| `primaryMuscles` | TEXT[] | NOT NULL | Array of primary muscle groups |
| `secondaryMuscles` | TEXT[] | NOT NULL, DEFAULT '{}' | Array of secondary muscle groups |
| `difficulty` | TEXT | NOT NULL | 'начинающий', 'средний', 'продвинутый' |
| `overview` | TEXT | NOT NULL | Exercise description |
| `technique` | TEXT[] | NOT NULL | Step-by-step instructions |
| `commonMistakes` | TEXT[] | NOT NULL | Common mistakes |
| `contraindications` | TEXT[] | NOT NULL | Medical contraindications |
| `muscleImageUrl` | TEXT | NULLABLE | URL to muscle diagram image |
| `videoUrl` | TEXT | NULLABLE | URL to technique video |
| `techniqueImageUrl` | TEXT | NULLABLE | URL to technique image |
| `createdBy` | INTEGER | NULLABLE | Trainer ID who created |
| `createdAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updatedAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Note:** The `exercises` table uses TEXT arrays for muscle groups instead of foreign keys. This provides flexibility but requires manual synchronization with the `muscle_groups` table.

---

### 1. Get All Exercises

**Query Key:** `['exercises']`

**Database Operation (via exercisesDb):**
```typescript
async getAll() {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .order('"createdAt"', { ascending: false });
  if (error) throw error;
  return data as Exercise[];
}
```

**Response:**
```typescript
Exercise[] // Array of exercise objects
```

**Example Response:**
```json
[
  {
    "id": 1,
    "name": "Отжимания",
    "primaryMuscles": ["грудь", "руки"],
    "secondaryMuscles": ["плечи", "живот"],
    "difficulty": "начинающий",
    "overview": "Базовое упражнение для развития грудных мышц",
    "technique": [
      "Примите упор лежа",
      "Опуститесь до касания грудью пола",
      "Вернитесь в исходное положение"
    ],
    "commonMistakes": [
      "Провисание поясницы",
      "Неполная амплитуда движения"
    ],
    "contraindications": [
      "Травмы плечевых суставов",
      "Боли в запястьях"
    ],
    "muscleImageUrl": null,
    "videoUrl": null,
    "techniqueImageUrl": null,
    "createdBy": 1,
    "createdAt": "2025-10-03T10:00:00.000Z",
    "updatedAt": "2025-10-03T10:00:00.000Z"
  }
]
```

**React Query Hook:**
```typescript
const { data: exercises = [], isLoading, error } = useQuery<Exercise[]>({
  queryKey: ['exercises'],
  queryFn: () => exercisesDb.getAll(),
  staleTime: 0,
  refetchOnMount: true,
});
```

---

### 2. Get Exercise by ID

**Database Operation:**
```typescript
async getById(id: number) {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Exercise;
}
```

**Request Payload:**
```typescript
{
  id: number; // Exercise ID
}
```

**Response:**
```typescript
Exercise | null
```

**Error Scenarios:**
- Exercise not found
- Invalid ID format

---

### 3. Create Exercise

**Database Operation:**
```typescript
async create(exercise: InsertExercise) {
  const { data, error } = await supabase
    .from('exercises')
    .insert(exercise)
    .select()
    .single();
  if (error) throw error;
  return data as Exercise;
}
```

**Request Payload:**
```typescript
{
  name: string;
  primaryMuscles: string[];    // Must contain at least one muscle group
  secondaryMuscles: string[];  // Optional, can be empty array
  difficulty: string;          // 'начинающий' | 'средний' | 'продвинутый'
  overview: string;
  technique: string[];         // Must contain at least one step
  commonMistakes: string[];    // Optional
  contraindications: string[]; // Optional
  muscleImageUrl?: string;     // Optional URL
  videoUrl?: string;           // Optional URL
  techniqueImageUrl?: string;  // Optional URL
  createdBy: number;           // Trainer ID
}
```

**Example Request:**
```json
{
  "name": "Приседания со штангой",
  "primaryMuscles": ["ноги", "ягодичные"],
  "secondaryMuscles": ["живот", "спина"],
  "difficulty": "средний",
  "overview": "Базовое упражнение для развития мышц ног",
  "technique": [
    "Поставьте штангу на плечи",
    "Ноги на ширине плеч",
    "Присядьте до параллели бедер с полом",
    "Вернитесь в исходное положение"
  ],
  "commonMistakes": [
    "Отрыв пяток от пола",
    "Сведение коленей внутрь"
  ],
  "contraindications": [
    "Травмы коленных суставов",
    "Проблемы со спиной"
  ],
  "createdBy": 1
}
```

**React Query Mutation:**
```typescript
const createMutation = useMutation({
  mutationFn: async (data: InsertExercise) => {
    return await exercisesDb.create(data);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['exercises'] });
    toast({ title: "Упражнение создано успешно" });
  },
  onError: (error) => {
    toast({
      title: "Ошибка при создании упражнения",
      description: error instanceof Error ? error.message : 'Неизвестная ошибка',
      variant: "destructive"
    });
  }
});
```

**Validation Rules:**
- `name`: Required, non-empty string
- `primaryMuscles`: Required, must be non-empty array
- `secondaryMuscles`: Optional, defaults to empty array
- `difficulty`: Required, must be one of the predefined values
- `overview`: Required, non-empty string
- `technique`: Required, must contain at least one non-empty step
- `commonMistakes`, `contraindications`: Optional, filtered to remove empty strings
- URLs: Optional, must be valid URL format if provided

**Error Scenarios:**
- Missing required fields
- Invalid difficulty value
- Empty primary muscles array
- Invalid URL format
- Database constraint violations

---

### 4. Update Exercise

**Database Operation:**
```typescript
async update(id: number, exercise: Partial<InsertExercise>) {
  const { data, error } = await supabase
    .from('exercises')
    .update(exercise)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Exercise;
}
```

**Request Payload:**
```typescript
{
  id: number;
  data: Partial<InsertExercise>; // Any subset of exercise fields
}
```

**React Query Mutation:**
```typescript
const updateMutation = useMutation({
  mutationFn: async ({ id, data }: { id: number; data: Partial<InsertExercise> }) => {
    return await exercisesDb.update(id, data);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['exercises'] });
    toast({ title: "Упражнение обновлено успешно" });
  },
  onError: (error) => {
    toast({
      title: "Ошибка при обновлении упражнения",
      description: error instanceof Error ? error.message : 'Неизвестная ошибка',
      variant: "destructive"
    });
  }
});
```

**Validation Rules:**
- Same as create, but all fields are optional except `id`
- `updatedAt` is automatically updated

---

### 5. Delete Exercise

**Database Operation:**
```typescript
async delete(id: number) {
  const { error } = await supabase
    .from('exercises')
    .delete()
    .eq('id', id);
  if (error) throw error;
}
```

**Request Payload:**
```typescript
{
  id: number; // Exercise ID to delete
}
```

**React Query Mutation:**
```typescript
const deleteMutation = useMutation({
  mutationFn: async (id: number) => {
    return await exercisesDb.delete(id);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['exercises'] });
    toast({ title: "Упражнение удалено успешно" });
  },
  onError: (error) => {
    toast({
      title: "Ошибка при удалении упражнения",
      description: error instanceof Error ? error.message : 'Неизвестная ошибка',
      variant: "destructive"
    });
  }
});
```

**Important Considerations:**
- **Cascade Effects:** Deleting an exercise may affect workout programs and training plans
- **Referential Integrity:** Check for references in `workout_programs`, `pupil_training_plans`
- **Recommendation:** Implement soft deletes or archive functionality

**Error Scenarios:**
- Exercise not found
- Foreign key constraint violation (if exercise is used in active workouts)
- Insufficient permissions

---

## Data Types

### MuscleGroup

```typescript
interface MuscleGroup {
  id: number;
  name: string;
  description: string | null;
  display_order: number;
  created_at: string;  // ISO 8601 timestamp
  updated_at: string;  // ISO 8601 timestamp
}
```

### Exercise

```typescript
interface Exercise {
  id: number;
  name: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  difficulty: string;
  overview: string;
  technique: string[];
  commonMistakes: string[];
  contraindications: string[];
  muscleImageUrl: string | null;
  videoUrl: string | null;
  techniqueImageUrl: string | null;
  createdBy: number | null;
  createdAt: string;  // ISO 8601 timestamp
  updatedAt: string;  // ISO 8601 timestamp
}
```

### InsertMuscleGroup

```typescript
interface InsertMuscleGroup {
  name: string;
  description?: string | null;
  display_order?: number;
}
```

### InsertExercise

```typescript
interface InsertExercise {
  name: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  difficulty: string;
  overview: string;
  technique: string[];
  commonMistakes: string[];
  contraindications: string[];
  muscleImageUrl?: string | null;
  videoUrl?: string | null;
  techniqueImageUrl?: string | null;
  createdBy: number;
}
```

---

## Error Handling

### Common Error Types

#### PostgrestError
Supabase client returns errors in this format:
```typescript
{
  message: string;
  details: string;
  hint: string;
  code: string;
}
```

#### Common Error Codes

| Code | Description | Typical Cause |
|------|-------------|---------------|
| `23505` | Unique violation | Duplicate name or display_order |
| `23502` | Not null violation | Missing required field |
| `23503` | Foreign key violation | Referenced record doesn't exist |
| `PGRST116` | Not found | Record with specified ID doesn't exist |
| `42P01` | Undefined table | Table doesn't exist (migration issue) |

### Error Handling Patterns

#### Frontend Pattern (React Query)
```typescript
const mutation = useMutation({
  mutationFn: async (data) => {
    // ... mutation logic
  },
  onSuccess: () => {
    // Invalidate cache
    queryClient.invalidateQueries({ queryKey: ['muscleGroups'] });

    // Show success toast
    toast({ title: "Success message" });
  },
  onError: (error: any) => {
    // Extract error message
    const message = error.message || 'Unknown error';

    // Show error toast
    toast({
      title: "Error title",
      description: message,
      variant: "destructive"
    });

    // Log for debugging
    console.error('Operation failed:', error);
  }
});
```

#### Validation Pattern
```typescript
const handleSubmit = () => {
  // Client-side validation
  if (!formData.name.trim()) {
    toast({
      title: "Validation Error",
      description: "Name is required",
      variant: "destructive"
    });
    return;
  }

  // Proceed with mutation
  mutation.mutate(formData);
};
```

---

## Code Examples

### Complete Muscle Group Management Example

```typescript
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface MuscleGroup {
  id: number;
  name: string;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export function useMuscleGroups() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query
  const { data: muscleGroups = [], isLoading, error } = useQuery<MuscleGroup[]>({
    queryKey: ['muscleGroups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('muscle_groups')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  // Create
  const createMutation = useMutation({
    mutationFn: async (data: { name: string; description: string }) => {
      const maxOrder = muscleGroups.reduce((max, g) => Math.max(max, g.display_order), 0);
      const { data: newGroup, error } = await supabase
        .from('muscle_groups')
        .insert({
          name: data.name,
          description: data.description || null,
          display_order: maxOrder + 1
        })
        .select()
        .single();
      if (error) throw error;
      return newGroup;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['muscleGroups'] });
      toast({ title: "Группа мышц создана" });
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка создания",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Update
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: { name: string; description: string } }) => {
      const { data: updated, error } = await supabase
        .from('muscle_groups')
        .update({
          name: data.name,
          description: data.description || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['muscleGroups'] });
      toast({ title: "Группа мышц обновлена" });
    },
  });

  // Delete
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('muscle_groups')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['muscleGroups'] });
      toast({ title: "Группа мышц удалена" });
    },
  });

  return {
    muscleGroups,
    isLoading,
    error,
    createMuscleGroup: createMutation.mutate,
    updateMuscleGroup: updateMutation.mutate,
    deleteMuscleGroup: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
```

### Exercise Filtering with Muscle Groups

```typescript
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { exercisesDb } from "@/lib/database";

export function useFilteredExercises(muscleGroupFilter?: string) {
  // Load muscle groups
  const { data: muscleGroups = [] } = useQuery({
    queryKey: ['muscleGroups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('muscle_groups')
        .select('id, name')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  // Load exercises
  const { data: exercises = [], isLoading } = useQuery({
    queryKey: ['exercises'],
    queryFn: () => exercisesDb.getAll(),
  });

  // Filter exercises by muscle group
  const filteredExercises = exercises.filter(exercise => {
    if (!muscleGroupFilter || muscleGroupFilter === 'all') {
      return true;
    }
    return exercise.primaryMuscles.includes(muscleGroupFilter);
  });

  return {
    exercises: filteredExercises,
    muscleGroups,
    isLoading,
  };
}
```

### Dynamic Muscle Group Selection

```typescript
import { Badge } from "@/components/ui/badge";

interface MuscleGroupSelectorProps {
  selectedMuscles: string[];
  onToggle: (muscle: string) => void;
  muscleGroups: Array<{ name: string }>;
  variant?: "primary" | "secondary";
}

export function MuscleGroupSelector({
  selectedMuscles,
  onToggle,
  muscleGroups,
  variant = "primary"
}: MuscleGroupSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {muscleGroups.map(({ name }) => {
        const isSelected = selectedMuscles.includes(name);
        return (
          <Badge
            key={name}
            variant={isSelected ? (variant === "primary" ? "default" : "secondary") : "outline"}
            className="cursor-pointer"
            onClick={() => onToggle(name)}
          >
            {name}
          </Badge>
        );
      })}
    </div>
  );
}

// Usage in form
function ExerciseForm() {
  const [primaryMuscles, setPrimaryMuscles] = useState<string[]>([]);
  const [secondaryMuscles, setSecondaryMuscles] = useState<string[]>([]);

  const { muscleGroups } = useMuscleGroups();

  const togglePrimary = (muscle: string) => {
    setPrimaryMuscles(prev =>
      prev.includes(muscle)
        ? prev.filter(m => m !== muscle)
        : [...prev, muscle]
    );
  };

  const toggleSecondary = (muscle: string) => {
    setSecondaryMuscles(prev =>
      prev.includes(muscle)
        ? prev.filter(m => m !== muscle)
        : [...prev, muscle]
    );
  };

  return (
    <form>
      <div>
        <label>Primary Muscles</label>
        <MuscleGroupSelector
          selectedMuscles={primaryMuscles}
          onToggle={togglePrimary}
          muscleGroups={muscleGroups}
          variant="primary"
        />
      </div>

      <div>
        <label>Secondary Muscles</label>
        <MuscleGroupSelector
          selectedMuscles={secondaryMuscles}
          onToggle={toggleSecondary}
          muscleGroups={muscleGroups}
          variant="secondary"
        />
      </div>
    </form>
  );
}
```

---

## Best Practices

### 1. Cache Invalidation
Always invalidate relevant queries after mutations:
```typescript
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['muscleGroups'] });
  queryClient.invalidateQueries({ queryKey: ['exercises'] });
}
```

### 2. Optimistic Updates
For better UX, consider optimistic updates:
```typescript
const mutation = useMutation({
  mutationFn: async (newGroup) => {
    // ... API call
  },
  onMutate: async (newGroup) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['muscleGroups'] });

    // Snapshot previous value
    const previous = queryClient.getQueryData(['muscleGroups']);

    // Optimistically update
    queryClient.setQueryData(['muscleGroups'], (old: MuscleGroup[]) => [
      ...old,
      { ...newGroup, id: Math.random(), created_at: new Date().toISOString() }
    ]);

    return { previous };
  },
  onError: (err, newGroup, context) => {
    // Rollback on error
    queryClient.setQueryData(['muscleGroups'], context?.previous);
  },
});
```

### 3. Error Boundaries
Wrap components in error boundaries to handle unexpected errors:
```typescript
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

<ErrorBoundary FallbackComponent={ErrorFallback}>
  <MuscleGroupsManagement />
</ErrorBoundary>
```

### 4. Type Safety
Always use TypeScript types from schema:
```typescript
import type { MuscleGroup, InsertMuscleGroup } from '@shared/schema';
```

### 5. Validation
Implement both client-side and server-side validation:
- Client: Zod schemas derived from Drizzle
- Server: Database constraints and RLS policies

---

## Future Enhancements

### 1. Foreign Key Relationships
Consider migrating from TEXT arrays to proper foreign keys:
```sql
-- Future migration
ALTER TABLE exercises
  ADD COLUMN primary_muscle_ids INTEGER[],
  ADD COLUMN secondary_muscle_ids INTEGER[];

-- Add foreign key constraints
ALTER TABLE exercises
  ADD CONSTRAINT fk_primary_muscles
  FOREIGN KEY (primary_muscle_ids)
  REFERENCES muscle_groups(id);
```

**Benefits:**
- Referential integrity
- Cascade updates/deletes
- Better query performance

**Trade-offs:**
- More complex queries (requires joins)
- Migration complexity

### 2. Muscle Group Categories
Add hierarchical categorization:
```typescript
interface MuscleGroup {
  id: number;
  name: string;
  category: 'upper_body' | 'lower_body' | 'core';
  parent_group_id?: number; // For sub-groups
}
```

### 3. Exercise Variations
Link related exercises:
```typescript
interface Exercise {
  // ...existing fields
  base_exercise_id?: number; // Link to parent exercise
  variation_type?: 'easier' | 'harder' | 'alternative';
}
```

### 4. Full-Text Search
Implement PostgreSQL full-text search:
```sql
-- Add tsvector column
ALTER TABLE exercises ADD COLUMN search_vector tsvector;

-- Create GIN index
CREATE INDEX exercises_search_idx ON exercises USING GIN(search_vector);

-- Auto-update trigger
CREATE TRIGGER exercises_search_update
  BEFORE INSERT OR UPDATE ON exercises
  FOR EACH ROW EXECUTE FUNCTION
    tsvector_update_trigger(search_vector, 'pg_catalog.russian', name, overview);
```

---

## References

- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [React Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
- [PostgreSQL Array Types](https://www.postgresql.org/docs/current/arrays.html)
- [Drizzle ORM PostgreSQL](https://orm.drizzle.team/docs/get-started-postgresql)
