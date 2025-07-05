# Fitness Training Management Application

## Overview

This is a full-stack fitness training application designed for trainers and their students. The app allows trainers to manage students, create workout programs, track exercise progress, and schedule training sessions. Built with React on the frontend, Express.js on the backend, and PostgreSQL database with Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript and Vite for development
- **UI Library**: Tailwind CSS with shadcn/ui components for consistent design
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js web framework
- **Language**: TypeScript for type safety
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL store
- **Build Tool**: esbuild for server-side bundling

### Database Design
- **Users**: Trainers with authentication and profile management
- **Students**: Trainer's pupils with detailed profiles and progress tracking
- **Workout Programs**: Structured exercise routines with different types and difficulty levels
- **Workout Sessions**: Scheduled training sessions linking users and programs
- **Exercises**: Comprehensive exercise database with Russian localization
- **Exercise Progress**: Individual progress tracking for each student

## Key Components

### Data Models
- **Users**: Trainer accounts with authentication
- **Pupils/Students**: Student profiles managed by trainers
- **Workout Programs**: Exercise collections with metadata
- **Workout Sessions**: Scheduled training appointments
- **Exercises**: Exercise database with detailed instructions
- **Exercise Progress**: Individual performance tracking

### Core Features
- **Student Management**: Add, edit, and track student information
- **Exercise Library**: Comprehensive database of exercises with Russian names and instructions
- **Program Creation**: Build custom workout programs
- **Session Scheduling**: Calendar-based training session management
- **Progress Tracking**: Monitor student performance over time

### UI Components
- **Dashboard**: Main interface showing stats and today's schedule
- **Calendar View**: Visual scheduling interface
- **Student Management**: CRUD operations for student profiles
- **Exercise Browser**: Searchable exercise database with filtering
- **Profile Management**: User account settings

## Data Flow

1. **Authentication**: Session-based authentication with PostgreSQL storage
2. **Data Fetching**: React Query handles API calls and caching
3. **Real-time Updates**: Optimistic updates with query invalidation
4. **Form Processing**: React Hook Form manages form state and validation
5. **Database Operations**: Drizzle ORM provides type-safe database access

## External Dependencies

### Third-party Integrations
- **Unsplash API**: Exercise image fetching (API key configured)
- **External Exercise APIs**: Potential integration with exercise databases

### Key Libraries
- **Frontend**: React, TanStack Query, Wouter, React Hook Form, Zod
- **UI**: Tailwind CSS, Radix UI, Lucide Icons
- **Backend**: Express.js, Drizzle ORM, Connect-PG-Simple
- **Database**: PostgreSQL with Neon serverless driver
- **Development**: Vite, TypeScript, ESBuild

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds to `dist/public` directory
- **Backend**: esbuild bundles server code to `dist` directory
- **Static Assets**: Served directly by Express in production

### Environment Configuration
- **Development**: Vite dev server with HMR and Express backend
- **Production**: Single Express server serving both API and static files
- **Database**: PostgreSQL with connection pooling via Neon

### Hosting Requirements
- **Platform**: Replit with autoscale deployment target
- **Runtime**: Node.js 20 with PostgreSQL 16
- **Port**: Application runs on port 5000

## Changelog

Changelog:
- June 26, 2025. Initial setup
- June 26, 2025. Реструктуризация навигации: перенос "Ученики" в "Кабинет" с новыми вкладками
- January 4, 2025. Интеграция системы активных тренировок с цветными индикаторами
- January 4, 2025. Добавлена валидация календаря для блокировки дат раньше первой тренировки
- January 4, 2025. Обновлена функциональность кнопок в "Создать тренировку": удалена "Сохранить в готовые планы", улучшены "Выбрать ученика" и "Сохранить"
- January 4, 2025. Унифицированы индикаторы гантелей на всех страницах платформы: серые неактивные и оранжевые активные индикаторы состояния тренировок
- January 4, 2025. Реализован улучшенный интерфейс прикрепления планов тренировок: hover-активация готовых планов, клик по карточке для прикрепления, автоматическое прикрепление через кнопку "Сохранить" с мгновенной активацией гантелей
- January 4, 2025. Завершена интеграция системы навигации с кнопками гантелей: исправлена ошибка 404, настроена корректная передача URL параметров, полностью функциональный workflow "Расписание → Кабинет → Тренировки → Прикрепление планов"
- January 4, 2025. Упрощен интерфейс готовых планов: удалена кнопка "Прикрепить" и возможность прикрепления планов через клик по карточке, оставлена только функция "Редактировать"
- January 4, 2025. Полностью удалена возможность прикреплять планы к ученикам: убрана кнопка "Выбрать ученика" на вкладке "Создать тренировку", кнопка "Сохранить" теперь только сохраняет план без прикрепления

## User Preferences

Preferred communication style: Simple, everyday language.