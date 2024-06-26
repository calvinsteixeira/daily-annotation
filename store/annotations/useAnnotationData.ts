import { create } from "zustand";
import { dbAnnotation } from "@/data/db"
import { IUseAnnotationData } from "./types";

const useAnnotationData = create<IUseAnnotationData>((set) => ({
    annotations: dbAnnotation
}))

export { useAnnotationData }