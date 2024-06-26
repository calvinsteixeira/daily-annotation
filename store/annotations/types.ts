import { IAnnotation } from "@/data/types"

interface IUseAnnotationData {
    data: IAnnotation[]
    deleteAnnotation: (annotationId: IAnnotation['id']) => void
}

export type { IUseAnnotationData }

