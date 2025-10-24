import { ComprehensiveStudentsManagement } from "./comprehensive-students-management";
import type { Pupil } from "@shared/schema";

interface StudentsManagementProps {
  onSelectStudent?: (student: Pupil) => void;
}

export function StudentsManagement({ onSelectStudent }: StudentsManagementProps) {
  return <ComprehensiveStudentsManagement onSelectStudent={onSelectStudent} />;
}