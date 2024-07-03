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
  createAnnotation: (annotationData) => {    
    function updateData() {
      return get().data
    }
    
    try {
      let dataStore = updateData()  
      const lastId = dataStore.length + 1
      set((state) => ({
        data: [
          ...state.data,
          { ...annotationData, id: (dataStore.length + 1).toString() },
        ],
      }))      
      dataStore = updateData()  
      const registerCreated = lastId != dataStore.length + 1

      if(registerCreated) {
        return {
          hasError: false,
          message: "Anotação criada com sucesso",
          statusCode: 201,
        };
      } else {
        throw Error('ServerError: Falha ao criar o registro')
      }
      
    } catch (error) {
      return {
        hasError: true,
        message: "Falha na requisição",
        statusCode: 500,
      };
    }
    
  },    
  updateAnnotation: (annotationData) => {
    try {
      const dataStore = get().data;
      const registerExists = dataStore.find(
        (annotation) => annotation.id == annotationData.id
      );

      if (!registerExists) {        
        throw Error('ServerError: Registro inexistente na base')
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
      console.log(Error)
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
