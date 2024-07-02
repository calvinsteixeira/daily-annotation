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
  updateAnnotation: (annotationData) => {
    try {
      const dataStore = get().data;
      const registerExists = dataStore.find(
        (annotation) => annotation.id == annotationData.id
      );

      if (!registerExists) {
        return {
          hasError: true,
          message: "Registro inexistente na base",
          statusCode: 404,
        };
      } else {
        set((state) => ({
          data: state.data.map((annotation) =>
            annotation.id === annotationData.id ? annotationData : annotation
          ),
        }));

        return {
          hasError: false,
          message: "Dados alterados com sucesso",
          statusCode: 200,
        };
      }
    } catch (error) {      
      return {
        hasError: true,
        message: "Falha na requisição",
        statusCode: 500,
      };
    }
  },
  getRecords: () => get().data,
}));

export { useAnnotationData };
