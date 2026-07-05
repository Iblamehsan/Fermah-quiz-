import React, { useState, useEffect, CSSProperties, useRef } from "react";
import { 
  ArrowRight, 
  RotateCcw, 
  Check, 
  X, 
  Award, 
  TrendingUp, 
  Zap, 
  Layers, 
  Cpu,
  ChevronDown,
  ChevronUp,
  Share2,
  Sliders,
  Download
} from "lucide-react";
import { questions, Question } from "./questions";

// Decorative High-Tech Cyber Corner brackets
function CyberCorners({ color = "fermah-cyan", size = "w-3 h-3", borderSize = "border-t-2 border-l-2" }) {
  const borderStyles = borderSize.split(" ");
  const borderType1 = borderStyles[0]; // e.g. border-t-2
  const borderType2 = borderStyles[1]; // e.g. border-l-2
  
  return (
    <>
      <div className={`absolute top-0 left-0 ${size} border-t-2 border-l-2 border-${color}/40 rounded-tl-xl pointer-events-none z-20`} />
      <div className={`absolute top-0 right-0 ${size} border-t-2 border-r-2 border-${color}/40 rounded-tr-xl pointer-events-none z-20`} />
      <div className={`absolute bottom-0 left-0 ${size} border-b-2 border-l-2 border-${color}/40 rounded-bl-xl pointer-events-none z-20`} />
      <div className={`absolute bottom-0 right-0 ${size} border-b-2 border-r-2 border-${color}/40 rounded-br-xl pointer-events-none z-20`} />
    </>
  );
}

// Canvas Particle Confetti for luxury score celebrations
function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    const colors = ["#00ffcc", "#cc33ff", "#ffb703", "#ff0055", "#ffffff"];
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
    }> = [];

    // Create 120 colorful glowing particles
    for (let i = 0; i < 140; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * -height - 20,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * 3 + 2.5,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1,
        opacity: Math.random() * 0.5 + 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size, 0);
        ctx.lineTo(0, p.size);
        ctx.lineTo(-p.size, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-50"
    />
  );
}

interface HoverParticleWrapperProps {
  children: React.ReactNode;
  active: boolean;
  color?: string;
  key?: React.Key;
}

function HoverParticleWrapper({ children, active, color = "#a06bff" }: HoverParticleWrapperProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const requestRef = useRef<number | null>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    decay: number;
  }>>([]);

  useEffect(() => {
    if (!active) {
      particlesRef.current = [];
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Add gentle lingering particles if hovered
      if (isHovered && Math.random() < 0.35 && particlesRef.current.length < 20) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.3,
          size: Math.random() * 2 + 1,
          alpha: 0.9,
          decay: Math.random() * 0.02 + 0.015
        });
      }

      // Update & draw particles
      particlesRef.current.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(index, 1);
          return;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [isHovered, active, color]);

  const handleMouseEnter = () => {
    if (!active) return;
    setIsHovered(true);
    
    const canvas = canvasRef.current;
    if (canvas) {
      const w = canvas.width;
      const h = canvas.height;
      // Burst effect from all corners/sides
      for (let i = 0; i < 18; i++) {
        particlesRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 2.8,
          vy: (Math.random() - 0.5) * 2.8,
          size: Math.random() * 2.5 + 1.2,
          alpha: 1.0,
          decay: Math.random() * 0.03 + 0.018
        });
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full"
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20 rounded-[14px]"
      />
      {children}
    </div>
  );
}

// Global badge resolver for luxury user score results
function getBadgeInfo(scoreValue: number, totalQuestions: number) {
  const pct = totalQuestions > 0 ? (scoreValue / totalQuestions) * 100 : 0;
  if (pct === 100) {
    return {
      name: "ZK-MAX PROVER",
      level: "LEVEL 04 · GRANDMASTER CERTIFIED",
      grad: "from-[#ffe53b] via-[#ffaa00] to-[#ff2525]",
      glow: "shadow-[0_0_25px_rgba(255,229,59,0.3)] border-amber-400/40",
      textColor: "text-amber-300",
      badgeBg: "bg-amber-950/20"
    };
  } else if (pct >= 80) {
    return {
      name: "ELITE PROVER",
      level: "LEVEL 03 · SPECIALIST CERTIFIED",
      grad: "from-[#cc33ff] via-[#e040ff] to-[#ff0055]",
      glow: "shadow-[0_0_25px_rgba(204,51,255,0.3)] border-fuchsia-500/40",
      textColor: "text-fuchsia-300",
      badgeBg: "bg-fuchsia-950/20"
    };
  } else if (pct >= 50) {
    return {
      name: "VERIFIED OPERATOR",
      level: "LEVEL 02 · CORE CERTIFIED",
      grad: "from-[#00ffcc] to-[#0088cc]",
      glow: "shadow-[0_0_25px_rgba(0,255,204,0.3)] border-fermah-cyan/40",
      textColor: "text-fermah-cyan",
      badgeBg: "bg-teal-950/20"
    };
  } else {
    return {
      name: "INITIATE PROVER",
      level: "LEVEL 01 · CANDIDATE",
      grad: "from-[#64748b] to-[#475569]",
      glow: "shadow-[0_0_15px_rgba(100,116,139,0.15)] border-slate-500/30",
      textColor: "text-gray-400",
      badgeBg: "bg-slate-900/40"
    };
  }
}

