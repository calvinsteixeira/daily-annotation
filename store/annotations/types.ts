import { IAnnotation } from "@/data/types"
import { IApiResponse } from "@/types/utils"

interface IUseAnnotationData {
    data: IAnnotation[]
    deleteAnnotation: (annotationId: IAnnotation['id']) => void
    createAnnotation: (annotationData: Omit<IAnnotation, 'id'>) => IApiResponse
    updateAnnotation: (annotationData: IAnnotation) => IApiResponse
    getRecords: () => IAnnotation[]
}

export type { IUseAnnotationData }

