import { Stacks } from "@/types/stackTypes";

export const STACKS: Stacks = {
  "JavaScript": { name: "JavaScript", img: `#javascript`, relatedPosition: ["FRONT_END", "BACK_END"] },
  "TypeScript": { name: "TypeScript", img: `#typescript`, relatedPosition: ["FRONT_END", "BACK_END"] },
  "React": { name: "React", img: `#react`, relatedPosition: ["FRONT_END"] },
  "Vue.js": { name: "Vue.js", img: `#vue`, relatedPosition: ["FRONT_END"] },
  "Angular": { name: "Angular", img: `#angular`, relatedPosition: ["FRONT_END"] },
  "React Query": { name: "React Query", img: `#react-query`, relatedPosition: ["FRONT_END"] },
  "Redux": { name: "Redux", img: `#redux`, relatedPosition: ["FRONT_END"] },
  "Next.js": { name: "Next.js", img: `#nextjs`, relatedPosition: ["FRONT_END"] },
  "Node.js": { name: "Node.js", img: `#nodejs`, relatedPosition: ["BACK_END"] },
  "Spring": { name: "Spring", img: `#spring`, relatedPosition: ["BACK_END"] },
  "Django": { name: "Django", img: `#django`, relatedPosition: ["BACK_END"] },
  "Nest.js": { name: "Nest.js", img: `#nestjs`, relatedPosition: ["BACK_END"] },
  "Express": { name: "Express", img: `#express`, relatedPosition: ["BACK_END"] },
  "Python": { name: "Python", img: `#python`, relatedPosition: ["BACK_END", "OTHERS"] }, // AI 포함
  "Java": { name: "Java", img: `#java`, relatedPosition: ["BACK_END", "MOBILE"] },
  "MySQL": { name: "MySQL", img: `#mysql`, relatedPosition: ["BACK_END"] }, // 데이터베이스
  "MongoDB": { name: "MongoDB", img: `#mongodb`, relatedPosition: ["BACK_END"] }, // 데이터베이스
  "PostgreSQL": { name: "PostgreSQL", img: `#postgresql`, relatedPosition: ["BACK_END"] }, // 데이터베이스
  "Redis": { name: "Redis", img: `#redis`, relatedPosition: ["BACK_END"] }, // 데이터베이스
  "GraphQL": { name: "GraphQL", img: `#graphql`, relatedPosition: ["BACK_END", "FRONT_END"] }, // API
  "Kotlin": { name: "Kotlin", img: `#kotlin`, relatedPosition: ["BACK_END", "MOBILE"] },
  "Swift": { name: "Swift", img: `#swift`, relatedPosition: ["MOBILE"] },
  "Flutter": { name: "Flutter", img: `#flutter`, relatedPosition: ["MOBILE"] },
  "React Native": { name: "React Native", img: `#react`, relatedPosition: ["MOBILE"] },
  "Figma": { name: "Figma", img: `#figma`, relatedPosition: ["OTHERS"] }, // 디자인
  "Adobe XD": { name: "Adobe XD", img: `#adobe-xd`, relatedPosition: ["OTHERS"] }, // 디자인
  "AWS": { name: "AWS", img: `#aws`, relatedPosition: ["OTHERS"] }, // 클라우드 서비스
  "Docker": { name: "Docker", img: `#docker`, relatedPosition: ["OTHERS"] }, // 데브옵스
  "Kubernetes": { name: "Kubernetes", img: `#kubernetes`, relatedPosition: ["OTHERS"] }, // 데브옵스
  "Git": { name: "Git", img: `#git`, relatedPosition: ["OTHERS"] }, // 버전 관리
  "Jira": { name: "Jira", img: `#jira`, relatedPosition: ["OTHERS"] }, // 프로젝트 관리
  "TensorFlow": { name: "TensorFlow", img: `#tensorflow`, relatedPosition: ["OTHERS"] }, // AI
  "PyTorch": { name: "PyTorch", img: `#pytorch`, relatedPosition: ["OTHERS"] }, // AI
} as const;

export const STACK_NAMES = Object.keys(STACKS);
