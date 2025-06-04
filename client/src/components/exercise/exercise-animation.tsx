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
          <svg viewBox="0 0 120 120" className={className}>
            <defs>
              <linearGradient id="quadsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff4757" />
                <stop offset="100%" stopColor="#ff6b6b" />
              </linearGradient>
              <linearGradient id="glutesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffa502" />
                <stop offset="100%" stopColor="#ff7675" />
              </linearGradient>
              <linearGradient id="calvesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a29bfe" />
                <stop offset="100%" stopColor="#6c5ce7" />
              </linearGradient>
              <pattern id="muscleFibers" patternUnits="userSpaceOnUse" width="4" height="2">
                <rect width="4" height="2" fill="none"/>
                <path d="M 0 1 L 4 1" stroke="#fff" strokeWidth="0.3" opacity="0.7"/>
              </pattern>
              <pattern id="bonePattern" patternUnits="userSpaceOnUse" width="2" height="2">
                <rect width="2" height="2" fill="#f8f8f8"/>
                <circle cx="1" cy="1" r="0.2" fill="#e0e0e0"/>
              </pattern>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Голова */}
            <circle cx="60" cy="20" r="6" fill="#f4c2a1" stroke="#e17055" strokeWidth="0.5"/>
            
            {/* СКЕЛЕТНАЯ СИСТЕМА */}
            {/* Позвоночник */}
            <rect x="58" y="25" width="4" height="25" fill="url(#bonePattern)" stroke="#ddd" strokeWidth="0.5"
                  transform={isAnimating ? "translate(0, 3)" : "translate(0, 0)"} 
                  style={{ transition: "transform 1s ease-in-out" }} />
            
            {/* Бедренные кости */}
            <rect x="50" y="48" width="3" height="18" fill="url(#bonePattern)" stroke="#ddd" strokeWidth="0.3"
                  transform={isAnimating ? "translate(0, 3)" : "translate(0, 0)"} 
                  style={{ transition: "transform 1s ease-in-out" }} />
            <rect x="67" y="48" width="3" height="18" fill="url(#bonePattern)" stroke="#ddd" strokeWidth="0.3"
                  transform={isAnimating ? "translate(0, 3)" : "translate(0, 0)"} 
                  style={{ transition: "transform 1s ease-in-out" }} />
            
            {/* Большеберцовые кости */}
            <rect x="51" y="78" width="2" height="16" fill="url(#bonePattern)" stroke="#ddd" strokeWidth="0.3"
                  transform={isAnimating ? "translate(0, 2)" : "translate(0, 0)"} 
                  style={{ transition: "transform 1s ease-in-out" }} />
            <rect x="67" y="78" width="2" height="16" fill="url(#bonePattern)" stroke="#ddd" strokeWidth="0.3"
                  transform={isAnimating ? "translate(0, 2)" : "translate(0, 0)"} 
                  style={{ transition: "transform 1s ease-in-out" }} />
            
            {/* Коленные суставы */}
            <circle cx="52" cy="76" r="2" fill="#e0e0e0" stroke="#ccc" strokeWidth="0.5"
                    transform={isAnimating ? "translate(0, 2)" : "translate(0, 0)"} 
                    style={{ transition: "transform 1s ease-in-out" }} />
            <circle cx="68" cy="76" r="2" fill="#e0e0e0" stroke="#ccc" strokeWidth="0.5"
                    transform={isAnimating ? "translate(0, 2)" : "translate(0, 0)"} 
                    style={{ transition: "transform 1s ease-in-out" }} />
            
            {/* Тазобедренные суставы */}
            <circle cx="52" cy="50" r="2.5" fill="#e0e0e0" stroke="#ccc" strokeWidth="0.5"
                    transform={isAnimating ? "translate(0, 3)" : "translate(0, 0)"} 
                    style={{ transition: "transform 1s ease-in-out" }} />
            <circle cx="68" cy="50" r="2.5" fill="#e0e0e0" stroke="#ccc" strokeWidth="0.5"
                    transform={isAnimating ? "translate(0, 3)" : "translate(0, 0)"} 
                    style={{ transition: "transform 1s ease-in-out" }} />
            
            {/* МЫШЕЧНАЯ СИСТЕМА С ВОЛОКНАМИ */}
            {/* Ягодичные мышцы с волокнами */}
            <ellipse cx="60" cy="48" rx="10" ry="6" fill="url(#glutesGradient)" 
                     filter={isAnimating ? "url(#glow)" : "none"}
                     transform={isAnimating ? "translate(0, 4)" : "translate(0, 0)"} 
                     style={{ transition: "transform 1s ease-in-out" }} />
            <ellipse cx="60" cy="48" rx="9" ry="5" fill="url(#muscleFibers)" opacity="0.6"
                     transform={isAnimating ? "translate(0, 4)" : "translate(0, 0)"} 
                     style={{ transition: "transform 1s ease-in-out" }} />
            
            {/* Квадрицепсы с направленными волокнами */}
            <ellipse cx="52" cy="60" rx="4" ry="12" fill="url(#quadsGradient)" 
                     filter={isAnimating ? "url(#glow)" : "none"}
                     transform={isAnimating ? "scale(1.1) translate(0, 3)" : "scale(1) translate(0, 0)"} 
                     style={{ transition: "transform 1s ease-in-out", transformOrigin: "52px 60px" }} />
            {/* Мышечные волокна квадрицепсов */}
            <g transform={isAnimating ? "scale(1.1) translate(0, 3)" : "scale(1) translate(0, 0)"} 
               style={{ transition: "transform 1s ease-in-out", transformOrigin: "52px 60px" }}>
              <path d="M 49 52 L 49 68" stroke="#fff" strokeWidth="0.4" opacity="0.7"/>
              <path d="M 51 52 L 51 68" stroke="#fff" strokeWidth="0.4" opacity="0.7"/>
              <path d="M 53 52 L 53 68" stroke="#fff" strokeWidth="0.4" opacity="0.7"/>
              <path d="M 55 52 L 55 68" stroke="#fff" strokeWidth="0.4" opacity="0.7"/>
            </g>
            
            <ellipse cx="68" cy="60" rx="4" ry="12" fill="url(#quadsGradient)" 
                     filter={isAnimating ? "url(#glow)" : "none"}
                     transform={isAnimating ? "scale(1.1) translate(0, 3)" : "scale(1) translate(0, 0)"} 
                     style={{ transition: "transform 1s ease-in-out", transformOrigin: "68px 60px" }} />
            {/* Мышечные волокна квадрицепсов */}
            <g transform={isAnimating ? "scale(1.1) translate(0, 3)" : "scale(1) translate(0, 0)"} 
               style={{ transition: "transform 1s ease-in-out", transformOrigin: "68px 60px" }}>
              <path d="M 65 52 L 65 68" stroke="#fff" strokeWidth="0.4" opacity="0.7"/>
              <path d="M 67 52 L 67 68" stroke="#fff" strokeWidth="0.4" opacity="0.7"/>
              <path d="M 69 52 L 69 68" stroke="#fff" strokeWidth="0.4" opacity="0.7"/>
              <path d="M 71 52 L 71 68" stroke="#fff" strokeWidth="0.4" opacity="0.7"/>
            </g>
            
            {/* Бицепс бедра с волокнами */}
            <ellipse cx="50" cy="62" rx="2" ry="10" fill="#ff7675" opacity="0.8"
                     filter={isAnimating ? "url(#glow)" : "none"}
                     transform={isAnimating ? "scale(1.05)" : "scale(1)"} 
                     style={{ transition: "transform 1s ease-in-out", transformOrigin: "50px 62px" }} />
            <path d="M 49 55 L 49 69" stroke="#fff" strokeWidth="0.3" opacity="0.6"
                  transform={isAnimating ? "scale(1.05)" : "scale(1)"} 
                  style={{ transition: "transform 1s ease-in-out", transformOrigin: "49px 62px" }}/>
            <path d="M 51 55 L 51 69" stroke="#fff" strokeWidth="0.3" opacity="0.6"
                  transform={isAnimating ? "scale(1.05)" : "scale(1)"} 
                  style={{ transition: "transform 1s ease-in-out", transformOrigin: "51px 62px" }}/>
            
            <ellipse cx="70" cy="62" rx="2" ry="10" fill="#ff7675" opacity="0.8"
                     filter={isAnimating ? "url(#glow)" : "none"}
                     transform={isAnimating ? "scale(1.05)" : "scale(1)"} 
                     style={{ transition: "transform 1s ease-in-out", transformOrigin: "70px 62px" }} />
            <path d="M 69 55 L 69 69" stroke="#fff" strokeWidth="0.3" opacity="0.6"
                  transform={isAnimating ? "scale(1.05)" : "scale(1)"} 
                  style={{ transition: "transform 1s ease-in-out", transformOrigin: "69px 62px" }}/>
            <path d="M 71 55 L 71 69" stroke="#fff" strokeWidth="0.3" opacity="0.6"
                  transform={isAnimating ? "scale(1.05)" : "scale(1)"} 
                  style={{ transition: "transform 1s ease-in-out", transformOrigin: "71px 62px" }}/>
            
            {/* Икроножные мышцы с волокнами */}
            <ellipse cx="54" cy="88" rx="2" ry="6" fill="url(#calvesGradient)" 
                     filter={isAnimating ? "url(#glow)" : "none"}
                     transform={isAnimating ? "scale(1.1)" : "scale(1)"} 
                     style={{ transition: "transform 1s ease-in-out", transformOrigin: "54px 88px" }} />
            <path d="M 53 84 L 53 92" stroke="#fff" strokeWidth="0.3" opacity="0.6"
                  transform={isAnimating ? "scale(1.1)" : "scale(1)"} 
                  style={{ transition: "transform 1s ease-in-out", transformOrigin: "53px 88px" }}/>
            <path d="M 55 84 L 55 92" stroke="#fff" strokeWidth="0.3" opacity="0.6"
                  transform={isAnimating ? "scale(1.1)" : "scale(1)"} 
                  style={{ transition: "transform 1s ease-in-out", transformOrigin: "55px 88px" }}/>
            
            <ellipse cx="66" cy="88" rx="2" ry="6" fill="url(#calvesGradient)" 
                     filter={isAnimating ? "url(#glow)" : "none"}
                     transform={isAnimating ? "scale(1.1)" : "scale(1)"} 
                     style={{ transition: "transform 1s ease-in-out", transformOrigin: "66px 88px" }} />
            <path d="M 65 84 L 65 92" stroke="#fff" strokeWidth="0.3" opacity="0.6"
                  transform={isAnimating ? "scale(1.1)" : "scale(1)"} 
                  style={{ transition: "transform 1s ease-in-out", transformOrigin: "65px 88px" }}/>
            <path d="M 67 84 L 67 92" stroke="#fff" strokeWidth="0.3" opacity="0.6"
                  transform={isAnimating ? "scale(1.1)" : "scale(1)"} 
                  style={{ transition: "transform 1s ease-in-out", transformOrigin: "67px 88px" }}/>
            
            {/* Торс */}
            <ellipse cx="60" cy="35" rx="8" ry="12" fill="#4a90e2" opacity="0.7"
                     transform={isAnimating ? "translate(0, 3)" : "translate(0, 0)"} 
                     style={{ transition: "transform 1s ease-in-out" }} />
            
            {/* Штанга */}
            <rect x="25" y={isAnimating ? "31" : "26"} width="70" height="4" fill="#2d3436" rx="2"
                  style={{ transition: "y 1s ease-in-out" }} />
            <circle cx="28" cy={isAnimating ? "33" : "28"} r="4" fill="#636e72" 
                    style={{ transition: "cy 1s ease-in-out" }} />
            <circle cx="92" cy={isAnimating ? "33" : "28"} r="4" fill="#636e72" 
                    style={{ transition: "cy 1s ease-in-out" }} />
            
            {/* Руки */}
            <ellipse cx="40" cy="38" rx="3" ry="8" fill="#4a90e2" opacity="0.7"
                     transform={isAnimating ? "translate(0, 3)" : "translate(0, 0)"} 
                     style={{ transition: "transform 1s ease-in-out" }} />
            <ellipse cx="80" cy="38" rx="3" ry="8" fill="#4a90e2" opacity="0.7"
                     transform={isAnimating ? "translate(0, 3)" : "translate(0, 0)"} 
                     style={{ transition: "transform 1s ease-in-out" }} />
            
            {/* Стопы */}
            <ellipse cx="52" cy="98" rx="4" ry="2" fill="#2d3436" />
            <ellipse cx="68" cy="98" rx="4" ry="2" fill="#2d3436" />
            
            {/* Силовые векторы */}
            {isAnimating && (
              <>
                <path d="M 35 55 L 35 65 M 30 60 L 35 65 L 40 60" stroke="#ff4757" strokeWidth="2.5" fill="none" opacity="0.9"/>
                <path d="M 85 55 L 85 65 M 80 60 L 85 65 L 90 60" stroke="#ff4757" strokeWidth="2.5" fill="none" opacity="0.9"/>
                <text x="25" y="72" fontSize="5" fill="#ff4757" fontWeight="bold">СИЛА</text>
                <text x="75" y="72" fontSize="5" fill="#ff4757" fontWeight="bold">СИЛА</text>
              </>
            )}
            
            <text x="60" y="110" textAnchor="middle" fontSize="8" fill="#2d3436" fontWeight="bold">Приседания - Анатомия</text>
          </svg>
        );

      case 'жим штанги лежа':
        return (
          <svg viewBox="0 0 120 120" className={className}>
            <defs>
              <linearGradient id="chestMajorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e74c3c" />
                <stop offset="100%" stopColor="#ff6b6b" />
              </linearGradient>
              <linearGradient id="tricepsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#74b9ff" />
                <stop offset="100%" stopColor="#0984e3" />
              </linearGradient>
              <linearGradient id="deltoidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fdcb6e" />
                <stop offset="100%" stopColor="#e17055" />
              </linearGradient>
              <pattern id="chestFibers" patternUnits="userSpaceOnUse" width="6" height="3" patternTransform="rotate(15)">
                <rect width="6" height="3" fill="none"/>
                <path d="M 0 1.5 L 6 1.5" stroke="#fff" strokeWidth="0.4" opacity="0.8"/>
              </pattern>
              <pattern id="tricepsFibers" patternUnits="userSpaceOnUse" width="3" height="8">
                <rect width="3" height="8" fill="none"/>
                <path d="M 1.5 0 L 1.5 8" stroke="#fff" strokeWidth="0.3" opacity="0.7"/>
              </pattern>
              <pattern id="ribPattern" patternUnits="userSpaceOnUse" width="3" height="2">
                <rect width="3" height="2" fill="#f5f5f5"/>
                <path d="M 0 1 L 3 1" stroke="#e0e0e0" strokeWidth="0.3"/>
              </pattern>
              <filter id="chestGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Скамья */}
            <rect x="15" y="70" width="90" height="10" fill="#8b4513" rx="3" stroke="#6c5ce7" strokeWidth="1"/>
            <rect x="10" y="65" width="15" height="20" fill="#6c5ce7" rx="2"/> 
            <rect x="95" y="65" width="15" height="20" fill="#6c5ce7" rx="2"/>
            
            {/* Голова */}
            <circle cx="25" cy="60" r="7" fill="#f4c2a1" stroke="#e17055" strokeWidth="0.8"/>
            
            {/* Торс и грудные мышцы */}
            <ellipse cx="55" cy="65" rx="18" ry="10" fill="#ddd" opacity="0.3"/>
            
            {/* Большая грудная мышца (веерообразная) */}
            <path d="M 40 60 Q 55 55 70 60 Q 65 70 55 72 Q 45 70 40 60" 
                  fill="url(#chestMajorGradient)" 
                  filter={isAnimating ? "url(#chestGlow)" : "none"}
                  transform={isAnimating ? "scale(1.15)" : "scale(1)"} 
                  style={{ transition: "transform 1s ease-in-out", transformOrigin: "55px 65px" }}/>
            
            {/* Малая грудная мышца */}
            <ellipse cx="45" cy="62" rx="3" ry="6" fill="#ff7675" opacity="0.8"
                     filter={isAnimating ? "url(#chestGlow)" : "none"}
                     transform={isAnimating ? "scale(1.1)" : "scale(1)"} 
                     style={{ transition: "transform 1s ease-in-out", transformOrigin: "45px 62px" }}/>
            <ellipse cx="65" cy="62" rx="3" ry="6" fill="#ff7675" opacity="0.8"
                     filter={isAnimating ? "url(#chestGlow)" : "none"}
                     transform={isAnimating ? "scale(1.1)" : "scale(1)"} 
                     style={{ transition: "transform 1s ease-in-out", transformOrigin: "65px 62px" }}/>
            
            {/* Передние дельты */}
            <ellipse cx="38" cy="58" rx="4" ry="6" fill="url(#deltoidGradient)" 
                     filter={isAnimating ? "url(#chestGlow)" : "none"}
                     transform={isAnimating ? "scale(1.08)" : "scale(1)"} 
                     style={{ transition: "transform 1s ease-in-out", transformOrigin: "38px 58px" }}/>
            <ellipse cx="72" cy="58" rx="4" ry="6" fill="url(#deltoidGradient)" 
                     filter={isAnimating ? "url(#chestGlow)" : "none"}
                     transform={isAnimating ? "scale(1.08)" : "scale(1)"} 
                     style={{ transition: "transform 1s ease-in-out", transformOrigin: "72px 58px" }}/>
            
            {/* Штанга */}
            <rect x="20" y={isAnimating ? "45" : "30"} width="80" height="5" fill="#2d3436" rx="2.5"
                  style={{ transition: "y 1.2s ease-in-out" }} />
            <circle cx="23" cy={isAnimating ? "47.5" : "32.5"} r="5" fill="#636e72" 
                    style={{ transition: "cy 1.2s ease-in-out" }} />
            <circle cx="97" cy={isAnimating ? "47.5" : "32.5"} r="5" fill="#636e72" 
                    style={{ transition: "cy 1.2s ease-in-out" }} />
            
            {/* Руки и трицепсы */}
            <ellipse cx="35" cy={isAnimating ? "55" : "40"} rx="3" ry="12" fill="#4a90e2" 
                     style={{ transition: "cy 1s ease-in-out" }} />
            <ellipse cx="75" cy={isAnimating ? "55" : "40"} rx="3" ry="12" fill="#4a90e2" 
                     style={{ transition: "cy 1s ease-in-out" }} />
            
            {/* Трицепсы */}
            <ellipse cx="33" cy={isAnimating ? "50" : "38"} rx="2" ry="8" fill="url(#tricepsGradient)" 
                     filter={isAnimating ? "url(#chestGlow)" : "none"}
                     transform={isAnimating ? "scale(1.12)" : "scale(1)"} 
                     style={{ transition: "cy 1s ease-in-out, transform 1s ease-in-out", transformOrigin: "33px 44px" }}/>
            <ellipse cx="77" cy={isAnimating ? "50" : "38"} rx="2" ry="8" fill="url(#tricepsGradient)" 
                     filter={isAnimating ? "url(#chestGlow)" : "none"}
                     transform={isAnimating ? "scale(1.12)" : "scale(1)"} 
                     style={{ transition: "cy 1s ease-in-out, transform 1s ease-in-out", transformOrigin: "77px 44px" }}/>
            
            {/* Ноги на полу */}
            <ellipse cx="85" cy="85" rx="4" ry="12" fill="#4a90e2" />
            <ellipse cx="95" cy="85" rx="4" ry="12" fill="#4a90e2" />
            
            {/* Стрелки направления движения */}
            {isAnimating ? (
              <>
                <path d="M 15 40 L 15 50 M 10 45 L 15 50 L 20 45" stroke="#e74c3c" strokeWidth="2.5" fill="none" opacity="0.9"/>
                <path d="M 105 40 L 105 50 M 100 45 L 105 50 L 110 45" stroke="#e74c3c" strokeWidth="2.5" fill="none" opacity="0.9"/>
              </>
            ) : (
              <>
                <path d="M 15 50 L 15 40 M 10 45 L 15 40 L 20 45" stroke="#00b894" strokeWidth="2.5" fill="none" opacity="0.9"/>
                <path d="M 105 50 L 105 40 M 100 45 L 105 40 L 110 45" stroke="#00b894" strokeWidth="2.5" fill="none" opacity="0.9"/>
              </>
            )}
            
            <text x="60" y="110" textAnchor="middle" fontSize="8" fill="#2d3436" fontWeight="bold">Жим лежа</text>
          </svg>
        );

      case 'становая тяга':
        return (
          <svg viewBox="0 0 120 120" className={className}>
            <defs>
              <linearGradient id="backMusclesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3498db" />
                <stop offset="100%" stopColor="#5dade2" />
              </linearGradient>
              <linearGradient id="trapsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00b894" />
                <stop offset="100%" stopColor="#55efc4" />
              </linearGradient>
              <linearGradient id="erectorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6c5ce7" />
                <stop offset="100%" stopColor="#a29bfe" />
              </linearGradient>
              <linearGradient id="hamstringsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fd79a8" />
                <stop offset="100%" stopColor="#e84393" />
              </linearGradient>
              <filter id="backGlow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Голова */}
            <circle cx="60" cy="15" r="6" fill="#f4c2a1" stroke="#e17055" strokeWidth="0.5"
                    transform={isAnimating ? "translate(5, 8)" : "translate(-2, 15)"} 
                    style={{ transition: "transform 1.2s ease-in-out" }} />
            
            {/* Торс (вид сбоку) */}
            <ellipse cx="60" cy="35" rx="8" ry="18" fill="#ddd" opacity="0.4"
                     transform={isAnimating ? "rotate(-10 60 35) translate(2, 8)" : "rotate(-45 60 35) translate(-5, 12)"} 
                     style={{ transition: "transform 1.2s ease-in-out" }} />
            
            {/* Трапециевидные мышцы */}
            <path d="M 52 25 Q 60 20 68 25 L 65 35 Q 60 32 55 35 Z" 
                  fill="url(#trapsGradient)" 
                  filter={isAnimating ? "url(#backGlow)" : "none"}
                  transform={isAnimating ? "rotate(-10 60 30) translate(2, 8)" : "rotate(-45 60 30) translate(-5, 12)"} 
                  style={{ transition: "transform 1.2s ease-in-out" }}/>
            
            {/* Широчайшие мышцы спины */}
            <ellipse cx="55" cy="40" rx="6" ry="12" fill="url(#backMusclesGradient)" 
                     filter={isAnimating ? "url(#backGlow)" : "none"}
                     transform={isAnimating ? "rotate(-10 55 40) scale(1.1) translate(2, 8)" : "rotate(-45 55 40) scale(1) translate(-5, 12)"} 
                     style={{ transition: "transform 1.2s ease-in-out" }}/>
            <ellipse cx="65" cy="40" rx="6" ry="12" fill="url(#backMusclesGradient)" 
                     filter={isAnimating ? "url(#backGlow)" : "none"}
                     transform={isAnimating ? "rotate(-10 65 40) scale(1.1) translate(2, 8)" : "rotate(-45 65 40) scale(1) translate(-5, 12)"} 
                     style={{ transition: "transform 1.2s ease-in-out" }}/>
            
            {/* Мышцы-разгибатели спины */}
            <ellipse cx="58" cy="50" rx="2" ry="20" fill="url(#erectorGradient)" 
                     filter={isAnimating ? "url(#backGlow)" : "none"}
                     transform={isAnimating ? "rotate(-10 58 50) scale(1.15) translate(2, 8)" : "rotate(-45 58 50) scale(1) translate(-5, 12)"} 
                     style={{ transition: "transform 1.2s ease-in-out" }}/>
            <ellipse cx="62" cy="50" rx="2" ry="20" fill="url(#erectorGradient)" 
                     filter={isAnimating ? "url(#backGlow)" : "none"}
                     transform={isAnimating ? "rotate(-10 62 50) scale(1.15) translate(2, 8)" : "rotate(-45 62 50) scale(1) translate(-5, 12)"} 
                     style={{ transition: "transform 1.2s ease-in-out" }}/>
            
            {/* Ягодичные мышцы */}
            <ellipse cx="60" cy="60" rx="8" ry="6" fill="url(#glutesGradient)" 
                     filter={isAnimating ? "url(#backGlow)" : "none"}
                     transform={isAnimating ? "rotate(-5 60 60) translate(3, 5)" : "rotate(-30 60 60) translate(-3, 8)"} 
                     style={{ transition: "transform 1.2s ease-in-out" }}/>
            
            {/* Бицепс бедра */}
            <ellipse cx="55" cy="75" rx="4" ry="12" fill="url(#hamstringsGradient)" 
                     filter={isAnimating ? "url(#backGlow)" : "none"}
                     transform={isAnimating ? "scale(1.08) translate(1, 3)" : "scale(1) translate(-2, 5)"} 
                     style={{ transition: "transform 1.2s ease-in-out" }}/>
            <ellipse cx="65" cy="75" rx="4" ry="12" fill="url(#hamstringsGradient)" 
                     filter={isAnimating ? "url(#backGlow)" : "none"}
                     transform={isAnimating ? "scale(1.08) translate(1, 3)" : "scale(1) translate(-2, 5)"} 
                     style={{ transition: "transform 1.2s ease-in-out" }}/>
            
            {/* Голени */}
            <ellipse cx="55" cy="95" rx="3" ry="10" fill="#4a90e2" />
            <ellipse cx="65" cy="95" rx="3" ry="10" fill="#4a90e2" />
            
            {/* Руки */}
            <ellipse cx="45" cy="50" rx="3" ry="15" fill="#4a90e2" 
                     transform={isAnimating ? "rotate(-15 45 50) translate(8, 15)" : "rotate(-45 45 50) translate(2, 25)"} 
                     style={{ transition: "transform 1.2s ease-in-out" }}/>
            <ellipse cx="75" cy="50" rx="3" ry="15" fill="#4a90e2" 
                     transform={isAnimating ? "rotate(-15 75 50) translate(8, 15)" : "rotate(-45 75 50) translate(2, 25)"} 
                     style={{ transition: "transform 1.2s ease-in-out" }}/>
            
            {/* Предплечья */}
            <ellipse cx="40" cy="65" rx="2" ry="8" fill="#fd79a8" opacity="0.8"
                     filter={isAnimating ? "url(#backGlow)" : "none"}
                     transform={isAnimating ? "rotate(-10 40 65) translate(15, 15)" : "rotate(-30 40 65) translate(8, 22)"} 
                     style={{ transition: "transform 1.2s ease-in-out" }}/>
            <ellipse cx="80" cy="65" rx="2" ry="8" fill="#fd79a8" opacity="0.8"
                     filter={isAnimating ? "url(#backGlow)" : "none"}
                     transform={isAnimating ? "rotate(-10 80 65) translate(15, 15)" : "rotate(-30 80 65) translate(8, 22)"} 
                     style={{ transition: "transform 1.2s ease-in-out" }}/>
            
            {/* Штанга */}
            <rect x="20" y={isAnimating ? "70" : "85"} width="80" height="4" fill="#2d3436" rx="2"
                  style={{ transition: "y 1.2s ease-in-out" }} />
            <circle cx="23" cy={isAnimating ? "72" : "87"} r="5" fill="#636e72" 
                    style={{ transition: "cy 1.2s ease-in-out" }} />
            <circle cx="97" cy={isAnimating ? "72" : "87"} r="5" fill="#636e72" 
                    style={{ transition: "cy 1.2s ease-in-out" }} />
            
            {/* Стрелки направления движения */}
            {isAnimating ? (
              <path d="M 25 80 L 25 70 M 20 75 L 25 70 L 30 75" stroke="#00b894" strokeWidth="3" fill="none" opacity="0.9"/>
            ) : (
              <path d="M 25 70 L 25 80 M 20 75 L 25 80 L 30 75" stroke="#e17055" strokeWidth="3" fill="none" opacity="0.9"/>
            )}
            
            <text x="60" y="110" textAnchor="middle" fontSize="8" fill="#2d3436" fontWeight="bold">Становая тяга</text>
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