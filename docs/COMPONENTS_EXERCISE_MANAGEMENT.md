# Exercise Management Components Documentation

## Overview

This document provides comprehensive documentation for the React components that handle muscle groups and exercise management in FitTrak-Pro. These components use modern React patterns including hooks, React Query for data management, and shadcn/ui for the UI layer.

**Key Components:**
- `MuscleGroupsManagement` - CRUD interface for muscle groups
- `ExerciseManagement` - Comprehensive exercise management interface
- `ExerciseForm` - Reusable form for creating/editing exercises
- `ExerciseView` - Read-only exercise detail view

---

## Table of Contents

1. [MuscleGroupsManagement Component](#musclegroupsmanagement-component)
2. [ExerciseManagement Component](#exercisemanagement-component)
3. [ExerciseForm Component](#exerciseform-component)
4. [ExerciseView Component](#exerciseview-component)
5. [Shared Patterns](#shared-patterns)
6. [Integration Guide](#integration-guide)

---

## MuscleGroupsManagement Component

**Location:** `/client/src/components/exercise/muscle-groups-management.tsx`

### Purpose
Provides a complete CRUD interface for managing muscle groups. Allows trainers to create, edit, reorder, and delete muscle group categories used throughout the application.

### Props
This component has no external props - it's a self-contained feature.

### State Management

#### Local State
```typescript
const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
const [selectedGroup, setSelectedGroup] = useState<MuscleGroup | null>(null);
const [formData, setFormData] = useState({ name: "", description: "" });
```

**State Variables:**
- `isCreateDialogOpen` - Controls create dialog visibility
- `isEditDialogOpen` - Controls edit dialog visibility
- `isDeleteDialogOpen` - Controls delete confirmation dialog visibility
- `selectedGroup` - Currently selected muscle group for edit/delete operations
- `formData` - Form input values (name and description)

#### Server State (React Query)
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

**Query Details:**
- **Query Key:** `['muscleGroups']`
- **Refetch:** On mount, on window focus
- **Sorting:** By `display_order` ascending
- **Error Handling:** Throws error to be caught by React Query

### Mutations

#### Create Mutation
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
    setIsCreateDialogOpen(false);
    setFormData({ name: "", description: "" });
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

**Features:**
- Auto-calculates `display_order` as max + 1
- Invalidates cache on success
- Resets form and closes dialog
- Shows success/error toasts

#### Update Mutation
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
    setIsEditDialogOpen(false);
    setSelectedGroup(null);
    setFormData({ name: "", description: "" });
    toast({ title: "Группа мышц обновлена" });
  }
});
```

**Features:**
- Updates `updated_at` timestamp automatically
- Clears selected group and form on success
- Invalidates cache to refresh UI

#### Delete Mutation
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
    setIsDeleteDialogOpen(false);
    setSelectedGroup(null);
    toast({ title: "Группа мышц удалена" });
  }
});
```

**Features:**
- Hard delete from database
- Closes dialog and clears selection on success
- Shows confirmation before deletion

### Event Handlers

```typescript
const handleCreate = () => {
  if (!formData.name.trim()) {
    toast({
      title: "Ошибка",
      description: "Введите название группы мышц",
      variant: "destructive"
    });
    return;
  }
  createMutation.mutate(formData);
};

const handleEdit = () => {
  if (!selectedGroup || !formData.name.trim()) {
    toast({
      title: "Ошибка",
      description: "Введите название группы мышц",
      variant: "destructive"
    });
    return;
  }
  updateMutation.mutate({ id: selectedGroup.id, data: formData });
};

const openEditDialog = (group: MuscleGroup) => {
  setSelectedGroup(group);
  setFormData({ name: group.name, description: group.description || "" });
  setIsEditDialogOpen(true);
};

const openDeleteDialog = (group: MuscleGroup) => {
  setSelectedGroup(group);
  setIsDeleteDialogOpen(true);
};
```

### UI Structure

```
Card
├── CardHeader
│   ├── CardTitle: "Группы мышц"
│   └── Button: "Добавить группу" (opens create dialog)
└── CardContent
    └── List of muscle groups
        ├── GripVertical icon (for future drag-and-drop)
        ├── Name and description
        └── Action buttons (Edit, Delete)

Dialogs:
├── Create Dialog (name + description inputs)
├── Edit Dialog (pre-filled name + description)
└── Delete Confirmation Dialog (AlertDialog)
```

### Usage Example

```typescript
import { MuscleGroupsManagement } from "@/components/exercise/muscle-groups-management";

function ProfilePage() {
  return (
    <div className="container">
      <h1>Настройки профиля</h1>
      <MuscleGroupsManagement />
    </div>
  );
}
```

### Styling
- Uses Tailwind CSS for utility-first styling
- shadcn/ui components for consistent design
- Responsive layout (works on mobile and desktop)
- Hover effects for better UX

### Accessibility
- Proper ARIA labels on buttons
- Keyboard navigation support
- Focus management in dialogs
- Screen reader friendly

### Future Enhancements
1. **Drag-and-drop reordering** - Currently shows GripVertical icon but no functionality
2. **Bulk operations** - Select multiple groups for batch delete/edit
3. **Search/filter** - For large lists of muscle groups
4. **Undo/redo** - Allow reverting recent changes
5. **Import/export** - Share muscle group configurations

---

## ExerciseManagement Component

**Location:** `/client/src/components/exercise/exercise-management.tsx`

### Purpose
Comprehensive interface for managing exercises. Provides search, filtering, creation, editing, viewing, and deletion of exercises. Integrates with muscle groups for categorization.

### Props
This component has no external props - it's a self-contained feature.

### State Management

#### Local State
```typescript
const [searchTerm, setSearchTerm] = useState("");
const [filterMuscle, setFilterMuscle] = useState<string>("");
const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
```

**State Variables:**
- `searchTerm` - Exercise search query
- `filterMuscle` - Selected muscle group filter
- `selectedExercise` - Currently selected exercise for view/edit/delete
- `isCreateDialogOpen` - Controls create dialog visibility
- `isEditDialogOpen` - Controls edit dialog visibility
- `isViewDialogOpen` - Controls view dialog visibility

#### Server State

**Muscle Groups Query:**
```typescript
const { data: muscleGroups = [] } = useQuery<MuscleGroup[]>({
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
```

**Exercises Query:**
```typescript
const { data: exercises = [], isLoading, error } = useQuery<Exercise[]>({
  queryKey: ['exercises'],
  queryFn: () => exercisesDb.getAll(),
  staleTime: 0,
  refetchOnMount: true,
});
```

**Query Features:**
- Fetches only `id` and `name` for muscle groups (optimization)
- Fetches full exercise data
- Refetches on mount for fresh data
- No stale time (always fresh)

### Filtering Logic

```typescript
const filteredExercises = exercises.filter(exercise => {
  const matchesSearch = !searchTerm || exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesMuscle = !filterMuscle || filterMuscle === 'all' || exercise.primaryMuscles.includes(filterMuscle);
  return matchesSearch && matchesMuscle;
});
```

**Filter Criteria:**
- **Search:** Case-insensitive name matching
- **Muscle Group:** Matches against `primaryMuscles` array
- **Combined:** Both filters must pass (AND logic)

### Mutations

#### Create Mutation
```typescript
const createMutation = useMutation({
  mutationFn: async (data: InsertExercise) => {
    return await exercisesDb.create(data);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['exercises'] });
    setIsCreateDialogOpen(false);
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

#### Update Mutation
```typescript
const updateMutation = useMutation({
  mutationFn: async ({ id, data }: { id: number; data: Partial<InsertExercise> }) => {
    return await exercisesDb.update(id, data);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['exercises'] });
    setIsEditDialogOpen(false);
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

#### Delete Mutation
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

### UI Structure

```
Tabs
├── Tab: "Упражнения"
│   ├── Create Button + Dialog
│   ├── Filters Card
│   │   ├── Search Input
│   │   └── Muscle Group Select
│   ├── Exercise Cards Grid (responsive)
│   │   └── Each Card:
│   │       ├── Exercise Image
│   │       ├── Name
│   │       ├── Muscle Group Badges
│   │       ├── Difficulty Badge
│   │       ├── Overview (truncated)
│   │       └── Actions: View, Edit, Delete
│   ├── Edit Dialog (ExerciseForm)
│   └── View Dialog (ExerciseView)
└── Tab: "Группы мышц"
    └── MuscleGroupsManagement Component
```

### Exercise Card Layout

```typescript
<Card>
  <CardHeader>
    <div className="flex items-start gap-3">
      {/* Exercise Image */}
      <div className="flex-shrink-0">
        {generateExerciseImage(exercise.name, "w-16 h-16 rounded-lg border bg-white")}
      </div>

      {/* Name and Muscle Badges */}
      <div className="flex-1">
        <CardTitle>{exercise.name}</CardTitle>
        <div className="flex flex-wrap gap-1">
          {/* Primary muscles - default variant */}
          {exercise.primaryMuscles.map(muscle => (
            <Badge key={muscle} variant="default">{muscle}</Badge>
          ))}
          {/* Secondary muscles - secondary variant */}
          {exercise.secondaryMuscles.map(muscle => (
            <Badge key={muscle} variant="secondary">{muscle}</Badge>
          ))}
        </div>
      </div>
    </div>
  </CardHeader>

  <CardContent>
    {/* Difficulty */}
    <div className="flex justify-between">
      <span>Сложность:</span>
      <Badge variant="outline" className={getDifficultyClass(exercise.difficulty)}>
        {exercise.difficulty}
      </Badge>
    </div>

    {/* Overview (truncated to 2 lines) */}
    <p className="text-sm text-gray-600 line-clamp-2">{exercise.overview}</p>

    {/* Action Buttons */}
    <div className="flex gap-2 pt-2">
      <Button variant="outline" size="sm" onClick={() => openViewDialog(exercise)}>
        <Eye className="h-4 w-4 mr-1" />
        Просмотр
      </Button>
      <Button variant="outline" size="sm" onClick={() => openEditDialog(exercise)}>
        <Edit className="h-4 w-4" />
      </Button>
      <AlertDialog>
        {/* Delete confirmation */}
      </AlertDialog>
    </div>
  </CardContent>
</Card>
```

### Difficulty Styling

Custom CSS classes for difficulty badges:
```css
.difficulty-easy-force {
  background-color: #dbeafe;
  color: #1e40af;
  border-color: #93c5fd;
}

.difficulty-medium-force {
  background-color: #dcfce7;
  color: #166534;
  border-color: #86efac;
}

.difficulty-hard-force {
  background-color: #fecaca;
  color: #991b1b;
  border-color: #fca5a5;
}
```

### Usage Example

```typescript
import { ExerciseManagement } from "@/components/exercise/exercise-management";

function ProfilePage() {
  return (
    <Tabs defaultValue="exercises">
      <TabsList>
        <TabsTrigger value="exercises">Упражнения</TabsTrigger>
        <TabsTrigger value="muscle-groups">Группы мышц</TabsTrigger>
      </TabsList>

      <TabsContent value="exercises">
        <ExerciseManagement />
      </TabsContent>

      <TabsContent value="muscle-groups">
        <MuscleGroupsManagement />
      </TabsContent>
    </Tabs>
  );
}
```

### Performance Considerations

1. **Virtualization:** Not implemented yet, but recommended for >100 exercises
2. **Image Loading:** Uses `generateExerciseImage()` utility for placeholder images
3. **Search Debouncing:** Consider adding debounce for search input
4. **Pagination:** Not implemented - loads all exercises at once

### Responsive Design

- **Mobile:** Single column grid
- **Tablet:** 2-column grid (`md:grid-cols-2`)
- **Desktop:** 3-column grid (`lg:grid-cols-3`)
- **Filters:** Stack vertically on mobile, horizontal on desktop

---

## ExerciseForm Component

**Location:** `/client/src/components/exercise/exercise-management.tsx` (internal component)

### Purpose
Reusable form component for creating and editing exercises. Handles complex form state including arrays for technique steps, mistakes, and contraindications.

### Props

```typescript
interface ExerciseFormProps {
  exercise?: Exercise;           // Pre-fill for editing (optional)
  onSubmit: (data: InsertExercise) => void;
  isLoading: boolean;
  muscleGroupNames: string[];    // Available muscle groups
}
```

### State Management

```typescript
interface ExerciseFormData {
  name: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  difficulty: string;
  overview: string;
  technique: string[];
  commonMistakes: string[];
  contraindications: string[];
  muscleImageUrl?: string;
  techniqueImageUrl?: string;
}

const [formData, setFormData] = useState<ExerciseFormData>({
  name: exercise?.name || "",
  primaryMuscles: exercise?.primaryMuscles || [],
  secondaryMuscles: exercise?.secondaryMuscles || [],
  difficulty: exercise?.difficulty || "",
  overview: exercise?.overview || "",
  technique: exercise?.technique || [""],
  commonMistakes: exercise?.commonMistakes || [""],
  contraindications: exercise?.contraindications || [""],
  muscleImageUrl: exercise?.muscleImageUrl || "",
  techniqueImageUrl: exercise?.techniqueImageUrl || "",
});
```

### Form Sections

#### 1. Basic Information
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Name */}
  <Input
    id="name"
    value={formData.name}
    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
    required
  />

  {/* Difficulty */}
  <Select
    value={formData.difficulty}
    onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
  >
    <SelectContent>
      {difficultyLevels.map(level => (
        <SelectItem key={level} value={level}>{level}</SelectItem>
      ))}
    </SelectContent>
  </Select>

  {/* Image URLs */}
  <Input
    id="muscleImageUrl"
    value={formData.muscleImageUrl}
    onChange={(e) => setFormData(prev => ({ ...prev, muscleImageUrl: e.target.value }))}
    placeholder="https://example.com/image.jpg"
  />

  <Input
    id="techniqueImageUrl"
    value={formData.techniqueImageUrl}
    onChange={(e) => setFormData(prev => ({ ...prev, techniqueImageUrl: e.target.value }))}
    placeholder="https://example.com/technique.jpg"
  />
</div>
```

#### 2. Overview
```typescript
<Textarea
  id="overview"
  value={formData.overview}
  onChange={(e) => setFormData(prev => ({ ...prev, overview: e.target.value }))}
  rows={3}
  required
/>
```

#### 3. Muscle Group Selection

**Primary Muscles:**
```typescript
<div className="flex flex-wrap gap-2">
  {muscleGroupNames.map(muscle => (
    <Badge
      key={muscle}
      variant={formData.primaryMuscles.includes(muscle) ? "default" : "outline"}
      className="cursor-pointer"
      onClick={() => {
        setFormData(prev => ({
          ...prev,
          primaryMuscles: prev.primaryMuscles.includes(muscle)
            ? prev.primaryMuscles.filter(m => m !== muscle)
            : [...prev.primaryMuscles, muscle]
        }));
      }}
    >
      {muscle}
    </Badge>
  ))}
</div>
```

**Secondary Muscles:**
```typescript
<div className="flex flex-wrap gap-2">
  {muscleGroupNames.map(muscle => (
    <Badge
      key={muscle}
      variant={formData.secondaryMuscles.includes(muscle) ? "secondary" : "outline"}
      className="cursor-pointer"
      onClick={() => {
        setFormData(prev => ({
          ...prev,
          secondaryMuscles: prev.secondaryMuscles.includes(muscle)
            ? prev.secondaryMuscles.filter(m => m !== muscle)
            : [...prev.secondaryMuscles, muscle]
        }));
      }}
    >
      {muscle}
    </Badge>
  ))}
</div>
```

#### 4. Dynamic Array Fields

**Helper Functions:**
```typescript
const addArrayItem = (field: keyof Pick<ExerciseFormData, 'technique' | 'commonMistakes' | 'contraindications'>) => {
  setFormData(prev => ({
    ...prev,
    [field]: [...prev[field], ""]
  }));
};

const updateArrayItem = (
  field: keyof Pick<ExerciseFormData, 'technique' | 'commonMistakes' | 'contraindications'>,
  index: number,
  value: string
) => {
  setFormData(prev => ({
    ...prev,
    [field]: prev[field].map((item, i) => i === index ? value : item)
  }));
};

const removeArrayItem = (
  field: keyof Pick<ExerciseFormData, 'technique' | 'commonMistakes' | 'contraindications'>,
  index: number
) => {
  setFormData(prev => ({
    ...prev,
    [field]: prev[field].filter((_, i) => i !== index)
  }));
};
```

**Technique Steps:**
```typescript
{formData.technique.map((step, index) => (
  <div key={index} className="flex gap-2">
    <Input
      value={step}
      onChange={(e) => updateArrayItem('technique', index, e.target.value)}
      placeholder={`Шаг ${index + 1}`}
    />
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => removeArrayItem('technique', index)}
      disabled={formData.technique.length <= 1}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  </div>
))}
<Button
  type="button"
  variant="outline"
  onClick={() => addArrayItem('technique')}
  className="w-full"
>
  <Plus className="h-4 w-4 mr-2" />
  Добавить шаг
</Button>
```

Similar patterns for `commonMistakes` and `contraindications`.

### Form Submission

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const submitData: InsertExercise = {
    ...formData,
    technique: formData.technique.filter(item => item.trim() !== ""),
    commonMistakes: formData.commonMistakes.filter(item => item.trim() !== ""),
    contraindications: formData.contraindications.filter(item => item.trim() !== ""),
    createdBy: 1, // TODO: Get from auth context
  };

  onSubmit(submitData);
};
```

**Data Cleaning:**
- Filters out empty strings from arrays
- Sets `createdBy` to current trainer ID
- Maintains all other form data

### Validation

**Client-side Validation:**
- Required fields: `name`, `overview`, `difficulty`
- At least one primary muscle group required (enforced by UI flow)
- At least one technique step required (disabled remove when only 1)

**Future Validation:**
- URL format validation for image URLs
- Maximum length constraints
- Duplicate exercise name check

### Usage Example

```typescript
<ExerciseForm
  exercise={selectedExercise}  // For editing
  onSubmit={(data) => updateMutation.mutate({ id: selectedExercise.id, data })}
  isLoading={updateMutation.isPending}
  muscleGroupNames={muscleGroupNames}
/>
```

---

## ExerciseView Component

**Location:** `/client/src/components/exercise/exercise-management.tsx` (internal component)

### Purpose
Read-only view component that displays all exercise details in a structured, visually appealing format.

### Props

```typescript
interface ExerciseViewProps {
  exercise: Exercise;
}
```

### UI Structure

```
Dialog Content
├── Exercise Image (centered, large)
├── Grid: 2 columns (responsive)
│   ├── Column 1: Basic Information
│   │   ├── Name
│   │   └── Difficulty (with styled badge)
│   └── Column 2: Muscle Groups
│       ├── Primary Muscles (badges)
│       └── Secondary Muscles (badges)
├── Overview (full width)
├── Muscle Diagram (if muscleImageUrl provided)
├── Technique Steps (numbered list)
├── Common Mistakes (bulleted list)
└── Contraindications (bulleted list)
```

### Difficulty Styling

```typescript
const getDifficultyStyle = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'легкий':
    case 'начинающий':
      return {
        backgroundColor: '#dbeafe',
        color: '#1e40af',
        borderColor: '#93c5fd'
      };
    case 'средний':
      return {
        backgroundColor: '#dcfce7',
        color: '#166534',
        borderColor: '#86efac'
      };
    case 'продвинутый':
      return {
        backgroundColor: '#fecaca',
        color: '#991b1b',
        borderColor: '#fca5a5'
      };
    default:
      return {
        backgroundColor: '#f3f4f6',
        color: '#374151',
        borderColor: '#d1d5db'
      };
  }
};
```

### Sections

#### Exercise Image
```typescript
<div className="flex justify-center">
  {generateExerciseImage(exercise.name, "w-32 h-24 rounded-lg border bg-white shadow-sm")}
</div>
```

#### Basic Info
```typescript
<div>
  <h3 className="font-semibold mb-2">Основная информация</h3>
  <div className="space-y-2 text-sm">
    <div><span className="font-medium">Название:</span> {exercise.name}</div>
    <div className="flex items-center gap-2">
      <span className="font-medium">Сложность:</span>
      <Badge variant="outline" className={getDifficultyClass(exercise.difficulty)}>
        {exercise.difficulty}
      </Badge>
    </div>
  </div>
</div>
```

#### Muscle Groups
```typescript
<div>
  <h3 className="font-semibold mb-2">Группы мышц</h3>
  <div className="space-y-2">
    <div>
      <span className="font-medium text-sm">Основные:</span>
      <div className="flex flex-wrap gap-1 mt-1">
        {exercise.primaryMuscles.map(muscle => (
          <Badge key={muscle} variant="default">{muscle}</Badge>
        ))}
      </div>
    </div>
    <div>
      <span className="font-medium text-sm">Вспомогательные:</span>
      <div className="flex flex-wrap gap-1 mt-1">
        {exercise.secondaryMuscles.map(muscle => (
          <Badge key={muscle} variant="secondary">{muscle}</Badge>
        ))}
      </div>
    </div>
  </div>
</div>
```

#### Muscle Diagram
```typescript
{exercise.muscleImageUrl && (
  <div>
    <h3 className="font-semibold mb-2">Схема мышц</h3>
    <img
      src={exercise.muscleImageUrl}
      alt="Схема задействованных мышц"
      className="max-w-full h-auto rounded-lg border"
    />
  </div>
)}
```

#### Technique
```typescript
<div>
  <h3 className="font-semibold mb-2">Техника выполнения</h3>
  <ol className="list-decimal list-inside space-y-1 text-sm">
    {exercise.technique.map((step, index) => (
      <li key={index}>{step}</li>
    ))}
  </ol>
</div>
```

#### Common Mistakes
```typescript
<div>
  <h3 className="font-semibold mb-2">Частые ошибки</h3>
  <ul className="list-disc list-inside space-y-1 text-sm">
    {exercise.commonMistakes.map((mistake, index) => (
      <li key={index}>{mistake}</li>
    ))}
  </ul>
</div>
```

#### Contraindications
```typescript
<div>
  <h3 className="font-semibold mb-2">Противопоказания</h3>
  <ul className="list-disc list-inside space-y-1 text-sm">
    {exercise.contraindications.map((contraindication, index) => (
      <li key={index}>{contraindication}</li>
    ))}
  </ul>
</div>
```

### Usage Example

```typescript
<Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Просмотр упражнения</DialogTitle>
    </DialogHeader>
    {selectedExercise && <ExerciseView exercise={selectedExercise} />}
  </DialogContent>
</Dialog>
```

---

## Shared Patterns

### Toast Notifications

All components use the `useToast` hook from shadcn/ui:

```typescript
import { useToast } from "@/hooks/use-toast";

const { toast } = useToast();

// Success
toast({ title: "Операция выполнена успешно" });

// Error
toast({
  title: "Ошибка",
  description: error.message,
  variant: "destructive"
});

// Info
toast({
  title: "Информация",
  description: "Дополнительная информация"
});
```

### React Query Patterns

**Query Client Access:**
```typescript
import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();
```

**Cache Invalidation:**
```typescript
queryClient.invalidateQueries({ queryKey: ['muscleGroups'] });
queryClient.invalidateQueries({ queryKey: ['exercises'] });
```

**Optimistic Updates (Example):**
```typescript
const mutation = useMutation({
  mutationFn: updateExercise,
  onMutate: async (newExercise) => {
    await queryClient.cancelQueries({ queryKey: ['exercises'] });
    const previous = queryClient.getQueryData(['exercises']);
    queryClient.setQueryData(['exercises'], (old) => [...old, newExercise]);
    return { previous };
  },
  onError: (err, newExercise, context) => {
    queryClient.setQueryData(['exercises'], context.previous);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['exercises'] });
  },
});
```

### Dialog Patterns

**Standard Dialog:**
```typescript
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="max-w-4xl">
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Отмена
      </Button>
      <Button onClick={handleSubmit}>
        Сохранить
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Alert Dialog (Confirmation):**
```typescript
<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Подтвердите действие</AlertDialogTitle>
      <AlertDialogDescription>
        Это действие нельзя отменить.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Отмена</AlertDialogCancel>
      <AlertDialogAction
        onClick={handleConfirm}
        className="bg-destructive text-destructive-foreground"
      >
        Удалить
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Form State Management

**Controlled Inputs:**
```typescript
const [formData, setFormData] = useState({ name: "", description: "" });

<Input
  value={formData.name}
  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
/>
```

**Functional Updates:**
```typescript
setFormData(prev => ({
  ...prev,
  name: newValue
}));
```

**Array Updates:**
```typescript
// Add
setArray(prev => [...prev, newItem]);

// Remove
setArray(prev => prev.filter((_, i) => i !== index));

// Update
setArray(prev => prev.map((item, i) => i === index ? newValue : item));

// Toggle
setArray(prev =>
  prev.includes(item)
    ? prev.filter(x => x !== item)
    : [...prev, item]
);
```

---

## Integration Guide

### Adding to Application

1. **Import Components:**
```typescript
import { ExerciseManagement } from "@/components/exercise/exercise-management";
import { MuscleGroupsManagement } from "@/components/exercise/muscle-groups-management";
```

2. **Add to Route:**
```typescript
// In your router configuration
<Route path="/profile" component={ProfilePage} />

// In ProfilePage
function ProfilePage() {
  return (
    <div className="container mx-auto py-6">
      <Tabs defaultValue="exercises">
        <TabsList>
          <TabsTrigger value="exercises">Упражнения</TabsTrigger>
          <TabsTrigger value="muscle-groups">Группы мышц</TabsTrigger>
        </TabsList>

        <TabsContent value="exercises">
          <ExerciseManagement />
        </TabsContent>

        <TabsContent value="muscle-groups">
          <MuscleGroupsManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

### Required Dependencies

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.x",
    "@tanstack/react-query": "^5.x",
    "react": "^18.x",
    "lucide-react": "^0.x"
  }
}
```

### Required Utilities

1. **Supabase Client:** `/client/src/lib/supabase.ts`
2. **Database Utils:** `/client/src/lib/database.ts`
3. **Toast Hook:** `/client/src/hooks/use-toast.ts`
4. **UI Components:** All shadcn/ui components from `/client/src/components/ui/`

### Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

Ensure these tables exist:
- `muscle_groups`
- `exercises`

Run migrations:
```bash
npm run db:push
```

### React Query Provider

Wrap app with QueryClientProvider:
```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app */}
    </QueryClientProvider>
  );
}
```

### Styling

Ensure Tailwind CSS is configured with shadcn/ui theme:

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // shadcn/ui colors
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

---

## Testing

### Unit Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MuscleGroupsManagement } from './muscle-groups-management';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

test('opens create dialog when button clicked', () => {
  render(<MuscleGroupsManagement />, { wrapper });

  const createButton = screen.getByText('Добавить группу');
  fireEvent.click(createButton);

  expect(screen.getByText('Добавить группу мышц')).toBeInTheDocument();
});
```

### Integration Testing

```typescript
test('creates muscle group successfully', async () => {
  render(<MuscleGroupsManagement />, { wrapper });

  // Open dialog
  fireEvent.click(screen.getByText('Добавить группу'));

  // Fill form
  fireEvent.change(screen.getByLabelText('Название'), {
    target: { value: 'Тест группа' }
  });

  // Submit
  fireEvent.click(screen.getByText('Создать'));

  // Verify success
  await screen.findByText('Группа мышц создана');
});
```

---

## Troubleshooting

### Common Issues

**1. Muscle groups not loading**
- Check Supabase connection
- Verify `muscle_groups` table exists
- Check RLS policies allow SELECT

**2. Create/Update mutations failing**
- Check RLS policies allow INSERT/UPDATE
- Verify all required fields provided
- Check for unique constraint violations

**3. Images not displaying**
- Verify URL is valid and accessible
- Check CORS policy if loading from external domain
- Ensure `generateExerciseImage()` utility is available

**4. Form validation not working**
- Check that required fields have `required` attribute
- Verify client-side validation logic
- Check toast notifications for error messages

### Debug Mode

Enable React Query Devtools:
```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

---

## Future Enhancements

1. **Drag-and-drop exercise reordering**
2. **Bulk exercise import/export (CSV/JSON)**
3. **Exercise templates library**
4. **Advanced search with filters (difficulty, muscle groups, etc.)**
5. **Exercise history and usage analytics**
6. **Video upload support**
7. **Exercise variations and progressions**
8. **Printable exercise cards**
9. **Muscle group hierarchy (parent/child relationships)**
10. **Multi-language support for exercise names**

---

## Additional Resources

- [React Query Documentation](https://tanstack.com/query/latest)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Tailwind CSS](https://tailwindcss.com/docs)