export default function App() {
  // Screen views: 'welcome' | 'quiz' | 'results'
  const [view, setView] = useState<"welcome" | "quiz" | "results">(() => {
    const saved = sessionStorage.getItem("fermah_quiz_view");
    return (saved as "welcome" | "quiz" | "results") || "welcome";
  });
  
  // Game states
  const [difficulty, setDifficulty] = useState<"lite" | "standard" | "master">(() => {
    const saved = sessionStorage.getItem("fermah_quiz_difficulty");
    return (saved as "lite" | "standard" | "master") || "standard";
  });
  
  const quizQuestions = React.useMemo(() => {
    if (difficulty === "lite") {
      return questions.slice(0, 5);
    } else if (difficulty === "standard") {
      return questions.slice(0, 10);
    } else {
      return questions;
    }
  }, [difficulty]);

  const [currentIdx, setCurrentIdx] = useState<number>(() => {
    const saved = sessionStorage.getItem("fermah_quiz_current_idx");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(() => {
    const saved = sessionStorage.getItem("fermah_quiz_selected_option");
    return saved ? parseInt(saved, 10) : null;
  });
  const [isAnswered, setIsAnswered] = useState<boolean>(() => {
    const saved = sessionStorage.getItem("fermah_quiz_is_answered");
    return saved === "true";
  });
  const [score, setScore] = useState<number>(() => {
    const saved = sessionStorage.getItem("fermah_quiz_score");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  
  // Hint states
  const [hintsRemaining, setHintsRemaining] = useState<number>(() => {
    const saved = sessionStorage.getItem("fermah_quiz_hints_remaining");
    return saved ? parseInt(saved, 10) : 3;
  });
  const [vanishedOptions, setVanishedOptions] = useState<number[]>(() => {
    const saved = sessionStorage.getItem("fermah_quiz_vanished_options");
    return saved ? JSON.parse(saved) : [];
  });
  
  // Store user answers for the final breakdown
  const [userAnswers, setUserAnswers] = useState<Array<{
    questionIndex: number;
    selectedIndex: number;
    isCorrect: boolean;
  }>>(() => {
    const saved = sessionStorage.getItem("fermah_quiz_user_answers");
    return saved ? JSON.parse(saved) : [];
  });

  // Track completed quizzes in localStorage to enforce "each quiz exactly once" rule
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, {
    difficulty: string;
    score: number;
    total: number;
    answers: Array<{
      questionIndex: number;
      selectedIndex: number;
      isCorrect: boolean;
    }>;
    timestamp: string;
  }>>(() => {
    const saved = localStorage.getItem("fermah_completed_quizzes");
    return saved ? JSON.parse(saved) : {};
  });

  // Keep state synchronized with sessionStorage
  useEffect(() => {
    sessionStorage.setItem("fermah_quiz_view", view);
  }, [view]);

  useEffect(() => {
    sessionStorage.setItem("fermah_quiz_difficulty", difficulty);
  }, [difficulty]);

  useEffect(() => {
    sessionStorage.setItem("fermah_quiz_current_idx", String(currentIdx));
  }, [currentIdx]);

  useEffect(() => {
    if (selectedOption !== null) {
      sessionStorage.setItem("fermah_quiz_selected_option", String(selectedOption));
    } else {
      sessionStorage.removeItem("fermah_quiz_selected_option");
    }
  }, [selectedOption]);

  useEffect(() => {
    sessionStorage.setItem("fermah_quiz_is_answered", String(isAnswered));
  }, [isAnswered]);

  useEffect(() => {
    sessionStorage.setItem("fermah_quiz_score", String(score));
  }, [score]);

  useEffect(() => {
    sessionStorage.setItem("fermah_quiz_user_answers", JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    sessionStorage.setItem("fermah_quiz_hints_remaining", String(hintsRemaining));
  }, [hintsRemaining]);

  useEffect(() => {
    sessionStorage.setItem("fermah_quiz_vanished_options", JSON.stringify(vanishedOptions));
  }, [vanishedOptions]);

  // Results screen animation helpers
  const [svgOffset, setSvgOffset] = useState<number>(439.82); // Radius 70 circumference
  const [expandedBreakdownIndex, setExpandedBreakdownIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Detect and respect prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Handle result SVG ring animation
  useEffect(() => {
    if (view === "results") {
      const circumference = 2 * Math.PI * 70; // 439.8229
      if (reducedMotion) {
        setSvgOffset(circumference - (score / quizQuestions.length) * circumference);
      } else {
        // Trigger a smooth delay so users see the ring draw itself
        setSvgOffset(circumference);
        const timer = setTimeout(() => {
          setSvgOffset(circumference - (score / quizQuestions.length) * circumference);
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [view, score, reducedMotion, quizQuestions]);

  // 3-second auto-advance countdown timer
  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) {
      setCountdown(null);
      handleNext();
      return;
    }
    const timer = setTimeout(() => {
      setCountdown(prev => (prev !== null ? prev - 1 : null));
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Restart AudioContext on welcome click
  const handleStartQuiz = () => {
    sessionStorage.setItem("fermah_quiz_view", "quiz");
    sessionStorage.setItem("fermah_quiz_current_idx", "0");
    sessionStorage.setItem("fermah_quiz_selected_option", "");
    sessionStorage.setItem("fermah_quiz_is_answered", "false");
    sessionStorage.setItem("fermah_quiz_score", "0");
    sessionStorage.setItem("fermah_quiz_user_answers", "[]");
    sessionStorage.setItem("fermah_quiz_hints_remaining", "3");
    sessionStorage.setItem("fermah_quiz_vanished_options", "[]");

    setView("quiz");
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setUserAnswers([]);
    setCountdown(null);
    setHintsRemaining(3);
    setVanishedOptions([]);
  };

  // Handle user selecting an option
  const handleSelectOption = (optionIdx: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIdx);
    setIsAnswered(true);
    
    const isCorrect = optionIdx === quizQuestions[currentIdx].correctIndex;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Save answer
    setUserAnswers(prev => [
      ...prev,
      {
        questionIndex: currentIdx,
        selectedIndex: optionIdx,
        isCorrect
      }
    ]);

    // Start 3 second countdown for next question
    setCountdown(3);
  };

  // Handle moving to the next question or completing the quiz
  const handleNext = () => {
    if (isTransitioning) return;
    setCountdown(null); // Clear countdown if they hit next manually
    
    if (currentIdx < quizQuestions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIdx(prev => {
          if (prev < quizQuestions.length - 1) {
            return prev + 1;
          }
          return prev;
        });
        setSelectedOption(null);
        setIsAnswered(false);
        setIsTransitioning(false);
        setVanishedOptions([]);
        sessionStorage.setItem("fermah_quiz_vanished_options", "[]");
      }, 120);
    } else {
      // Save attempt to localStorage
      const attempt = {
        difficulty,
        score,
        total: quizQuestions.length,
        answers: userAnswers,
        timestamp: new Date().toLocaleDateString()
      };
      const updated = {
        ...completedQuizzes,
        [difficulty]: attempt
      };
      setCompletedQuizzes(updated);
      localStorage.setItem("fermah_completed_quizzes", JSON.stringify(updated));

      setView("results");
    }
  };

  const handleReturnHome = () => {
    sessionStorage.removeItem("fermah_quiz_current_idx");
    sessionStorage.removeItem("fermah_quiz_selected_option");
    sessionStorage.removeItem("fermah_quiz_is_answered");
    sessionStorage.removeItem("fermah_quiz_score");
    sessionStorage.removeItem("fermah_quiz_user_answers");
    sessionStorage.removeItem("fermah_quiz_vanished_options");

    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setUserAnswers([]);
    setExpandedBreakdownIndex(null);
    setCountdown(null);
    setView("welcome");
    setHintsRemaining(3);
    setVanishedOptions([]);
  };

  const handleQuit = () => {
    sessionStorage.setItem("fermah_quiz_view", "welcome");
    sessionStorage.setItem("fermah_quiz_current_idx", "0");
    sessionStorage.setItem("fermah_quiz_selected_option", "");
    sessionStorage.setItem("fermah_quiz_is_answered", "false");
    sessionStorage.setItem("fermah_quiz_score", "0");
    sessionStorage.setItem("fermah_quiz_user_answers", "[]");
    sessionStorage.setItem("fermah_quiz_hints_remaining", "3");
    sessionStorage.setItem("fermah_quiz_vanished_options", "[]");

    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setUserAnswers([]);
    setExpandedBreakdownIndex(null);
    setCountdown(null);
    setView("welcome");
    setHintsRemaining(3);
    setVanishedOptions([]);
  };

  const handleUseHint = () => {
    if (hintsRemaining <= 0 || isAnswered || isTransitioning) return;

    const currentQuestion = quizQuestions[currentIdx];
    const wrongOptionsIndices = currentQuestion.options
      .map((_, idx) => idx)
      .filter(idx => idx !== currentQuestion.correctIndex && !vanishedOptions.includes(idx));

    if (wrongOptionsIndices.length > 0) {
      const randomWrongIdx = wrongOptionsIndices[Math.floor(Math.random() * wrongOptionsIndices.length)];
      setVanishedOptions(prev => [...prev, randomWrongIdx]);
      setHintsRemaining(prev => prev - 1);
    }
  };

  const handleShare = () => {
    const currentRank = getRankInfo(score, quizQuestions.length);
    const tweetText = `I just verified my decentralized ZK-proof hardware metrics on @Fermah_!\n\nScore: ${score}/${quizQuestions.length} (${Math.round((score/quizQuestions.length)*100)}% accuracy)\nRank: "${currentRank.title}" (${difficulty.toUpperCase()} Mode)\n\nTest your knowledge & join the decentralized prover network: ${window.location.origin}\n\n#Fermah #ZKProof #ZeroKnowledge`;

    // Copy to clipboard as backup courtesy
    try {
      navigator.clipboard.writeText(tweetText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.warn("Clipboard copy fallback failed", e);
    }

    // Direct redirection exactly to X (Twitter) compose intent
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, "_blank");
  };

  // Get Rank Info based on score percentage
  const getRankInfo = (scoreValue: number, totalQuestions: number) => {
    const pct = totalQuestions > 0 ? (scoreValue / totalQuestions) * 100 : 0;
    if (pct === 100) {
      return {
        title: "Proof Master",
        desc: "Flawless mathematical precision. You are ready to run a Fermah kernel node.",
        color: "text-fermah-cyan bg-fermah-cyan/10 border-fermah-cyan/30"
      };
    } else if (pct >= 80) {
      return {
        title: "Prover Pro",
        desc: "Incredible depth of ZK knowledge. Exceptional execution and understanding.",
        color: "text-fermah-violet bg-fermah-violet/10 border-fermah-violet/30"
      };
    } else if (pct >= 50) {
      return {
        title: "Protocol Analyst",
        desc: "Solid foundational knowledge. Ready to analyze the decentralized ZK proof network.",
        color: "text-fermah-amber bg-fermah-amber/10 border-fermah-amber/30"
      };
    } else {
      return {
        title: "Hardware Operator",
        desc: "Good initial start. Fine-tune your operator profiles and try again!",
        color: "text-fermah-red bg-fermah-red/10 border-fermah-red/30"
      };
    }
  };

  const activeQuestion: Question = quizQuestions[currentIdx] || quizQuestions[0];
  const rank = getRankInfo(score, quizQuestions.length);
  const ringCircumference = 2 * Math.PI * 70;

  const downloadScoreCardImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 675;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background gradient: dark mysterious outer space
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 675);
    bgGrad.addColorStop(0, "#030407");
    bgGrad.addColorStop(1, "#0d0f18");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 675);

    // Subtle Grid lines (cyberpunk tech look)
    ctx.strokeStyle = "rgba(77, 255, 240, 0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x < 1200; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 675);
      ctx.stroke();
    }
    for (let y = 0; y < 675; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1200, y);
      ctx.stroke();
    }

    // Glowing outer border
    ctx.strokeStyle = "rgba(160, 107, 255, 0.25)";
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 1140, 615);

    ctx.strokeStyle = "#4dfff0";
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, 1120, 595);

    // Glowing corner markings
    const drawCorner = (x: number, y: number, xSign: number, ySign: number) => {
      ctx.strokeStyle = "#4dfff0";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, y + ySign * 30);
      ctx.lineTo(x, y);
      ctx.lineTo(x + xSign * 30, y);
      ctx.stroke();
    };
    drawCorner(40, 40, 1, 1);
    drawCorner(1160, 40, -1, 1);
    drawCorner(40, 635, 1, -1);
    drawCorner(1160, 635, -1, -1);

    // Tech header details
    ctx.fillStyle = "rgba(77, 255, 240, 0.7)";
    ctx.font = "bold 14px monospace";
    ctx.fillText("FERMAH DECENTRALIZED CO-PROCESSOR NETWORK // SYSTEM PROVER STATUS", 70, 80);

    ctx.fillStyle = "rgba(160, 107, 255, 0.6)";
    ctx.fillText("HARDWARE VERIFICATION DECRYPTOR: v2.4.0-RELEASE", 70, 105);

    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.font = "bold 10px monospace";
    ctx.fillText("KRN_SEED_HASH: 0x9f1a2e3d4c5b6a7f8e9d0c1b2a3f4e5d", 70, 130);

    // Decorative system state elements
    ctx.fillStyle = "rgba(77, 255, 240, 0.1)";
    ctx.fillRect(70, 150, 400, 4);
    ctx.fillStyle = "#4dfff0";
    ctx.fillRect(70, 150, 280, 4);

    // Big Score Section
    const centerX = 300;
    const centerY = 390;
    const radius = 130;

    // Draw background gauge ring
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw active score gauge segment (gradient)
    const activeGrad = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
    activeGrad.addColorStop(0, "#4dfff0");
    activeGrad.addColorStop(1, "#a06bff");
    ctx.strokeStyle = activeGrad;
    ctx.lineWidth = 18;
    ctx.lineCap = "round";
    ctx.beginPath();
    const percentage = quizQuestions.length > 0 ? score / quizQuestions.length : 0;
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + percentage * 2 * Math.PI;
    ctx.arc(centerX, centerY, radius, startAngle, endAngle === startAngle ? 2 * Math.PI : endAngle);
    ctx.stroke();

    // Draw text inside gauge
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 80px monospace";
    ctx.fillText(score.toString(), centerX, centerY + 15);

    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "bold 24px monospace";
    ctx.fillText(`/ ${quizQuestions.length}`, centerX, centerY + 55);

    ctx.fillStyle = "#4dfff0";
    ctx.font = "bold 14px monospace";
    ctx.fillText(`${Math.round(percentage * 100)}% ACCURACY`, centerX, centerY - 65);

    // Right Side: Rank and Metadata
    ctx.textAlign = "left";
    
    // VERIFIED STATUS title
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "bold 13px monospace";
    ctx.fillText("VERIFIED COMPUTATION PROFILE", 560, 240);

    // Glowing rank title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 52px sans-serif";
    ctx.fillText(rank.title.toUpperCase(), 560, 305);

    // Draw high tech status tag
    ctx.fillStyle = "rgba(160, 107, 255, 0.15)";
    ctx.fillRect(560, 325, 450, 40);
    ctx.strokeStyle = "rgba(160, 107, 255, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(560, 325, 450, 40);

    ctx.fillStyle = "#a06bff";
    ctx.font = "bold 13px monospace";
    ctx.fillText(`MODE: ${difficulty.toUpperCase()} COMPUTATION`, 580, 350);

    // Sub-text explanation
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "15px sans-serif";
    const words = `Verified performance metric completed successfully. Prover operates at the peak execution profile of decentralized Zero-Knowledge computing. Fully compatible with Fermah node specifications.`.split(" ");
    let line = "";
    const maxWidth = 500;
    const lineHeight = 28;
    let textY = 405;

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, 560, textY);
        line = words[n] + " ";
        textY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 560, textY);

    // System stamps at bottom
    ctx.fillStyle = "rgba(77, 255, 240, 0.2)";
    ctx.font = "bold 12px monospace";
    ctx.fillText("STATUS: CRYPTOGRAPHICALLY CONFIRMED", 560, 520);
    ctx.fillText(`TIMESTAMP: ${new Date().toUTCString()}`, 560, 542);

    // Bottom decorative seal
    ctx.strokeStyle = "rgba(77, 255, 240, 0.15)";
    ctx.strokeRect(1020, 480, 100, 100);
    ctx.fillStyle = "rgba(77, 255, 240, 0.05)";
    ctx.fillRect(1020, 480, 100, 100);

    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(77, 255, 240, 0.7)";
    ctx.font = "bold 10px monospace";
    ctx.fillText("ZK_PROOF", 1070, 525);
    ctx.fillText("APPROVED", 1070, 545);

    // Convert canvas to download link
    try {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `fermah-zk-prover-badge-${score}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error("Failed to generate download", e);
    }
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#020306] text-gray-100 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-fermah-cyan/30 selection:text-fermah-cyan">
      
      {/* Moving Space Stars Background */}
      <div id="bg-space-stars-1" className="absolute inset-0 space-stars-1 opacity-60 pointer-events-none z-0" />
      <div id="bg-space-stars-2" className="absolute inset-0 space-stars-2 opacity-55 pointer-events-none z-0" />
      
      {/* Dynamic Floating Gaseous Nebulae */}
      <div id="aurora-nebula-cyan" className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-fermah-cyan/12 blur-[100px] pointer-events-none z-0 animate-aurora-1" />
      <div id="aurora-nebula-violet" className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-fermah-violet/12 blur-[120px] pointer-events-none z-0 animate-aurora-2" />

      {/* Moving space galaxies in motion */}
      <div id="space-galaxy-cluster" className="absolute -top-20 -left-20 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-fermah-cyan/15 via-fermah-violet/10 to-transparent blur-[120px] pointer-events-none z-0 animate-spin-galaxy" />
      <div id="space-galaxy-secondary" className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-fermah-violet/10 via-fermah-cyan/10 to-transparent blur-[120px] pointer-events-none z-0 animate-spin-galaxy" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />

      {/* Ambient grid background */}
      <div id="bg-ambient-grid" className="absolute inset-0 ambient-grid pointer-events-none z-0" />
      
      {/* Soft radial glows */}
      <div id="glow-top-left" className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-fermah-cyan/5 blur-[120px] pointer-events-none z-0 animate-pulse-glow" style={{ animationDelay: '0s' }} />
      <div id="glow-bottom-right" className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-fermah-violet/5 blur-[120px] pointer-events-none z-0 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      {/* Top sticky/fixed utility toolbar */}
      <div id="utility-bar" className="w-full max-w-5xl mx-auto px-4 pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center z-10 relative">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-fermah-cyan animate-pulse shadow-[0_0_8px_#4dfff0]" />
          <span className="font-mono text-xs tracking-wider uppercase text-gray-400">
            Fermah · Proof Check
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#00ffcc]/10 border border-[#00ffcc]/20 px-3.5 py-1.5 rounded-full text-[11px] font-mono text-[#00ffcc] shadow-[0_0_15px_rgba(0,255,204,0.1)] relative overflow-hidden">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] animate-pulse shadow-[0_0_8px_#00ffcc]" />
            <span className="uppercase tracking-widest font-semibold">SECURE PROVER PROTOCOL ACTIVATED</span>
          </div>
        </div>
      </div>

      {/* Main Body Container */}
      <main id="main-content" className="w-full max-w-3xl mx-auto px-4 py-8 flex-grow flex flex-col justify-center z-10 relative">
        
        {/* VIEW 1: WELCOME SCREEN */}
        {view === "welcome" && (
          <div id="welcome-view" className="w-full max-w-2xl mx-auto py-10 px-6 sm:px-10 rounded-2xl bg-[#0a0c14]/75 backdrop-blur-xl border border-fermah-border/40 relative shadow-2xl shadow-black/80 animate-slide-up flex flex-col items-center">
            
            {/* Cyber Corner Accents */}
            <CyberCorners color="fermah-cyan" size="w-4 h-4" />

            {/* Elegant visual icon representing proofs & computing */}
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-fermah-cyan/20 to-fermah-violet/20 border border-fermah-border/80 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-fermah-cyan to-fermah-violet opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <Layers className="text-fermah-cyan glow-cyan w-10 h-10 animate-pulse-slow" />
              </div>
              {/* Pulsing glow dots */}
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-fermah-violet shadow-[0_0_8px_#cc33ff]" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 rounded-full bg-fermah-cyan shadow-[0_0_8px_#00ffcc]" />
            </div>

            <span className="font-mono text-xs text-fermah-cyan uppercase tracking-widest bg-fermah-cyan/10 border border-fermah-cyan/20 px-3 py-1 rounded-full mb-4">
              PROVER VERIFICATION PROTOCOL
            </span>

            <h1 className="text-4xl sm:text-5xl font-bold font-sans tracking-tight text-white mb-4">
              How well do you know{" "}
              <span className="bg-gradient-to-r from-fermah-cyan via-fermah-violet to-fermah-amber bg-clip-text text-transparent">
                Fermah?
              </span>
            </h1>

            <p className="text-gray-400 text-sm sm:text-base max-w-lg mb-8 leading-relaxed font-sans">
              Challenge your information about Fermah, the decentralized proof generation network, and test your expertise on decentralized provers, Kernels, and zero-knowledge computation!
            </p>

            {/* Difficulty selection stage */}
            <div className="w-full max-w-md mb-8 text-center">
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block mb-3">
                Select Computation Complexity
              </span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "lite", label: "Lite", count: 5, color: "hover:border-fermah-cyan/50", activeColor: "border-fermah-cyan text-fermah-cyan bg-fermah-cyan/10", cornerColor: "fermah-cyan", desc: "5 Proofs" },
                  { id: "standard", label: "Standard", count: 10, color: "hover:border-fermah-violet/50", activeColor: "border-fermah-violet text-fermah-violet bg-fermah-violet/10", cornerColor: "fermah-violet", desc: "10 Proofs" },
                  { id: "master", label: "Master", count: 15, color: "hover:border-fermah-amber/50", activeColor: "border-fermah-amber text-fermah-amber bg-fermah-amber/10", cornerColor: "fermah-amber", desc: "15 Proofs" }
                ].map((item) => {
                  const isActive = difficulty === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setDifficulty(item.id as any);
                      }}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                        isActive 
                          ? item.activeColor + " shadow-[0_0_15px_rgba(255,255,255,0.02)] scale-[1.02]" 
                          : "border-fermah-border bg-[#0d0f18]/30 text-gray-400 " + item.color
                      }`}
                    >
                      {isActive && <CyberCorners color={item.cornerColor} size="w-2 h-2" />}
                      <span className="text-xs sm:text-sm font-bold font-sans">{item.label}</span>
                      <span className="text-[10px] font-mono mt-1 opacity-80">{item.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {completedQuizzes[difficulty] ? (
              <div className="w-full flex flex-col items-center animate-slide-up">
                {/* Protocol secured notice */}
                <div className="w-full max-w-md p-5 rounded-xl border border-dashed border-fermah-cyan/40 bg-fermah-cyan/5 text-center mb-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-fermah-cyan/10 to-transparent blur-lg pointer-events-none" />
                  <CyberCorners color="fermah-cyan" size="w-3 h-3" />
                  <span className="font-mono text-xs text-fermah-cyan uppercase tracking-widest block mb-2 font-bold animate-pulse">
                    ✦ VERIFICATION RECORD SECURED ✦
                  </span>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    A secure verification session exists for <strong className="text-white uppercase">{difficulty}</strong> complexity.
                    Under protocol rules, each node is audited exactly once to guarantee ledger consistency.
                  </p>
                  
                  {(() => {
                    const savedScore = completedQuizzes[difficulty].score;
                    const savedTotal = completedQuizzes[difficulty].total;
                    const badge = getBadgeInfo(savedScore, savedTotal);
                    return (
                      <div className={`p-3 rounded-lg border border-white/10 ${badge.badgeBg} flex flex-col items-center justify-center gap-1 ${badge.glow} max-w-xs mx-auto`}>
                        <Award size={18} className={badge.textColor} />
                        <span className={`text-xs font-bold font-sans ${badge.textColor}`}>{badge.name}</span>
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">{badge.level}</span>
                        <span className="text-xs font-mono text-white mt-1">SCORE: {savedScore} / {savedTotal}</span>
                      </div>
                    );
                  })()}
                </div>

                <button
                  id="view-saved-results-btn"
                  onClick={() => {
                    const saved = completedQuizzes[difficulty];
                    setScore(saved.score);
                    setUserAnswers(saved.answers);
                    setView("results");
                  }}
                  className="group cursor-pointer font-mono px-8 py-4 rounded-xl bg-gradient-to-r from-fermah-cyan/20 to-fermah-violet/20 border border-fermah-cyan/60 hover:border-fermah-cyan text-white hover:text-fermah-cyan shadow-[0_0_20px_rgba(0,255,204,0.15)] hover:shadow-[0_0_30px_rgba(0,255,204,0.3)] transition-all duration-300 flex items-center gap-3 active:scale-[0.98] relative overflow-hidden w-full max-w-md justify-center"
                >
                  <CyberCorners color="fermah-cyan" size="w-3 h-3" />
                  <Award size={16} className="text-fermah-cyan group-hover:scale-110 transition-transform" />
                  <span>VIEW COMPLETED RESULTS</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-4">
                  ※ RETESTING CURRENT COMPLEXITY IS PROTOCOL-LOCKED
                </div>
              </div>
            ) : (
              <button
                id="start-check-btn"
                onClick={handleStartQuiz}
                className="group cursor-pointer font-mono px-8 py-4 rounded-xl bg-gradient-to-r from-fermah-cyan/20 to-fermah-violet/20 border border-fermah-cyan/60 hover:border-fermah-cyan text-white hover:text-fermah-cyan shadow-[0_0_20px_rgba(0,255,204,0.15)] hover:shadow-[0_0_30px_rgba(0,255,204,0.3)] transition-all duration-300 flex items-center gap-3 active:scale-[0.98] relative overflow-hidden"
              >
                <CyberCorners color="fermah-cyan" size="w-3 h-3" />
                <Zap id="start-btn-zap-icon" size={16} className="text-fermah-cyan group-hover:scale-110 transition-transform" />
                <span>START THE QUIZ</span>
                <ArrowRight id="start-btn-arrow-icon" size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {/* Quick mini info cards to set expectations */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-10 font-mono text-[10px] text-gray-500 text-center">
              <div className="p-3 rounded-lg border border-fermah-border/50 bg-[#0d0f18]/40 relative overflow-hidden">
                <CyberCorners color="fermah-cyan" size="w-1.5 h-1.5" />
                <span className="block text-gray-400 text-xs font-semibold mb-0.5">{quizQuestions.length}</span>
                <span>QUESTIONS</span>
              </div>
              <div className="p-3 rounded-lg border border-fermah-border/50 bg-[#0d0f18]/40 relative overflow-hidden">
                <CyberCorners color="fermah-violet" size="w-1.5 h-1.5" />
                <span className="block text-gray-400 text-xs font-semibold mb-0.5">3 SEC</span>
                <span>RESOLUTIONS</span>
              </div>
              <div className="p-3 rounded-lg border border-fermah-border/50 bg-[#0d0f18]/40 relative overflow-hidden">
                <CyberCorners color="fermah-amber" size="w-1.5 h-1.5" />
                <span className="block text-gray-400 text-xs font-semibold mb-0.5">ZK</span>
                <span>COORDINATION</span>
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: ACTIVE QUIZ */}
        {view === "quiz" && (
          <div id="quiz-view" className="animate-slide-up flex flex-col gap-6">
            
            {/* Header: Progress Section */}
            <div id="progress-header" className="flex flex-col gap-3 pb-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <span className="text-fermah-cyan">QUESTION</span>
                  <span className="text-white font-semibold">{String(currentIdx + 1).padStart(2, '0')}</span>
                  <span>/</span>
                  <span>{String(quizQuestions.length).padStart(2, '0')}</span>
                </div>
                
                {/* Score chip - styled with Amber */}
                <div className="px-3 py-1 rounded-full border border-fermah-amber/30 bg-fermah-amber/10 text-fermah-amber flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,184,77,0.05)]">
                  <Award size={13} />
                  <span>SCORE: {score}</span>
                </div>
              </div>

              {/* Progress bar (animated fill, cyan -> violet) */}
              <div className="w-full h-1.5 rounded-full bg-fermah-panel border border-fermah-border overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-fermah-cyan to-fermah-violet rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card with glowing green/cyan neon */}
            {isTransitioning ? (
              <div id="skeleton-card" className="bg-fermah-panel rounded-2xl p-6 sm:p-8 relative shadow-xl neon-green-card transition-all duration-300">
                <div className="flex justify-between items-center mb-6">
                  <div className="w-24 h-5 rounded bg-fermah-border/40 skeleton-pulse" />
                  <div className="w-32 h-3 rounded bg-fermah-border/20 skeleton-pulse" />
                </div>
                
                {/* Question title placeholder */}
                <div className="space-y-3 mb-10">
                  <div className="w-full h-6 rounded bg-fermah-border/50 skeleton-pulse" />
                  <div className="w-5/6 h-6 rounded bg-fermah-border/45 skeleton-pulse" />
                </div>

                {/* Option placeholders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="w-full h-[70px] rounded-[14px] bg-fermah-border/20 skeleton-pulse border border-fermah-border/10" />
                  <div className="w-full h-[70px] rounded-[14px] bg-fermah-border/20 skeleton-pulse border border-fermah-border/10" />
                  <div className="w-full h-[70px] rounded-[14px] bg-fermah-border/20 skeleton-pulse border border-fermah-border/10" />
                  <div className="w-full h-[70px] rounded-[14px] bg-fermah-border/20 skeleton-pulse border border-fermah-border/10" />
                </div>
              </div>
            ) : (
              <div id="question-card" key={currentIdx} className="bg-fermah-panel rounded-2xl p-6 sm:p-8 relative shadow-xl neon-green-card animate-glitch overflow-hidden">
                <CyberCorners color="fermah-cyan" size="w-4 h-4" />
                
                {/* Card visual detail tag */}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-xs uppercase text-fermah-cyan tracking-wider bg-fermah-cyan/10 border border-fermah-cyan/20 px-2.5 py-0.5 rounded">
                    {activeQuestion.tag}
                  </span>
                  <span className="font-mono text-[10px] text-gray-500">
                    VERIFIABLE COMPUTATION
                  </span>
                </div>

                {/* Question Text */}
                <h2 className="text-lg sm:text-xl font-medium font-sans text-white leading-relaxed mb-6">
                  {activeQuestion.question}
                </h2>

                {/* Related Photo context */}
                {activeQuestion.image && (
                  <div className="w-full h-40 sm:h-52 mb-6 rounded-xl overflow-hidden relative border border-fermah-border/40 group shadow-[0_0_15px_rgba(0,0,0,0.4)]">
                    <img 
                      src={activeQuestion.image} 
                      alt={activeQuestion.question}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 brightness-[0.8] contrast-[1.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f18]/95 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Futuristic indicator overlay */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 font-mono text-[9px] text-fermah-cyan bg-fermah-dark/90 px-2 py-0.5 rounded border border-fermah-cyan/20 uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-fermah-cyan animate-pulse" />
                      <span>VISUAL CONTEXT // PROVER ENGINE MESH</span>
                    </div>
                  </div>
                )}

                {/* Answer options A-D with rotating neon borders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeQuestion.options.map((option, idx) => {
                    const isVanished = vanishedOptions.includes(idx);
                    if (isVanished) {
                      return (
                        <div key={idx} className="w-full min-h-[70px] border border-dashed border-fermah-border/20 bg-fermah-panel/10 rounded-[10.5px] flex items-center justify-center p-4 text-center font-mono text-[10px] text-gray-500/80 select-none animate-pulse">
                          <span>⚡ PROOF BYPASSED BY COMPILER</span>
                        </div>
                      );
                    }

                    const letter = String.fromCharCode(65 + idx); // A, B, C, D
                    const isSelected = selectedOption === idx;
                    const isCorrectAnswer = idx === activeQuestion.correctIndex;
                    
                    // Styling states
                    let buttonClass = "w-full text-left p-4 rounded-[10.5px] font-sans text-sm sm:text-base flex items-start gap-4 transition-all duration-200 group relative cursor-pointer min-h-[70px] z-10 ";
                    let badgeClass = "w-6 h-6 rounded flex items-center justify-center text-xs font-mono border shrink-0 transition-all duration-200 ";
                    
                    let useWrapper = true;
                    let wrapperClass = "neon-rotating-wrapper transition-all duration-300 shadow-[0_0_12px_rgba(204,51,255,0.15)] hover:shadow-[0_0_20px_rgba(204,51,255,0.4)] hover:scale-[1.02] ";
                    let wrapperStyle: CSSProperties = { "--neon-color": "#cc33ff" } as CSSProperties;

                    if (!isAnswered) {
                      // Normal state before selection
                      buttonClass += "bg-[#0a0c14] text-gray-300 hover:text-white";
                      badgeClass += "bg-fermah-border/30 border-fermah-border text-gray-400 group-hover:text-fermah-cyan group-hover:border-fermah-cyan/30";
                    } else {
                      // State after selection
                      if (isCorrectAnswer) {
                        // Correct answer highlight
                        buttonClass += "bg-[#0a0c14]/90 text-white";
                        badgeClass += "bg-fermah-cyan text-fermah-dark border-fermah-cyan font-bold";
                        wrapperStyle = { "--neon-color": "#00ffcc" } as CSSProperties;
                        wrapperClass = "neon-rotating-wrapper transition-all duration-300 shadow-[0_0_25px_rgba(0,255,204,0.45)] scale-[1.01]";
                      } else if (isSelected) {
                        // Selected wrong answer highlight
                        buttonClass += "bg-[#0a0c14]/90 text-white";
                        badgeClass += "bg-fermah-red text-white border-fermah-red font-bold";
                        wrapperStyle = { "--neon-color": "#ff0055" } as CSSProperties;
                        wrapperClass = "neon-rotating-wrapper transition-all duration-300 shadow-[0_0_25px_rgba(255,0,85,0.45)] scale-[1.01]";
                      } else {
                        // Unselected non-correct answer (Dimmed, no rotating wrapper)
                        useWrapper = false;
                        buttonClass += "bg-fermah-panel border border-fermah-border/20 text-gray-600 opacity-40 pointer-events-none";
                        badgeClass += "bg-fermah-border/10 border-fermah-border/20 text-gray-600";
                      }
                    }

                    if (useWrapper) {
                      const particleColor = isAnswered 
                        ? (isCorrectAnswer ? "#00ffcc" : "#ff0055") 
                        : "#cc33ff";
                      return (
                        <HoverParticleWrapper 
                          key={idx}
                          active={!isAnswered} 
                          color={particleColor}
                        >
                          <div 
                            className={wrapperClass} 
                            style={wrapperStyle}
                          >
                            <button
                              onClick={() => handleSelectOption(idx)}
                              disabled={isAnswered}
                              className={buttonClass}
                            >
                              <CyberCorners color={isAnswered ? (isCorrectAnswer ? "fermah-cyan" : "fermah-red") : "fermah-violet"} size="w-2.5 h-2.5" />
                              <div className={badgeClass}>
                                {isAnswered && isCorrectAnswer ? (
                                  <Check size={12} strokeWidth={3} />
                                ) : isAnswered && isSelected ? (
                                  <X size={12} strokeWidth={3} />
                                ) : (
                                  letter
                                )}
                              </div>
                              <span className="flex-grow pt-0.5 leading-normal text-xs sm:text-sm z-10">{option}</span>
                            </button>
                          </div>
                        </HoverParticleWrapper>
                      );
                    } else {
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          disabled={isAnswered}
                          className={buttonClass}
                        >
                          <div className={badgeClass}>
                            {isAnswered && isCorrectAnswer ? (
                              <Check size={12} strokeWidth={3} />
                            ) : isAnswered && isSelected ? (
                              <X size={12} strokeWidth={3} />
                            ) : (
                              letter
                            )}
                          </div>
                          <span className="flex-grow pt-0.5 leading-normal text-xs sm:text-sm">{option}</span>
                        </button>
                      );
                    }
                  })}
                </div>

                {/* Hint System Action Bar */}
                {!isAnswered && (
                  <div className="flex flex-col sm:flex-row justify-between items-center border-t border-fermah-border/30 pt-4 mt-6 gap-3">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-fermah-violet animate-pulse" />
                      <span>PROVER ENGINE STATUS: RUNNING</span>
                    </div>
                    <button
                      onClick={handleUseHint}
                      disabled={hintsRemaining <= 0}
                      className={`w-full sm:w-auto font-mono text-[10px] px-3.5 py-2.5 rounded-lg border flex items-center justify-center gap-1.5 transition-all duration-300 relative cursor-pointer ${
                        hintsRemaining > 0 
                          ? "border-fermah-violet/40 bg-fermah-violet/5 text-fermah-violet hover:border-fermah-violet hover:bg-fermah-violet/15 hover:text-white"
                          : "border-fermah-border bg-fermah-panel/10 text-gray-500 cursor-not-allowed opacity-45"
                      }`}
                    >
                      <Sliders size={11} className="shrink-0" />
                      <span>USE PROVER BYPASS HINT ({hintsRemaining}/3 LEFT)</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Next Action Button with dynamic auto-resolve countdown */}
            {isAnswered && (
              <div className="flex justify-between items-center animate-slide-up w-full mt-2">
                <div className="text-xs font-mono text-gray-400 flex items-center gap-2">
                  {countdown !== null && (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-fermah-cyan animate-pulse shadow-[0_0_6px_#4dfff0]" />
                      <span>AUTO-RESOLVING PROOF IN {countdown}S...</span>
                    </>
                  )}
                </div>
                <button
                  id="next-question-btn"
                  onClick={handleNext}
                  disabled={isTransitioning}
                  className="group cursor-pointer font-mono text-sm px-6 py-3.5 rounded-xl bg-gradient-to-r from-fermah-cyan to-fermah-violet hover:from-fermah-cyan/90 hover:to-fermah-violet/90 text-fermah-dark font-semibold shadow-lg shadow-fermah-cyan/10 transition-all duration-300 flex items-center gap-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <span>{currentIdx < quizQuestions.length - 1 ? "NEXT PROOF" : "COMPUTE FINAL RESULTS"}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {/* Go Back to Start button */}
            <div className="flex justify-center mt-8 pt-4 border-t border-fermah-border/20">
              <button
                onClick={handleQuit}
                className="group font-mono text-[11px] text-gray-400 hover:text-fermah-cyan hover:underline transition-all duration-300 flex items-center gap-2 cursor-pointer bg-fermah-panel/40 border border-fermah-border/50 hover:border-fermah-cyan/40 px-4 py-2.5 rounded-xl shadow-md"
              >
                <RotateCcw size={13} className="group-hover:-rotate-45 transition-transform duration-300" />
                <span>QUIT & RETURN TO START</span>
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: RESULTS SCREEN */}
        {view === "results" && (
          <div id="results-view" className="animate-slide-up flex flex-col gap-8 py-4">
            {score >= 8 && <Confetti />}
            
            {/* Top result title block */}
            <div className="text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-fermah-cyan bg-fermah-cyan/10 border border-fermah-cyan/20 px-3 py-1 rounded-full mb-3 inline-block">
                PROOF CHECK COMPLETE
              </span>
              <h2 className="text-3xl font-bold text-white mb-1">
                Computation Results
              </h2>
              <p className="text-gray-400 text-xs font-mono uppercase">
                Hardware Proof-of-Knowledge metrics verified
              </p>
            </div>

            {/* Double Column: Left (Score Circle + Rank), Right (Rank Details Card) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Score SVG progress ring */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-[#0a0c14]/80 border border-fermah-border/40 rounded-2xl shadow-xl shadow-black/30 relative overflow-hidden animate-pop-in">
                <CyberCorners color="fermah-cyan" size="w-3.5 h-3.5" />
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    {/* Background Ring */}
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      className="text-fermah-border/40"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    {/* Front Gradient Ring */}
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="url(#ringGradient)"
                      strokeWidth="10"
                      strokeDasharray={ringCircumference}
                      strokeDashoffset={svgOffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-1000 ease-out"
                    />
                    {/* Gradients */}
                    <defs>
                      <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00ffcc" />
                        <stop offset="100%" stopColor="#cc33ff" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Inside Text */}
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-bold text-white leading-none font-mono tracking-tighter">
                      {score}
                    </span>
                    <span className="text-xs text-gray-500 font-mono mt-1">
                      / {quizQuestions.length}
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <span className="text-xs font-mono text-gray-400 block mb-0.5">ACCURACY</span>
                  <span className="text-fermah-cyan font-mono font-bold text-lg">{Math.round((score / quizQuestions.length) * 100)}%</span>
                </div>
              </div>

              {/* Rank info display with Luxury Badge */}
              <div className="md:col-span-7 flex flex-col h-full justify-between p-6 bg-[#0a0c14]/80 border border-fermah-border/40 rounded-2xl relative overflow-hidden shadow-xl shadow-black/30 animate-pop-in-delay-1">
                <CyberCorners color="fermah-violet" size="w-3.5 h-3.5" />
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-fermah-violet/10 to-transparent blur-xl pointer-events-none" />
                
                <div>
                  <span className="font-mono text-[10px] uppercase text-gray-500 block mb-1">
                    ASSIGNED RANK PROFILE
                  </span>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-1">
                    <Award className="text-fermah-amber animate-pulse" size={24} />
                    <span>{rank.title}</span>
                  </h3>

                  {/* Gorgeous visual badge shown at the end based on score */}
                  {(() => {
                    const badge = getBadgeInfo(score, quizQuestions.length);
                    return (
                      <div className={`my-4 p-4 rounded-xl border border-white/10 ${badge.badgeBg} flex items-center gap-4 ${badge.glow} relative overflow-hidden`}>
                        {/* Shimmer gradient line */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[pulse_3s_infinite]" />
                        <div className={`p-3 rounded-lg bg-gradient-to-tr ${badge.grad} text-black font-extrabold flex items-center justify-center shadow-lg shrink-0`}>
                          <Award size={20} className="text-white" />
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest">{badge.level}</span>
                          <span className={`block text-base font-extrabold font-sans ${badge.textColor} tracking-tight`}>{badge.name}</span>
                        </div>
                      </div>
                    );
                  })()}
                  
                  <div className={`p-3 rounded-lg border text-sm text-gray-300 leading-relaxed mb-6 font-sans bg-[#0d0f18]/50 border-fermah-border/55`}>
                    {rank.desc}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <button
                    id="return-home-btn"
                    onClick={handleReturnHome}
                    className="group cursor-pointer font-mono text-xs w-full py-3.5 rounded-xl bg-fermah-panel border border-fermah-border hover:border-fermah-cyan hover:text-fermah-cyan transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <RotateCcw size={14} className="group-hover:-rotate-45 transition-transform" />
                    <span>RETURN TO TERMINAL</span>
                  </button>

                  <button
                    id="share-results-btn"
                    onClick={handleShare}
                    className="group cursor-pointer font-mono text-xs w-full py-3.5 rounded-xl bg-gradient-to-r from-fermah-cyan to-fermah-violet hover:brightness-110 text-fermah-dark font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 shadow-[0_0_15px_rgba(0,255,204,0.15)]"
                  >
                    <Share2 size={14} className="group-hover:scale-110 transition-transform" />
                    <span>{copied ? "COPIED TO CLIPBOARD! ✨" : "POST RESULTS TO X 🚀"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Question Breakdown List - Review Mistakes */}
            <div id="breakdown-section" className="bg-[#0a0c14]/80 border border-fermah-border/40 rounded-2xl p-6 shadow-xl shadow-black/30 relative overflow-hidden animate-pop-in-delay-2">
              <CyberCorners color="fermah-cyan" size="w-3.5 h-3.5" />
              <h3 className="text-lg font-bold font-sans text-white mb-4 flex items-center gap-2">
                <Cpu size={18} className="text-fermah-cyan" />
                <span>Verification Diagnostics</span>
              </h3>
              
              <p className="text-gray-400 text-xs font-mono mb-6 uppercase">
                Review verified solutions and question parameters
              </p>

              <div className="flex flex-col gap-3">
                {quizQuestions.map((q, idx) => {
                  const userAnswer = userAnswers.find(ua => ua.questionIndex === idx);
                  const isCorrect = userAnswer?.isCorrect ?? false;
                  const isExpanded = expandedBreakdownIndex === idx;

                  return (
                    <div 
                      key={idx}
                      className={`border rounded-xl bg-fermah-dark/40 overflow-hidden transition-all duration-200 ${
                        isExpanded ? "border-gray-700 bg-fermah-dark/80" : "border-fermah-border hover:border-gray-800"
                      }`}
                    >
                      {/* Accordion Trigger Header */}
                      <button
                        onClick={() => setExpandedBreakdownIndex(isExpanded ? null : idx)}
                        className="w-full text-left p-4 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                      >
                        <div className="flex items-center gap-3">
                          {/* Indicator badge (Check/X) */}
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                            isCorrect ? "bg-fermah-cyan/15 text-fermah-cyan" : "bg-fermah-red/15 text-fermah-red"
                          }`}>
                            {isCorrect ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
                          </div>

                          <div>
                            <span className="font-mono text-[10px] text-gray-500 block">
                              {q.tag}
                            </span>
                            <span className="text-xs sm:text-sm font-sans font-medium text-gray-300 hover:text-white transition-colors duration-150 line-clamp-1 pr-4">
                              {q.question}
                            </span>
                          </div>
                        </div>

                        <div className="text-gray-500 shrink-0">
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </button>

                      {/* Accordion Expandable Content */}
                      {isExpanded && (
                        <div className="p-4 pt-0 border-t border-fermah-border/40 bg-fermah-panel/20 text-xs sm:text-sm space-y-3 animate-slide-up">
                          <div className="mt-3">
                            <span className="font-mono text-[10px] text-gray-500 block mb-1">QUESTION</span>
                            <p className="text-gray-200 font-sans font-medium leading-relaxed">{q.question}</p>
                          </div>

                          <div className="grid grid-cols-1 gap-2 py-1">
                            {q.options.map((opt, optIdx) => {
                              const isCorrectOption = optIdx === q.correctIndex;
                              const isSelectedOption = optIdx === userAnswer?.selectedIndex;
                              
                              let optionStyle = "p-2.5 rounded-lg border text-xs flex items-center gap-2 font-sans ";
                              if (isCorrectOption) {
                                optionStyle += "bg-fermah-cyan/10 border-fermah-cyan/40 text-fermah-cyan font-medium";
                              } else if (isSelectedOption) {
                                optionStyle += "bg-fermah-red/10 border-fermah-red/40 text-fermah-red";
                              } else {
                                optionStyle += "bg-fermah-dark/20 border-fermah-border/50 text-gray-500";
                              }

                              return (
                                <div key={optIdx} className={optionStyle}>
                                  <span className="font-mono text-[10px] bg-fermah-dark/80 px-1.5 py-0.5 rounded border border-white/5 shrink-0">
                                    {String.fromCharCode(65 + optIdx)}
                                  </span>
                                  <span className="line-clamp-2 leading-tight">{opt}</span>
                                  {isCorrectOption && <Check size={11} strokeWidth={3} className="ml-auto shrink-0" />}
                                  {isSelectedOption && !isCorrectOption && <X size={11} strokeWidth={3} className="ml-auto shrink-0" />}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer disclaimer */}
      <footer id="app-footer" className="w-full text-center py-6 mt-12 border-t border-fermah-border/40 z-10 relative">
        <span className="font-mono text-[10px] text-gray-600 tracking-wider">
          Built for the Fermah community · Not affiliated with Fermah Labs
        </span>
      </footer>
    </div>
  );
}
