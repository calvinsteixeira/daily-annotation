import { IAnnotation, IHumorLevel } from "./types";

const dbHumorLevel: IHumorLevel[] = [
  {
    id: "1",
    level: 3,
    symbol: "😃",
  },
  {
    id: "2",
    level: 2,
    symbol: "😐",
  },
  {
    id: "3",
    level: 1,
    symbol: "😔",
  },
];

const dbAnnotation: IAnnotation[] = [
  {
    id: "1",
    createdAt: "24/06/2024",
    description:
      "Hoje eu acordei um pouco mal, acabei esquecendo do meu lanche da manhã e fui para o trabalho sem comer. Consegui ser produtivo, mas estava muito cansado do dia anterior. Ao chegar do trabalho pude descansar melhor e estudar alguns assuntos pendentes.",
    humorLevel: 1,
    resume: "Um dia normal, nada especial.",
  },
];

export { dbAnnotation, dbHumorLevel };
