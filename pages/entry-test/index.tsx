import React, { useState } from "react";
import { Typography, Box, Button, Alert } from "@mui/material";
import SidebarContainer from "@/components/SidebarContainer";
import PlayQuiz from "../../components/entry-test/play-quiz";
import { initialQuestions } from "../../components/data/initial-questions.json";
import { QuizItem } from "../../types/quizType";
import { shuffleArray } from "../../components/utils/shuffleArray";
import Image from "next/image";

type ProficiencyLevel = {
  scoreRange: [number, number];
  level: string;
};

const proficiencyLevels: ProficiencyLevel[] = [
  { scoreRange: [10, 10], level: "C2 (Proficiency)" },
  { scoreRange: [8, 9], level: "C1 (Advanced)" },
  { scoreRange: [7, 7], level: "B2 (Upper-Intermediate)" },
  { scoreRange: [5, 6], level: "B1 (Intermediate)" },
  { scoreRange: [3, 4], level: "A2 (Pre-Intermediate)" },
  { scoreRange: [1, 2], level: "A1 (Elementary)" },
  { scoreRange: [0, 0], level: "AO (Beginner)" },
];

const OnboardingTestPage: React.FC = () => {
  const shuffledQuestions: QuizItem[] = shuffleArray(initialQuestions);

  const [proficiency, setProficiency] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleQuizFinish = (history: boolean[]) => {
    const correctAnswers = history.filter((answer) => answer).length;

    const level = proficiencyLevels.find(
      (level) =>
        correctAnswers >= level.scoreRange[0] && correctAnswers <= level.scoreRange[1]
    );

    if (level) {
      setProficiency(level.level);
      setQuizCompleted(true); 
    }
  };

  return (
    <SidebarContainer maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Onboarding Assessment
      </Typography>
      {quizCompleted ? (
        <Box sx={BoxStyle}>
          <Alert
            severity="success"
            sx={{ p: 1, m: 2, paddingY: "0px", fontSize: "19px", fontWeight: "600", width: "fit-content" }}
          >
            You have completed this assessment!
          </Alert>
          <Typography variant="h5" align="center" sx={{ marginTop: 3 }}>
            Your proficiency level is: {proficiency}
          </Typography>
          <Image alt="complete image" src="/completed-icon.svg" width={400} height={300} style={{ margin: "auto", marginTop: 20 }} />
        </Box>
      ) : (
        <PlayQuiz quiz={shuffledQuestions} onFinished={handleQuizFinish} />
      )}
    </SidebarContainer>
  );
};

export default OnboardingTestPage;

const BoxStyle = {
  background: "#bdbdbd33",
  margin: "15px 0px",
  padding: "20px",
  borderRadius: 3,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
