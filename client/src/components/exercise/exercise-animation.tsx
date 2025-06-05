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
          <svg viewBox="0 0 160 120" className={className}>
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
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Разделительная линия между ракурсами */}
            <line x1="80" y1="5" x2="80" y2="105" stroke="#ddd" strokeWidth="2" strokeDasharray="3,3"/>
            
            {/* ЛЕВАЯ СТОРОНА - ВИД СБОКУ (ПРОФИЛЬ) */}
            <g>
              <text x="40" y="15" textAnchor="middle" fontSize="7" fill="#666" fontWeight="bold">ВИД СБОКУ</text>
              
              {/* Голова профиль */}
              <circle cx="40" cy="25" r="4" fill="#f4c2a1" stroke="#e17055" strokeWidth="0.5"/>
              
              {/* Торс профиль */}
              <ellipse cx="40" cy="35" rx="6" ry="8" fill="#4a90e2" opacity="0.7"
                       transform={isAnimating ? "translate(0, 2)" : "translate(0, 0)"} 
                       style={{ transition: "transform 1s ease-in-out" }} />
              
              {/* Штанга профиль */}
              <rect x="20" y={isAnimating ? "31" : "29"} width="40" height="3" fill="#2d3436" rx="1"
                    style={{ transition: "y 1s ease-in-out" }} />
              <circle cx="22" cy={isAnimating ? "32.5" : "30.5"} r="2.5" fill="#636e72" 
                      style={{ transition: "cy 1s ease-in-out" }} />
              <circle cx="58" cy={isAnimating ? "32.5" : "30.5"} r="2.5" fill="#636e72" 
                      style={{ transition: "cy 1s ease-in-out" }} />
              
              {/* Ноги профиль */}
              <ellipse cx="35" cy="55" rx="3" ry="8" fill="url(#quadsGradient)" 
                       filter={isAnimating ? "url(#glow)" : "none"}
                       transform={isAnimating ? "translate(0, 2)" : "translate(0, 0)"} 
                       style={{ transition: "transform 1s ease-in-out" }} />
              <ellipse cx="45" cy="55" rx="3" ry="8" fill="url(#quadsGradient)" 
                       filter={isAnimating ? "url(#glow)" : "none"}
                       transform={isAnimating ? "translate(0, 2)" : "translate(0, 0)"} 
                       style={{ transition: "transform 1s ease-in-out" }} />
              
              {/* Голени профиль */}
              <ellipse cx="35" cy="70" rx="2" ry="6" fill="#4a90e2" />
              <ellipse cx="45" cy="70" rx="2" ry="6" fill="#4a90e2" />
              
              {/* Стопы профиль */}
              <ellipse cx="35" cy="78" rx="3" ry="1.5" fill="#2d3436" />
              <ellipse cx="45" cy="78" rx="3" ry="1.5" fill="#2d3436" />
            </g>
            
            {/* ПРАВАЯ СТОРОНА - ВИД СВЕРХУ */}
            <g>
              <text x="120" y="15" textAnchor="middle" fontSize="7" fill="#666" fontWeight="bold">ВИД СВЕРХУ</text>
              
              {/* Голова сверху */}
              <circle cx="120" cy="25" r="4" fill="#f4c2a1" stroke="#e17055" strokeWidth="0.5"/>
              
              {/* Плечи и торс сверху */}
              <ellipse cx="120" cy="35" rx="12" ry="6" fill="#4a90e2" opacity="0.7"
                       transform={isAnimating ? "translate(0, 1)" : "translate(0, 0)"} 
                       style={{ transition: "transform 1s ease-in-out" }} />
              
              {/* Штанга сверху */}
              <rect x="95" y={isAnimating ? "30" : "29"} width="50" height="3" fill="#2d3436" rx="1"
                    style={{ transition: "y 1s ease-in-out" }} />
              <circle cx="97" cy={isAnimating ? "31.5" : "30.5"} r="2.5" fill="#636e72" 
                      style={{ transition: "cy 1s ease-in-out" }} />
              <circle cx="143" cy={isAnimating ? "31.5" : "30.5"} r="2.5" fill="#636e72" 
                      style={{ transition: "cy 1s ease-in-out" }} />
              
              {/* Руки сверху */}
              <ellipse cx="105" cy="35" rx="3" ry="8" fill="#4a90e2" opacity="0.8"
                       transform={isAnimating ? "translate(0, 1)" : "translate(0, 0)"} 
                       style={{ transition: "transform 1s ease-in-out" }} />
              <ellipse cx="135" cy="35" rx="3" ry="8" fill="#4a90e2" opacity="0.8"
                       transform={isAnimating ? "translate(0, 1)" : "translate(0, 0)"} 
                       style={{ transition: "transform 1s ease-in-out" }} />
              
              {/* Таз и бедра сверху */}
              <ellipse cx="120" cy="50" rx="8" ry="5" fill="url(#glutesGradient)" 
                       filter={isAnimating ? "url(#glow)" : "none"}
                       transform={isAnimating ? "scale(1.1)" : "scale(1)"} 
                       style={{ transition: "transform 1s ease-in-out", transformOrigin: "120px 50px" }} />
              
              {/* Ноги сверху */}
              <ellipse cx="115" cy="65" rx="3" ry="10" fill="url(#quadsGradient)" 
                       filter={isAnimating ? "url(#glow)" : "none"}
                       transform={isAnimating ? "scale(1.05)" : "scale(1)"} 
                       style={{ transition: "transform 1s ease-in-out", transformOrigin: "115px 65px" }} />
              <ellipse cx="125" cy="65" rx="3" ry="10" fill="url(#quadsGradient)" 
                       filter={isAnimating ? "url(#glow)" : "none"}
                       transform={isAnimating ? "scale(1.05)" : "scale(1)"} 
                       style={{ transition: "transform 1s ease-in-out", transformOrigin: "125px 65px" }} />
              
              {/* Стопы сверху */}
              <ellipse cx="115" cy="78" rx="2" ry="4" fill="#2d3436" />
              <ellipse cx="125" cy="78" rx="2" ry="4" fill="#2d3436" />
              
              {/* Стрелки стабильности сверху */}
              {isAnimating && (
                <>
                  <path d="M 110 45 L 105 45 M 107 42 L 105 45 L 107 48" stroke="#00b894" strokeWidth="1.5" fill="none" opacity="0.8"/>
                  <path d="M 130 45 L 135 45 M 133 42 L 135 45 L 133 48" stroke="#00b894" strokeWidth="1.5" fill="none" opacity="0.8"/>
                  <text x="100" y="52" fontSize="4" fill="#00b894" fontWeight="bold">БАЛАНС</text>
                </>
              )}
            </g>
            
            {/* Стрелки движения для профиля */}
            {isAnimating && (
              <g>
                <path d="M 25 55 L 25 65 M 20 60 L 25 65 L 30 60" stroke="#ff4757" strokeWidth="2" fill="none" opacity="0.8"/>
                <path d="M 55 55 L 55 65 M 50 60 L 55 65 L 60 60" stroke="#ff4757" strokeWidth="2" fill="none" opacity="0.8"/>
              </g>
            )}
            
            <text x="80" y="115" textAnchor="middle" fontSize="8" fill="#2d3436" fontWeight="bold">Приседания - Двойной ракурс</text>
          </svg>
        );

      case 'жим штанги лежа':
        return (
          <svg viewBox="0 0 160 120" className={className}>
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
              <filter id="chestGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Разделительная линия между ракурсами */}
            <line x1="80" y1="5" x2="80" y2="105" stroke="#ddd" strokeWidth="2" strokeDasharray="3,3"/>
            
            {/* ЛЕВАЯ СТОРОНА - ВИД СБОКУ */}
            <g>
              <text x="40" y="15" textAnchor="middle" fontSize="7" fill="#666" fontWeight="bold">ВИД СБОКУ</text>
              
              {/* Скамья сбоку */}
              <rect x="10" y="55" width="60" height="8" fill="#8b4513" rx="2"/>
              <rect x="5" y="50" width="10" height="18" fill="#6c5ce7" rx="1"/>
              
              {/* Голова сбоку */}
              <circle cx="15" cy="45" r="4" fill="#f4c2a1" stroke="#e17055" strokeWidth="0.5"/>
              
              {/* Торс сбоку */}
              <ellipse cx="30" cy="50" rx="8" ry="5" fill="#4a90e2" opacity="0.7"/>
              
              {/* Грудные мышцы сбоку */}
              <ellipse cx="38" cy="48" rx="6" ry="4" fill="url(#chestMajorGradient)" 
                       filter={isAnimating ? "url(#chestGlow)" : "none"}
                       transform={isAnimating ? "scale(1.1)" : "scale(1)"} 
                       style={{ transition: "transform 1s ease-in-out", transformOrigin: "38px 48px" }} />
              
              {/* Руки сбоку */}
              <ellipse cx="20" cy="40" rx="2" ry="8" fill="url(#tricepsGradient)" 
                       filter={isAnimating ? "url(#chestGlow)" : "none"}
                       transform={isAnimating ? "translate(0, -3)" : "translate(0, 2)"} 
                       style={{ transition: "transform 1s ease-in-out" }} />
              <ellipse cx="50" cy="40" rx="2" ry="8" fill="url(#tricepsGradient)" 
                       filter={isAnimating ? "url(#chestGlow)" : "none"}
                       transform={isAnimating ? "translate(0, -3)" : "translate(0, 2)"} 
                       style={{ transition: "transform 1s ease-in-out" }} />
              
              {/* Штанга сбоку */}
              <rect x="15" y={isAnimating ? "25" : "35"} width="40" height="3" fill="#2d3436" rx="1"
                    style={{ transition: "y 1s ease-in-out" }} />
              <circle cx="17" cy={isAnimating ? "26.5" : "36.5"} r="2.5" fill="#636e72" 
                      style={{ transition: "cy 1s ease-in-out" }} />
              <circle cx="53" cy={isAnimating ? "26.5" : "36.5"} r="2.5" fill="#636e72" 
                      style={{ transition: "cy 1s ease-in-out" }} />
              
              {/* Ноги сбоку */}
              <ellipse cx="25" cy="68" rx="3" ry="6" fill="#4a90e2" opacity="0.8"/>
              <ellipse cx="40" cy="68" rx="3" ry="6" fill="#4a90e2" opacity="0.8"/>
            </g>
            
            {/* ПРАВАЯ СТОРОНА - ВИД СВЕРХУ */}
            <g>
              <text x="120" y="15" textAnchor="middle" fontSize="7" fill="#666" fontWeight="bold">ВИД СВЕРХУ</text>
              
              {/* Скамья сверху */}
              <rect x="95" y="45" width="50" height="20" fill="#8b4513" rx="3" opacity="0.8"/>
              
              {/* Голова сверху */}
              <circle cx="120" cy="30" r="5" fill="#f4c2a1" stroke="#e17055" strokeWidth="0.5"/>
              
              {/* Плечи и торс сверху */}
              <ellipse cx="120" cy="45" rx="15" ry="8" fill="#4a90e2" opacity="0.7"/>
              
              {/* Большая грудная мышца сверху (веерообразная) */}
              <path d="M 110 42 Q 120 38 130 42 Q 125 48 120 50 Q 115 48 110 42 Z" 
                    fill="url(#chestMajorGradient)" 
                    filter={isAnimating ? "url(#chestGlow)" : "none"}
                    transform={isAnimating ? "scale(1.15)" : "scale(1)"} 
                    style={{ transition: "transform 1s ease-in-out", transformOrigin: "120px 45px" }} />
              
              {/* Малая грудная мышца сверху */}
              <ellipse cx="120" cy="40" rx="6" ry="3" fill="#c0392b" opacity="0.7"
                       filter={isAnimating ? "url(#chestGlow)" : "none"}
                       transform={isAnimating ? "scale(1.1)" : "scale(1)"} 
                       style={{ transition: "transform 1s ease-in-out", transformOrigin: "120px 40px" }} />
              
              {/* Передние дельты сверху */}
              <ellipse cx="105" cy="40" rx="4" ry="6" fill="url(#deltoidGradient)" 
                       filter={isAnimating ? "url(#chestGlow)" : "none"}
                       transform={isAnimating ? "scale(1.08)" : "scale(1)"} 
                       style={{ transition: "transform 1s ease-in-out", transformOrigin: "105px 40px" }} />
              <ellipse cx="135" cy="40" rx="4" ry="6" fill="url(#deltoidGradient)" 
                       filter={isAnimating ? "url(#chestGlow)" : "none"}
                       transform={isAnimating ? "scale(1.08)" : "scale(1)"} 
                       style={{ transition: "transform 1s ease-in-out", transformOrigin: "135px 40px" }} />
              
              {/* Руки сверху */}
              <ellipse cx="100" cy="50" rx="3" ry="12" fill="url(#tricepsGradient)" 
                       filter={isAnimating ? "url(#chestGlow)" : "none"}
                       transform={isAnimating ? "translate(0, -2)" : "translate(0, 1)"} 
                       style={{ transition: "transform 1s ease-in-out" }} />
              <ellipse cx="140" cy="50" rx="3" ry="12" fill="url(#tricepsGradient)" 
                       filter={isAnimating ? "url(#chestGlow)" : "none"}
                       transform={isAnimating ? "translate(0, -2)" : "translate(0, 1)"} 
                       style={{ transition: "transform 1s ease-in-out" }} />
              
              {/* Штанга сверху */}
              <rect x="85" y={isAnimating ? "28" : "35"} width="70" height="4" fill="#2d3436" rx="2"
                    style={{ transition: "y 1s ease-in-out" }} />
              <circle cx="87" cy={isAnimating ? "30" : "37"} r="3" fill="#636e72" 
                      style={{ transition: "cy 1s ease-in-out" }} />
              <circle cx="153" cy={isAnimating ? "30" : "37"} r="3" fill="#636e72" 
                      style={{ transition: "cy 1s ease-in-out" }} />
              
              {/* Ноги сверху */}
              <ellipse cx="110" cy="68" rx="3" ry="8" fill="#4a90e2" opacity="0.8"/>
              <ellipse cx="130" cy="68" rx="3" ry="8" fill="#4a90e2" opacity="0.8"/>
              
              {/* Траектория движения штанги */}
              {isAnimating ? (
                <path d="M 120 32 L 120 25 M 115 28 L 120 25 L 125 28" stroke="#00b894" strokeWidth="2" fill="none" opacity="0.9"/>
              ) : (
                <path d="M 120 25 L 120 32 M 115 29 L 120 32 L 125 29" stroke="#e17055" strokeWidth="2" fill="none" opacity="0.9"/>
              )}
            </g>
            
            {/* Стрелки движения для сбоку */}
            {isAnimating ? (
              <g>
                <path d="M 25 30 L 25 20 M 20 25 L 25 20 L 30 25" stroke="#00b894" strokeWidth="2" fill="none" opacity="0.8"/>
                <path d="M 45 30 L 45 20 M 40 25 L 45 20 L 50 25" stroke="#00b894" strokeWidth="2" fill="none" opacity="0.8"/>
              </g>
            ) : (
              <g>
                <path d="M 25 20 L 25 30 M 20 25 L 25 30 L 30 25" stroke="#e17055" strokeWidth="2" fill="none" opacity="0.8"/>
                <path d="M 45 20 L 45 30 M 40 25 L 45 30 L 50 25" stroke="#e17055" strokeWidth="2" fill="none" opacity="0.8"/>
              </g>
            )}
            
            <text x="80" y="115" textAnchor="middle" fontSize="8" fill="#2d3436" fontWeight="bold">Жим лежа - Двойной ракурс</text>
            
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

      case 'жим в тренажёре сидя':
        return (
          <svg viewBox="0 0 120 120" className={className}>
            <defs>
              <linearGradient id="machineMetalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5d6d7e" />
                <stop offset="100%" stopColor="#34495e" />
              </linearGradient>
              <linearGradient id="seatRedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e74c3c" />
                <stop offset="100%" stopColor="#c0392b" />
              </linearGradient>
              <linearGradient id="activeChestGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="100%" stopColor="#ee5a52" />
              </linearGradient>
              <filter id="muscleGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* ТРЕНАЖЁР */}
            <g>
              {/* Основание тренажёра */}
              <ellipse cx="60" cy="95" rx="25" ry="6" fill="#2c3e50" opacity="0.7"/>
              
              {/* Главная рама тренажёра */}
              <rect x="20" y="55" width="6" height="40" fill="url(#machineMetalGradient)" rx="2"/>
              <rect x="94" y="55" width="6" height="40" fill="url(#machineMetalGradient)" rx="2"/>
              
              {/* Спинка */}
              <rect x="16" y="45" width="14" height="30" fill="url(#seatRedGradient)" rx="3"/>
              <rect x="18" y="47" width="10" height="26" fill="#c0392b" rx="2" opacity="0.8"/>
              
              {/* Сиденье */}
              <ellipse cx="35" cy="70" rx="10" ry="5" fill="url(#seatRedGradient)"/>
              <ellipse cx="35" cy="69" rx="8" ry="3" fill="#e74c3c" opacity="0.8"/>
              
              {/* Механизм */}
              <rect x="60" y="35" width="20" height="12" fill="url(#machineMetalGradient)" rx="2"/>
              <circle cx="70" cy="41" r="6" fill="#34495e" stroke="#2c3e50" strokeWidth="1"/>
              <circle cx="70" cy="41" r="3" fill="#95a5a6"/>
              
              {/* Весовой блок */}
              <rect x="85" y="50" width="12" height="20" fill="url(#machineMetalGradient)" rx="1"/>
              <rect x="86" y="52" width="10" height="2" fill="#7f8c8d"/>
              <rect x="86" y="55" width="10" height="2" fill="#7f8c8d"/>
              <rect x="86" y="58" width="10" height="2" fill="#e74c3c"/>
              <rect x="86" y="61" width="10" height="2" fill="#7f8c8d"/>
              
              {/* Рукоятки */}
              <ellipse cx={isAnimating ? "55" : "50"} cy="50" rx="6" ry="2" fill="#95a5a6" 
                       style={{ transition: "cx 1s ease-in-out" }}/>
              <ellipse cx={isAnimating ? "55" : "50"} cy="54" rx="6" ry="2" fill="#95a5a6" 
                       style={{ transition: "cx 1s ease-in-out" }}/>
              
              {/* Тросы */}
              <path d={isAnimating ? "M 61 52 Q 75 35 85 55" : "M 56 52 Q 75 35 85 55"} 
                    stroke="#34495e" strokeWidth="1.5" fill="none"
                    style={{ transition: "d 1s ease-in-out" }}/>
            </g>
            
            {/* ЧЕЛОВЕК */}
            <g>
              {/* Голова */}
              <circle cx="35" cy="35" r="4" fill="#f4c2a1" stroke="#d35400" strokeWidth="0.5"/>
              <circle cx="33" cy="33" r="0.5" fill="#2c3e50"/>
              <circle cx="37" cy="33" r="0.5" fill="#2c3e50"/>
              <path d="M 33 37 Q 35 38 37 37" stroke="#d35400" strokeWidth="0.5" fill="none"/>
              
              {/* Торс */}
              <ellipse cx="35" cy="50" rx="6" ry="10" fill="#3498db" opacity="0.8"/>
              
              {/* Грудные мышцы */}
              <ellipse cx="40" cy="47" rx="4" ry="6" fill="url(#activeChestGradient)" 
                       filter={isAnimating ? "url(#muscleGlow)" : "none"}
                       transform={isAnimating ? "scale(1.1)" : "scale(1)"} 
                       style={{ transition: "transform 1s ease-in-out", transformOrigin: "40px 47px" }}/>
              
              {/* Плечи */}
              <circle cx="29" cy="45" r="3" fill="#fdcb6e" 
                      filter={isAnimating ? "url(#muscleGlow)" : "none"}
                      transform={isAnimating ? "scale(1.05)" : "scale(1)"} 
                      style={{ transition: "transform 1s ease-in-out", transformOrigin: "29px 45px" }}/>
              <circle cx="47" cy="45" r="3" fill="#fdcb6e" 
                      filter={isAnimating ? "url(#muscleGlow)" : "none"}
                      transform={isAnimating ? "scale(1.05)" : "scale(1)"} 
                      style={{ transition: "transform 1s ease-in-out", transformOrigin: "47px 45px" }}/>
              
              {/* Руки */}
              <ellipse cx="44" cy="52" rx="2" ry="6" fill="#3498db" 
                       transform={isAnimating ? "translate(5, 0)" : "translate(0, 0)"} 
                       style={{ transition: "transform 1s ease-in-out" }}/>
              <ellipse cx="26" cy="52" rx="2" ry="6" fill="#3498db" 
                       transform={isAnimating ? "translate(5, 0)" : "translate(0, 0)"} 
                       style={{ transition: "transform 1s ease-in-out" }}/>
              
              {/* Предплечья */}
              <ellipse cx="48" cy="60" rx="1.5" ry="5" fill="#3498db" 
                       transform={isAnimating ? "translate(4, 0)" : "translate(0, 0)"} 
                       style={{ transition: "transform 1s ease-in-out" }}/>
              <ellipse cx="22" cy="60" rx="1.5" ry="5" fill="#3498db" 
                       transform={isAnimating ? "translate(4, 0)" : "translate(0, 0)"} 
                       style={{ transition: "transform 1s ease-in-out" }}/>
              
              {/* Ноги */}
              <ellipse cx="30" cy="72" rx="3" ry="8" fill="#3498db"/>
              <ellipse cx="40" cy="72" rx="3" ry="8" fill="#3498db"/>
              
              {/* Стопы */}
              <ellipse cx="30" cy="82" rx="2" ry="3" fill="#2c3e50"/>
              <ellipse cx="40" cy="82" rx="2" ry="3" fill="#2c3e50"/>
            </g>
            
            {/* Стрелки движения */}
            {isAnimating ? (
              <g>
                <path d="M 52 45 L 65 40 M 60 37 L 65 40 L 60 43" stroke="#00b894" strokeWidth="2" fill="none"/>
                <text x="67" y="43" fontSize="5" fill="#00b894" fontWeight="bold">ЖИМ</text>
              </g>
            ) : (
              <g>
                <path d="M 65 40 L 52 45 M 57 42 L 52 45 L 57 48" stroke="#e17055" strokeWidth="2" fill="none"/>
                <text x="42" y="43" fontSize="5" fill="#e17055" fontWeight="bold">КОНТРОЛЬ</text>
              </g>
            )}
            
            <text x="60" y="115" textAnchor="middle" fontSize="8" fill="#2d3436" fontWeight="bold">Жим в тренажёре сидя</text>
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