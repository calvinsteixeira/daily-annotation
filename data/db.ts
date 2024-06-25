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
    humorLevel: 2,
    resume: "Um dia normal, nada especial.",
  },
  {
    id: "2",
    createdAt: "22/06/2024",
    description:
      "Hoje eu acordei bem, tomei um banho e café da manhã bem cedo, logo após minha aula da faculdade. Fui super produtivo, o dia estava bonito, com bastante sol porém com um clima agradável, nem frio e nem calor. Durante a noite continuei meus projetos e fui até a sorveteria comer um açaí com minha esposa, depois assistimos Harry Potter.",
    humorLevel: 3,
    resume: "Harry Potter e Açaí",
  },
];

const dbYears = [
  {
    label: "2024",
    value: "2024",
  },
];

const dbMonths = [
  { label: "Janeiro", value: "1" },
  { label: "Fevereiro", value: "2" },
  { label: "Março", value: "3" },
  { label: "Abril", value: "4" },
  { label: "Maio", value: "5" },
  { label: "Junho", value: "6" },
  { label: "Julho", value: "7" },
  { label: "Agosto", value: "8" },
  { label: "Setembro", value: "9" },
  { label: "Outubro", value: "10" },
  { label: "Novembro", value: "11" },
  { label: "Dezembro", value: "12" },
];

export { dbAnnotation, dbHumorLevel, dbMonths, dbYears };
