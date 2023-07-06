import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const packsSelector = (state: RootState) => state.packs.cardPacks;

export const pageTotalSelector = (state:RootState) => state.packs.pageCount

export const totalPacksSelector = (state: RootState) => state.packs.cardPacksTotalCount;

export const userIDSelector = (state: RootState) => state.auth.profile?._id;

export const packsOptionsSelector = (state:RootState ) => {
  return {
    PacksSearch: state.packs.PacksSearch,
    AllPacksOrMyPacksOption: state.packs.AllPacksOrMyPacksOption,
    PacksCount: [state.packs.minCardsCount,state.packs.maxCardsCount]
  }
}


// Сложные селекторы
export const _filteredByNamePacksSelector = (state: RootState) => {
  const newPacks = state.packs.cardPacks.filter((p: { name: string | string[]; }) => {
    return p.name.includes("w");
  });
  return newPacks;
};

export const filterPacksByNameSelector = createSelector(
  [packsSelector],
  (packs) => {
    const newPacks = packs.filter((p) => {
      return p.name.includes("f");
    });
    return newPacks;
  }
);
