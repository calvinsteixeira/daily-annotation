interface IAnnotation {
    id: string;
    createdAt: string;
    humorLevel: string;
    title: string;
    description: string;
}

interface IHumorLevel {
    id: string;
    symbol: string;    
    level: 1 | 2 | 3
    description: "Ótimo" | "Normal" | "Ruim"
}

export type { IAnnotation, IHumorLevel }