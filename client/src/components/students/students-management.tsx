import { useState } from "react";
import { Plus, Search, Edit, Trash2, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  email: string;
  birthDate?: string;
  weight?: number;
  height?: number;
  goal?: string;
  medicalNotes?: string;
  photo?: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export function StudentsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Sample students data
  const [students] = useState<Student[]>([
    {
      id: 1,
      firstName: "Анна",
      lastName: "Петрова",
      middleName: "Сергеевна",
      phone: "+7 (999) 123-45-67",
      email: "anna.petrova@email.com",
      birthDate: "1990-05-15",
      weight: 65,
      height: 170,
      goal: "Похудение и поддержание формы",
      status: "active",
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      firstName: "Михаил",
      lastName: "Иванов",
      phone: "+7 (888) 987-65-43",
      email: "mikhail.ivanov@email.com",
      birthDate: "1985-08-22",
      weight: 80,
      height: 180,
      goal: "Набор мышечной массы",
      status: "active",
      joinDate: "2024-02-01"
    },
    {
      id: 3,
      firstName: "Екатерина",
      lastName: "Смирнова",
      phone: "+7 (777) 555-12-34",
      email: "ekaterina.smirnova@email.com",
      birthDate: "1995-12-03",
      weight: 58,
      height: 165,
      goal: "Общая физическая подготовка",
      status: "inactive",
      joinDate: "2023-11-10"
    }
  ]);

  const filteredStudents = students.filter(student =>
    `${student.firstName} ${student.lastName} ${student.middleName || ''}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.phone.includes(searchTerm)
  );

  const getStudentFullName = (student: Student) => {
    return `${student.firstName} ${student.lastName}${student.middleName ? ` ${student.middleName}` : ''}`;
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ученики</h1>
          <p className="text-gray-600">Управление базой учеников</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Добавить ученика
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Поиск по имени, email или телефону..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{getStudentFullName(student)}</CardTitle>
                  {student.birthDate && (
                    <p className="text-sm text-gray-600">{calculateAge(student.birthDate)} лет</p>
                  )}
                </div>
                <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                  {student.status === 'active' ? 'Активен' : 'Неактивен'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {student.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {student.email}
                </div>
                {student.goal && (
                  <div className="text-sm">
                    <span className="font-medium">Цель:</span> {student.goal}
                  </div>
                )}
                {student.weight && student.height && (
                  <div className="text-sm text-gray-600">
                    {student.height} см / {student.weight} кг
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <span className="text-xs text-gray-500">
                  С {new Date(student.joinDate).toLocaleDateString('ru-RU')}
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Ученики не найдены</p>
          {searchTerm && (
            <Button
              variant="ghost"
              onClick={() => setSearchTerm("")}
              className="mt-2"
            >
              Очистить поиск
            </Button>
          )}
        </div>
      )}

      {/* Add Student Form Placeholder */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Добавить ученика</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Форма добавления ученика в разработке</p>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="w-full"
              >
                Закрыть
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Student Details Modal Placeholder */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>{getStudentFullName(selectedStudent)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Детальная информация об ученике в разработке</p>
              <Button
                onClick={() => setSelectedStudent(null)}
                variant="outline"
                className="w-full"
              >
                Закрыть
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}