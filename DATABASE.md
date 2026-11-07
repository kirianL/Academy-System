# NEXUS — Database Schema & Domain Model

---

## 1. Multi-Tenant Entity Relationship Architecture

All entities strictly isolate data using an `institution_id` foreign key. Indexes are defined on `(institution_id, ...)` pairs to ensure rapid lookups and zero cross-tenant data leakage.

```
+--------------------+       +----------------------+       +----------------------+
|    Institution     |1     *|         User         |1     *|       Student        |
|--------------------|-------|----------------------|-------|----------------------|
| id (PK)            |       | id (PK)              |       | id (PK)              |
| name               |       | institution_id (FK)  |       | user_id (FK)         |
| slug               |       | email                |       | institution_id (FK)  |
| logo_url           |       | role (SUPER, ADMIN,  |       | student_code (ident) |
| academic_cycle     |       |   DOCENTE, ALUMNO,   |       | first_name, last_name|
| settings (JSON)    |       |   ENCARGADO)         |       | date_of_birth        |
+--------------------+       +----------------------+       | condition (REGULAR,  |
          |                             |                   |   CONDICIONAL, etc.) |
          | 1                           | 1                 +----------------------+
          |                             |                              |
          *                             *                              | *
+--------------------+       +----------------------+                  |
|   AcademicLevel    |       |       Teacher        |                  |
|--------------------|       |----------------------|                  |
| id (PK)            |       | id (PK)              |                  |
| institution_id (FK)|       | user_id (FK)         |                  |
| name (7°, 8°, ...) |       | specialty            |                  |
| order_index        |       | identification       |                  |
+--------------------+       +----------------------+                  |
          |                             |                              |
          | 1                           | 1                            |
          *                             *                              |
+--------------------+       +----------------------+                  |
|      Section       |1     *|   SubjectTeacher     |                  |
|--------------------|-------|----------------------|                  |
| id (PK)            |       | id (PK)              |                  |
| academic_level_id  |       | teacher_id (FK)      |                  |
| name (e.g. 7-A)    |       | subject_id (FK)      |                  |
| classroom          |       | section_id (FK)      |                  |
+--------------------+       +----------------------+                  |
          |                             |                              |
          | 1                           | 1                            |
          *                             *                              *
+----------------------------------------------------------------------------------+
|                                 Enrollment (Matrícula)                          |
|----------------------------------------------------------------------------------|
| id (PK), institution_id (FK), student_id (FK), section_id (FK), academic_year   |
+----------------------------------------------------------------------------------+
          |                                                            |
          *                                                            *
+----------------------+                                     +----------------------+
|      Attendance      |                                     |      Evaluation      |
|----------------------|                                     |----------------------|
| id (PK)              |                                     | id (PK)              |
| enrollment_id (FK)   |                                     | subject_teacher_id   |
| section_id (FK)      |                                     | period_id (Trimestre)|
| date (YYYY-MM-DD)    |                                     | title, rubric_type   |
| status (PRESENTE,    |                                     | max_points, weight % |
|   AUSENTE_INJUST,    |                                     +----------------------+
|   AUSENTE_JUST,      |                                                | 1
|   TARDIA)            |                                                *
| notes, justification |                                     +----------------------+
+----------------------+                                     |      GradeEntry      |
                                                             |----------------------|
                                                             | id (PK)              |
                                                             | evaluation_id (FK)   |
                                                             | student_id (FK)      |
                                                             | points_earned        |
                                                             | percentage_earned    |
                                                             | feedback_comment     |
                                                             +----------------------+
```

---

## 2. Communications & Messaging Schema

```
+--------------------+       +----------------------+       +----------------------+
| ConversationThread |1     *|   ThreadParticipant  |1     *|       Message        |
|--------------------|-------|----------------------|-------|----------------------|
| id (PK)            |       | id (PK)              |       | id (PK)              |
| institution_id (FK)|       | thread_id (FK)       |       | thread_id (FK)       |
| subject            |       | user_id (FK)         |       | sender_id (FK)       |
| category (DIRECT,  |       | last_read_at         |       | content (markdown)   |
|   CIRCULAR, ACADEM)|       | is_pinned            |       | attachments (JSON)   |
| last_message_at    |       | is_archived          |       | created_at           |
+--------------------+       +----------------------+       +----------------------+
```

---

## 3. Costa Rican Educational System Domain Rules
1. **Academic Scale**: Grades are scored on a scale from 1 to 100.
2. **Minimum Passing Mark**: 70% in General Basic Education (7°, 8°, 9°) and 70% (or 75% in technical streams) in Diversified Education (10°, 11°).
3. **Evaluation Components**:
   - *Trabajo Cotidiano (Daily classwork)*: 40% - 50%
   - *Tareas (Homework/Projects)*: 10%
   - *Pruebas Parciales (Exams)*: 30% - 40%
   - *Asistencia (Attendance)*: 5% - 10%
4. **Attendance Classifications**:
   - **Presente**: Regular attendance.
   - **Ausente Injustificada**: Unexcused absence.
   - **Ausente Justificada**: Excused absence within 72 hours via guardian note.
   - **Tardía**: Late arrival.

