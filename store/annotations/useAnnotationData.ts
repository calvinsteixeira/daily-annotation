import { create } from "zustand";
import { dbAnnotation } from "@/data/db";
import { IUseAnnotationData } from "./types";
import { IAnnotation } from "@/data/types";

const useAnnotationData = create<IUseAnnotationData>((set) => ({
  data: dbAnnotation,
  deleteAnnotation: (annotationId: IAnnotation["id"]) =>
    set((state) => ({
      data: state.data.filter(annotation => annotation.id != annotationId)
    })),
}));

export { useAnnotationData };