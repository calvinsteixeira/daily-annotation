interface IAnnotation {
    id: string;
    createdAt: string;
    humorLevel: number;
    resume: string;
    description: string;
}

interface IHumorLevel {
    id: string;
    symbol: string;    
    level: 1 | 2 | 3
}

export type { IAnnotation, IHumorLevel }