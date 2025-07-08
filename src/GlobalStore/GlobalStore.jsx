// import { create } from "zustand";

// const useGlobalStore = create((set) => {
//   return {
//     favorite: false,
//     ContactId: "",
//     searchInputData: "",
//     disabledField: true,
//     favoriteFunction: () =>
//       set((state) => ({ ...state, favorite: !state.favorite })),
//     setSearchDataToGlobalStore: (data) =>
//       set((state) => ({ ...state, searchInputData: data })),
//     // setContactIdToGlobalStore: (data) =>
//     //   set((state) => ({ ...state, ContactId: data })),
//     setContactIdToGlobalStore: (data) =>
//       set((state) => {
//         console.log(data);

//         if (data === "AddContact") {
//           return { ...state, ContactId: null };
//         } else {
//           return { ...state, ContactId: data };
//         }
//       }),
//     setdisabledField: () =>
//       set((state) => ({ ...state, disabledField: false })),
//   };
// });

// export default useGlobalStore;

import { create } from "zustand";

const useGlobalStore = create((set) => ({
  favorite: false,
  ContactId: null,
  searchInputData: "",
  // disabledField: false,

  // Toggle favorite checkbox
  favoriteFunction: () => set((state) => ({ favorite: !state.favorite })),

  // Set search input value
  setSearchDataToGlobalStore: (data) => set(() => ({ searchInputData: data })),

  // Set ContactId based on context
  setContactIdToGlobalStore: (data) =>
    set(() => ({
      ContactId: data === "AddContact" ? null : data,
    })),

  // setdisabledField: () => set((state) => ({ disabledField: !state.disabledField })),
}));

export default useGlobalStore;
