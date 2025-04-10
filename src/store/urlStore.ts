import { create } from "zustand";
import { urlSchema } from "../components/HomePage";

interface StoreStruct {
  urls: urlSchema[];
  fill: (arr: urlSchema[]) => void;
  insert: (url: urlSchema) => void;
  userId: string;
  setUserId: (userId: string) => void;
}

const useUrlStore = create<StoreStruct>((set) => ({
  urls: [],
  userId: "",
  fill: (arr) =>
    set((state) => {
      const set = new Set(state.urls.map((url) => url._id));
      const newUrls = arr.filter((item) => !set.has(item._id));
      return { urls: [...state.urls, ...newUrls] };
    }),
  insert: (url) => set((state) => ({ urls: [...state.urls, url] })),
  setUserId: (userId) => set(() => ({ userId: userId })),
}));

export default useUrlStore;
