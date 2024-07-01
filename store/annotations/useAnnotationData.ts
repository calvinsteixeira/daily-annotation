import { create } from "zustand";
import { dbAnnotation } from "@/data/db";
import { IUseAnnotationData } from "./types";
import { IAnnotation } from "@/data/types";

const useAnnotationData = create<IUseAnnotationData>((set, get) => ({
  data: dbAnnotation,
  deleteAnnotation: (annotationId: IAnnotation["id"]) =>
    set((state) => ({
      data: state.data.filter((annotation) => annotation.id != annotationId),
    })),
  createAnnotation: (annotationData) =>
    set((state) => ({ data: [...state.data, annotationData] })),

  updateAnnotation: (annotationData) =>
    set((state) => ({
      data: state.data.map((annotation) =>
        annotation.id === annotationData.id ? annotationData : annotation
      ),
    })),

  getRecords: () => get().data,
}));

export { useAnnotationData };
