import { useState, useEffect } from 'react';

interface ExerciseAnimationProps {
  exerciseName: string;
  className?: string;
}

export function ExerciseAnimation({ exerciseName, className = "w-32 h-32" }: ExerciseAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getExerciseAnimation = () => {
    switch (exerciseName.toLowerCase()) {
      case 'приседания со штангой':
        return (
          <svg viewBox="0 0 100 100" className={className}>
            <defs>
              <linearGradient id="muscleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="100%" stopColor="#ff8e8e" />
              </linearGradient>
            </defs>
            
            {/* Тело */}
            <rect x="45" y="30" width="10" height="25" fill="#4a90e2" rx="2" 
                  transform={isAnimating ? "translate(0, 5)" : "translate(0, 0)"} 
                  style={{ transition: "transform 1s ease-in-out" }} />
            
            {/* Голова */}
            <circle cx="50" cy="25" r="5" fill="#f4c2a1" />
            
            {/* Штанга */}
            <rect x="30" y={isAnimating ? "33" : "28"} width="40" height="3" fill="#333" 
                  style={{ transition: "y 1s ease-in-out" }} />
            <circle cx="32" cy={isAnimating ? "34.5" : "29.5"} r="3" fill="#666" 
                    style={{ transition: "cy 1s ease-in-out" }} />
            <circle cx="68" cy={isAnimating ? "34.5" : "29.5"} r="3" fill="#666" 
                    style={{ transition: "cy 1s ease-in-out" }} />
            
            {/* Ноги */}
            <rect x="42" y="55" width="6" height={isAnimating ? "20" : "25"} fill="url(#muscleGradient)" rx="1"
                  style={{ transition: "height 1s ease-in-out" }} />
            <rect x="52" y="55" width="6" height={isAnimating ? "20" : "25"} fill="url(#muscleGradient)" rx="1"
                  style={{ transition: "height 1s ease-in-out" }} />
            
            {/* Руки */}
            <rect x="35" y="35" width="8" height="3" fill="#4a90e2" rx="1" />
            <rect x="57" y="35" width="8" height="3" fill="#4a90e2" rx="1" />
            
            <text x="50" y="90" textAnchor="middle" fontSize="6" fill="#666">Приседания</text>
          </svg>
        );

      case 'жим штанги лежа':
        return (
          <svg viewBox="0 0 100 100" className={className}>
            <defs>
              <linearGradient id="chestGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e74c3c" />
                <stop offset="100%" stopColor="#ff6b6b" />
              </linearGradient>
            </defs>
            
            {/* Скамья */}
            <rect x="20" y="55" width="60" height="8" fill="#8b4513" rx="2" />
            
            {/* Тело лежа */}
            <rect x="40" y="47" width="20" height="8" fill="url(#chestGradient)" rx="2" />
            
            {/* Голова */}
            <circle cx="30" cy="51" r="5" fill="#f4c2a1" />
            
            {/* Штанга */}
            <rect x="25" y={isAnimating ? "35" : "25"} width="50" height="3" fill="#333" 
                  style={{ transition: "y 1s ease-in-out" }} />
            <circle cx="27" cy={isAnimating ? "36.5" : "26.5"} r="3" fill="#666" 
                    style={{ transition: "cy 1s ease-in-out" }} />
            <circle cx="73" cy={isAnimating ? "36.5" : "26.5"} r="3" fill="#666" 
                    style={{ transition: "cy 1s ease-in-out" }} />
            
            {/* Руки */}
            <rect x="35" y={isAnimating ? "40" : "30"} width="5" height="12" fill="#4a90e2" rx="1"
                  style={{ transition: "y 1s ease-in-out" }} />
            <rect x="60" y={isAnimating ? "40" : "30"} width="5" height="12" fill="#4a90e2" rx="1"
                  style={{ transition: "y 1s ease-in-out" }} />
            
            {/* Ноги */}
            <rect x="65" y="55" width="6" height="20" fill="#4a90e2" rx="1" />
            <rect x="75" y="55" width="6" height="20" fill="#4a90e2" rx="1" />
            
            <text x="50" y="90" textAnchor="middle" fontSize="6" fill="#666">Жим лежа</text>
          </svg>
        );

      case 'становая тяга':
        return (
          <svg viewBox="0 0 100 100" className={className}>
            <defs>
              <linearGradient id="backGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3498db" />
                <stop offset="100%" stopColor="#5dade2" />
              </linearGradient>
            </defs>
            
            {/* Тело */}
            <rect x="45" y="25" width="10" height="30" fill="url(#backGradient)" rx="2" 
                  transform={isAnimating ? "rotate(-15 50 40)" : "rotate(-45 50 40)"} 
                  style={{ transition: "transform 1s ease-in-out" }} />
            
            {/* Голова */}
            <circle cx="50" cy="20" r="5" fill="#f4c2a1" 
                    transform={isAnimating ? "translate(-2, 0)" : "translate(-8, 8)"} 
                    style={{ transition: "transform 1s ease-in-out" }} />
            
            {/* Штанга */}
            <rect x="30" y={isAnimating ? "65" : "75"} width="40" height="3" fill="#333" 
                  style={{ transition: "y 1s ease-in-out" }} />
            <circle cx="32" cy={isAnimating ? "66.5" : "76.5"} r="3" fill="#666" 
                    style={{ transition: "cy 1s ease-in-out" }} />
            <circle cx="68" cy={isAnimating ? "66.5" : "76.5"} r="3" fill="#666" 
                    style={{ transition: "cy 1s ease-in-out" }} />
            
            {/* Руки */}
            <rect x="40" y={isAnimating ? "45" : "55"} width="5" height="20" fill="#4a90e2" rx="1"
                  style={{ transition: "y 1s ease-in-out" }} />
            <rect x="55" y={isAnimating ? "45" : "55"} width="5" height="20" fill="#4a90e2" rx="1"
                  style={{ transition: "y 1s ease-in-out" }} />
            
            {/* Ноги */}
            <rect x="42" y="55" width="6" height="20" fill="url(#backGradient)" rx="1" />
            <rect x="52" y="55" width="6" height="20" fill="url(#backGradient)" rx="1" />
            
            <text x="50" y="90" textAnchor="middle" fontSize="6" fill="#666">Становая тяга</text>
          </svg>
        );

      case 'подтягивания':
        return (
          <svg viewBox="0 0 100 100" className={className}>
            <defs>
              <linearGradient id="latsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9b59b6" />
                <stop offset="100%" stopColor="#bb6bd9" />
              </linearGradient>
            </defs>
            
            {/* Турник */}
            <rect x="20" y="15" width="60" height="3" fill="#333" />
            <rect x="18" y="10" width="4" height="10" fill="#666" />
            <rect x="78" y="10" width="4" height="10" fill="#666" />
            
            {/* Тело */}
            <rect x="45" y={isAnimating ? "25" : "35"} width="10" height="25" fill="url(#latsGradient)" rx="2" 
                  style={{ transition: "y 1s ease-in-out" }} />
            
            {/* Голова */}
            <circle cx="50" cy={isAnimating ? "20" : "30"} r="5" fill="#f4c2a1" 
                    style={{ transition: "cy 1s ease-in-out" }} />
            
            {/* Руки */}
            <rect x="35" y="18" width="6" height={isAnimating ? "12" : "22"} fill="#4a90e2" rx="1"
                  style={{ transition: "height 1s ease-in-out" }} />
            <rect x="59" y="18" width="6" height={isAnimating ? "12" : "22"} fill="#4a90e2" rx="1"
                  style={{ transition: "height 1s ease-in-out" }} />
            
            {/* Ноги */}
            <rect x="42" y={isAnimating ? "50" : "60"} width="6" height="15" fill="#4a90e2" rx="1"
                  style={{ transition: "y 1s ease-in-out" }} />
            <rect x="52" y={isAnimating ? "50" : "60"} width="6" height="15" fill="#4a90e2" rx="1"
                  style={{ transition: "y 1s ease-in-out" }} />
            
            <text x="50" y="90" textAnchor="middle" fontSize="6" fill="#666">Подтягивания</text>
          </svg>
        );

      case 'планка':
        return (
          <svg viewBox="0 0 100 100" className={className}>
            <defs>
              <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f39c12" />
                <stop offset="100%" stopColor="#f7dc6f" />
              </linearGradient>
            </defs>
            
            {/* Тело в планке */}
            <rect x="25" y="45" width="50" height="8" fill="url(#coreGradient)" rx="2" 
                  transform={isAnimating ? "translate(0, 2)" : "translate(0, 0)"} 
                  style={{ transition: "transform 1s ease-in-out" }} />
            
            {/* Голова */}
            <circle cx="20" cy="49" r="5" fill="#f4c2a1" 
                    transform={isAnimating ? "translate(0, 2)" : "translate(0, 0)"} 
                    style={{ transition: "transform 1s ease-in-out" }} />
            
            {/* Предплечья */}
            <rect x="15" y="50" width="12" height="4" fill="#4a90e2" rx="1"
                  transform={isAnimating ? "translate(0, 2)" : "translate(0, 0)"} 
                  style={{ transition: "transform 1s ease-in-out" }} />
            
            {/* Ноги */}
            <rect x="70" y="45" width="6" height="15" fill="#4a90e2" rx="1"
                  transform={isAnimating ? "translate(0, 2)" : "translate(0, 0)"} 
                  style={{ transition: "transform 1s ease-in-out" }} />
            <rect x="78" y="45" width="6" height="15" fill="#4a90e2" rx="1"
                  transform={isAnimating ? "translate(0, 2)" : "translate(0, 0)"} 
                  style={{ transition: "transform 1s ease-in-out" }} />
            
            {/* Таймер */}
            <circle cx="50" cy="30" r="8" fill="none" stroke="#f39c12" strokeWidth="2" 
                    strokeDasharray={isAnimating ? "50" : "25"} strokeDashoffset="0"
                    style={{ transition: "stroke-dasharray 1s ease-in-out" }} />
            <text x="50" y="32" textAnchor="middle" fontSize="5" fill="#f39c12">
              {isAnimating ? "30s" : "60s"}
            </text>
            
            <text x="50" y="90" textAnchor="middle" fontSize="6" fill="#666">Планка</text>
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 100 100" className={className}>
            <rect x="20" y="20" width="60" height="60" fill="#ecf0f1" rx="5" />
            <text x="50" y="55" textAnchor="middle" fontSize="8" fill="#95a5a6">
              {exerciseName}
            </text>
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col items-center">
      {getExerciseAnimation()}
    </div>
  );
}