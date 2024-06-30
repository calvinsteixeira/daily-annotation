import { IAnnotation } from "@/data/types"

interface IUseAnnotationData {
    data: IAnnotation[]
    deleteAnnotation: (annotationId: IAnnotation['id']) => void
    createAnnotation: (annotationData: IAnnotation) => void
}

export type { IUseAnnotationData }

