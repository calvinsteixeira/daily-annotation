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
    createdAt: "01/01/2024",
    description:
      "Hoje eu acordei um pouco mal, acabei esquecendo do meu lanche da manhã e fui para o trabalho sem comer. Consegui ser produtivo, mas estava muito cansado do dia anterior. Ao chegar do trabalho pude descansar melhor e estudar alguns assuntos pendentes.",
    humorLevel: 2,
    resume: "Um dia normal, nada especial.",
  },
  {
    id: "2",
    createdAt: "20/06/2024",
    description:
      "Hoje eu acordei bem, tomei um banho e café da manhã bem cedo, logo após minha aula da faculdade. Fui super produtivo, o dia estava bonito, com bastante sol porém com um clima agradável, nem frio e nem calor. Durante a noite continuei meus projetos e fui até a sorveteria comer um açaí com minha esposa, depois assistimos Harry Potter.",
    humorLevel: 3,
    resume: "Harry Potter e Açaí",
  } 
];

export { dbAnnotation, dbHumorLevel };
