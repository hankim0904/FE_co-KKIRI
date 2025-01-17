import { CategoryList } from "@/types/categoryAndFilterTypes";

export interface StudyInfo {
  id: number;
  type: CategoryList;
  recruitEndAt: string;
  status: "READY" | "PROGRESS" | "PROGRESS_END" | "DONE";
  isScraped: boolean;
  progressWay: string;
  title: string;
  positions: string[];
  stacks: string[];
  memberNickname: string;
  memberProfileImg: string;
  viewCount: number;
  commentCount: number;
}

interface StudyList {
  result: {
    studyList: StudyInfo[];
  };
}

export const StudyListData: StudyList = {
  result: {
    studyList: [
      {
        id: 34,
        type: "PROJECT",
        recruitEndAt: "2025-12-01",
        status: "READY",
        isScraped: false,
        progressWay: "오프라인",
        title: "빅데이터 기반 스마트 시티 구축",
        positions: ["프론트엔드", "안드로이드", "디자이너", "개발자"],
        stacks: ["Python", "Django", "Vue.js"],
        memberNickname: "빅데이터스마트시티G안녕하세요오긴글테스트",
        memberProfileImg: "",
        viewCount: 1350,
        commentCount: 155,
      },
      {
        id: 33,
        type: "PROJECT",
        recruitEndAt: "2025-11-15",
        status: "READY",
        isScraped: true,
        progressWay: "온라인",
        title: "스마트 홈 네트워크 시스템",
        positions: ["개발자", "안드로이드", "프론트엔드", "디자이너", "백엔드", "iOS"],
        stacks: ["Node.js", "Express", "MongoDB", "HTML", "CSS", "JavaScript", "Python", "R", "SQL"],
        memberNickname: "스마트홈네트워크G",
        memberProfileImg: "",
        viewCount: 1300,
        commentCount: 150,
      },
      {
        id: 32,
        type: "PROJECT",
        recruitEndAt: "2025-10-01",
        status: "READY",
        isScraped: false,
        progressWay: "오프라인",
        title: "데이터 기반 인공지능 트레이딩 시스템",
        positions: ["백엔드"],
        stacks: [],
        memberNickname: "AI트레이딩G",
        memberProfileImg: "",
        viewCount: 1250,
        commentCount: 145,
      },
      {
        id: 31,
        type: "PROJECT",
        recruitEndAt: "2025-09-15",
        status: "READY",
        isScraped: true,
        progressWay: "온라인",
        title: "자연어 처리 기반 챗봇 시스템",
        positions: ["백엔드"],
        stacks: ["Python", "TensorFlow", "NLTK"],
        memberNickname: "챗봇G",
        memberProfileImg: "",
        viewCount: 1200,
        commentCount: 140,
      },
      {
        id: 30,
        type: "PROJECT",
        recruitEndAt: "2025-08-01",
        status: "READY",
        isScraped: false,
        progressWay: "오프라인",
        title: "얼굴 인식 기반 출석 관리 시스템",
        positions: ["백엔드"],
        stacks: ["Python", "OpenCV", "Django"],
        memberNickname: "출석G",
        memberProfileImg: "",
        viewCount: 1150,
        commentCount: 135,
      },
      {
        id: 29,
        type: "PROJECT",
        recruitEndAt: "2025-07-15",
        status: "READY",
        isScraped: true,
        progressWay: "온라인",
        title: "인공지능 기반 스피치 인식 프로젝트",
        positions: ["백엔드"],
        stacks: ["Python", "TensorFlow", "SpeechRecognition"],
        memberNickname: "스피치G",
        memberProfileImg: "",
        viewCount: 1100,
        commentCount: 130,
      },
      {
        id: 28,
        type: "PROJECT",
        recruitEndAt: "2025-06-01",
        status: "READY",
        isScraped: false,
        progressWay: "오프라인",
        title: "로봇 시각 인식 시스템 개발",
        positions: ["프론트엔드", "백엔드", "디자이너"],
        stacks: ["Python", "OpenCV", "ROS"],
        memberNickname: "로봇G",
        memberProfileImg: "",
        viewCount: 1050,
        commentCount: 125,
      },
      {
        id: 27,
        type: "PROJECT",
        recruitEndAt: "2025-05-15",
        status: "READY",
        isScraped: true,
        progressWay: "온라인",
        title: "데이터 보안 및 암호화 프로젝트",
        positions: ["백엔드"],
        stacks: ["Cryptography", "Python", "AES"],
        memberNickname: "보안G",
        memberProfileImg: "",
        viewCount: 1000,
        commentCount: 120,
      },
      {
        id: 26,
        type: "PROJECT",
        recruitEndAt: "2025-04-01",
        status: "READY",
        isScraped: false,
        progressWay: "오프라인",
        title: "스마트 팩토리 자동화 프로젝트",
        positions: ["프론트엔드", "백엔드", "디자이너"],
        stacks: ["Python", "ROS"],
        memberNickname: "팩토리G",
        memberProfileImg: "",
        viewCount: 950,
        commentCount: 115,
      },
      {
        id: 25,
        type: "PROJECT",
        recruitEndAt: "2025-03-20",
        status: "READY",
        isScraped: true,
        progressWay: "온라인",
        title: "스마트 농업 자동화 시스템 개발",
        positions: ["백엔드"],
        stacks: ["Python", "Django", "Raspberry Pi"],
        memberNickname: "농업G",
        memberProfileImg: "",
        viewCount: 900,
        commentCount: 110,
      },
      {
        id: 24,
        type: "PROJECT",
        recruitEndAt: "2025-02-15",
        status: "READY",
        isScraped: false,
        progressWay: "오프라인",
        title: "빅데이터 분석 및 시각화 프로젝트",
        positions: ["프론트엔드", "백엔드", "데브옵스"],
        stacks: ["Python", "R", "D3.js"],
        memberNickname: "빅데이터G",
        memberProfileImg: "",
        viewCount: 850,
        commentCount: 105,
      },
      {
        id: 23,
        type: "PROJECT",
        recruitEndAt: "2025-01-10",
        status: "READY",
        isScraped: true,
        progressWay: "온라인",
        title: "퀀트 트레이딩 알고리즘 개발",
        positions: ["프론트엔드", "백엔드", "데브옵스"],
        stacks: ["Python", "QuantLib"],
        memberNickname: "퀀트G",
        memberProfileImg: "",
        viewCount: 800,
        commentCount: 100,
      },
      {
        id: 22,
        type: "PROJECT",
        recruitEndAt: "2024-12-01",
        status: "READY",
        isScraped: false,
        progressWay: "오프라인",
        title: "AR/VR 콘텐츠 제작 프로젝트",
        positions: ["프론트엔드", "백엔드", "디자이너"],
        stacks: ["Unity", "C#"],
        memberNickname: "AR/VRG",
        memberProfileImg: "",
        viewCount: 750,
        commentCount: 95,
      },
      {
        id: 21,
        type: "PROJECT",
        recruitEndAt: "2024-11-15",
        status: "READY",
        isScraped: true,
        progressWay: "온라인",
        title: "디지털 마케팅 플랫폼 개발",
        positions: ["프론트엔드", "백엔드", "디자이너"],
        stacks: ["React", "Node.js", "MongoDB"],
        memberNickname: "마케팅G",
        memberProfileImg: "",
        viewCount: 700,
        commentCount: 90,
      },
      {
        id: 20,
        type: "PROJECT",
        recruitEndAt: "2024-10-01",
        status: "READY",
        isScraped: false,
        progressWay: "오프라인",
        title: "스마트 시티 IoT 프로젝트",
        positions: ["프론트엔드", "백엔드", "디자이너"],
        stacks: ["Raspberry Pi", "Python", "Vue.js"],
        memberNickname: "스마트시티G",
        memberProfileImg: "",
        viewCount: 650,
        commentCount: 85,
      },
      {
        id: 19,
        type: "PROJECT",
        recruitEndAt: "2024-09-10",
        status: "READY",
        isScraped: true,
        progressWay: "온라인",
        title: "스마트 건강 관리 시스템 개발",
        positions: ["프론트엔드", "백엔드", "디자이너"],
        stacks: ["React", "Node.js"],
        memberNickname: "건강G",
        memberProfileImg: "",
        viewCount: 600,
        commentCount: 80,
      },
      {
        id: 18,
        type: "PROJECT",
        recruitEndAt: "2024-08-01",
        status: "READY",
        isScraped: false,
        progressWay: "오프라인",
        title: "자율 주행 자동차 시스템 개발",
        positions: ["프론트엔드", "백엔드"],
        stacks: ["ROS", "C++"],
        memberNickname: "자율주행G",
        memberProfileImg: "",
        viewCount: 550,
        commentCount: 75,
      },
      {
        id: 17,
        type: "STUDY",
        recruitEndAt: "2024-07-15",
        status: "READY",
        isScraped: true,
        progressWay: "온라인",
        title: "빅데이터 분석 및 시각화 프로젝트",
        positions: [],
        stacks: ["Python", "Pandas", "Matplotlib"],
        memberNickname: "데이터G",
        memberProfileImg: "",
        viewCount: 500,
        commentCount: 70,
      },
      {
        id: 16,
        type: "STUDY",
        recruitEndAt: "2024-06-30",
        status: "READY",
        isScraped: true,
        progressWay: "오프라인",
        title: "개인 금융 관리 앱 개발",
        positions: ["안드로이드", "백엔드"],
        stacks: ["Kotlin", "Spring"],
        memberNickname: "금융의신",
        memberProfileImg: "",
        viewCount: 450,
        commentCount: 65,
      },
      {
        id: 15,
        type: "STUDY",
        recruitEndAt: "2024-05-20",
        status: "READY",
        isScraped: false,
        progressWay: "온라인",
        title: "웹 기반 영어 학습 플랫폼 개발",
        positions: ["프론트엔드", "백엔드", "디자이너"],
        stacks: ["Django", "React"],
        memberNickname: "영어마스터",
        memberProfileImg: "",
        viewCount: 400,
        commentCount: 60,
      },
      {
        id: 14,
        type: "STUDY",
        recruitEndAt: "2024-04-15",
        status: "READY",
        isScraped: false,
        progressWay: "오프라인",
        title: "스마트홈 IoT 솔루션 개발",
        positions: ["프론트엔드"],
        stacks: ["Arduino", "React"],
        memberNickname: "스마트홈J",
        memberProfileImg: "",
        viewCount: 350,
        commentCount: 55,
      },
      {
        id: 13,
        type: "PROJECT",
        recruitEndAt: "2024-03-30",
        status: "READY",
        isScraped: true,
        progressWay: "온라인",
        title: "가상현실 콘텐츠 개발 프로젝트",
        positions: ["iOS", "안드로이드"],
        stacks: ["Unity", "Blender"],
        memberNickname: "VR마스터",
        memberProfileImg: "",
        viewCount: 300,
        commentCount: 50,
      },
      {
        id: 12,
        type: "PROJECT",
        recruitEndAt: "2024-07-20",
        status: "READY",
        isScraped: true,
        progressWay: "오프라인",
        title: "블록체인 기반 투표 시스템 개발",
        positions: ["데브옵스", "백엔드"],
        stacks: ["Ethereum", "Solidity"],
        memberNickname: "블록체인G",
        memberProfileImg: "",
        viewCount: 250,
        commentCount: 45,
      },
      {
        id: 11,
        type: "PROJECT",
        recruitEndAt: "2024-06-15",
        status: "READY",
        isScraped: false,
        progressWay: "온라인",
        title: "모바일 앱 리디자인 프로젝트",
        positions: ["디자이너", "안드로이드"],
        stacks: ["Figma", "Flutter"],
        memberNickname: "디자이너L",
        memberProfileImg: "",
        viewCount: 200,
        commentCount: 40,
      },
      {
        id: 10,
        type: "STUDY",
        recruitEndAt: "2024-05-01",
        status: "READY",
        isScraped: false,
        progressWay: "오프라인",
        title: "인공지능 학습 데이터 구축",
        positions: ["백엔드", "데브옵스"],
        stacks: ["Python", "TensorFlow"],
        memberNickname: "데이터마스터",
        memberProfileImg: "",
        viewCount: 150,
        commentCount: 35,
      },
      {
        id: 9,
        type: "PROJECT",
        recruitEndAt: "2024-04-10",
        status: "READY",
        isScraped: false,
        progressWay: "온라인",
        title: "클라우드 서비스 개발 프로젝트",
        positions: ["백엔드", "프론트엔드", "데브옵스"],
        stacks: ["AWS", "React", "Node.js"],
        memberNickname: "개발자K",
        memberProfileImg: "",
        viewCount: 100,
        commentCount: 20,
      },
      {
        id: 8,
        type: "STUDY",
        recruitEndAt: "2024-04-10",
        status: "READY",
        isScraped: true,
        progressWay: "온라인",
        title: "클라우드 컴퓨팅 스터디",
        positions: ["데브옵스"],
        stacks: ["AWS", "Azure", "GCP"],
        memberNickname: "개발자F",
        memberProfileImg: "",
        viewCount: 500,
        commentCount: 30,
      },
      {
        id: 7,
        type: "STUDY",
        recruitEndAt: "2024-03-30",
        status: "READY",
        isScraped: true,
        progressWay: "온라인",
        title: "인공지능 기초 스터디",
        positions: ["프론트엔드", "백엔드"],
        stacks: ["Python", "TensorFlow", "PyTorch"],
        memberNickname: "개발자E",
        memberProfileImg: "",
        viewCount: 760,
        commentCount: 25,
      },
      {
        id: 6,
        type: "STUDY",
        recruitEndAt: "2024-03-25",
        status: "READY",
        isScraped: false,
        progressWay: "오프라인",
        title: "UI/UX 디자인 워크숍",
        positions: ["디자이너"],
        stacks: ["Figma", "Sketch", "Adobe XD"],
        memberNickname: "디자이너A",
        memberProfileImg: "",
        viewCount: 850,
        commentCount: 40,
      },
      {
        id: 5,
        type: "STUDY",
        recruitEndAt: "2024-03-20",
        status: "READY",
        isScraped: true,
        progressWay: "온라인",
        title: "블록체인 DApp 개발",
        positions: ["백엔드", "프론트엔드"],
        stacks: ["Ethereum", "React"],
        memberNickname: "블록체인L",
        memberProfileImg: "",
        viewCount: 900,
        commentCount: 35,
      },
      {
        id: 4,
        type: "PROJECT",
        recruitEndAt: "2024-03-15",
        status: "READY",
        isScraped: false,
        progressWay: "오프라인",
        title: "프로그래밍 언어 스터디",
        positions: [],
        stacks: ["Java", "Python", "C++"],
        memberNickname: "개발자D",
        memberProfileImg: "",
        viewCount: 1000,
        commentCount: 30,
      },
      {
        id: 3,
        type: "PROJECT",
        recruitEndAt: "2024-03-10",
        status: "READY",
        isScraped: true,
        progressWay: "온라인",
        title: "데이터베이스 설계 프로젝트",
        positions: ["백엔드"],
        stacks: ["MySQL", "MongoDB"],
        memberNickname: "데이터베이스M",
        memberProfileImg: "",
        viewCount: 1200,
        commentCount: 25,
      },
      {
        id: 2,
        type: "STUDY",
        recruitEndAt: "2024-03-05",
        status: "READY",
        isScraped: false,
        progressWay: "오프라인",
        title: "웹 개발 프로젝트",
        positions: ["프론트엔드", "백엔드"],
        stacks: ["HTML", "CSS", "JavaScript", "Node.js", "Express"],
        memberNickname: "개발자C",
        memberProfileImg: "",
        viewCount: 1500,
        commentCount: 20,
      },
      {
        id: 1,
        type: "STUDY",
        recruitEndAt: "2024-03-01",
        status: "READY",
        isScraped: true,
        progressWay: "온라인",
        title: "모바일 앱 개발",
        positions: ["안드로이드", "iOS", "백엔드"],
        stacks: ["Java", "Kotlin", "Swift"],
        memberNickname: "개발자B",
        memberProfileImg: "",
        viewCount: 2000,
        commentCount: 15,
      },
    ],
  },
};
