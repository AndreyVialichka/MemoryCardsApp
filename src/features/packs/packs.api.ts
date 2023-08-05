import { instance } from "common/api/common.api";

export const packsApi = {
  getPacks: (arg: FetchPackType) => {
    debugger;
    return instance.get<FetchPacksResponseType>("cards/pack", {
      params: {
        user_id: arg.user_id,
        pageCount: 20,
        min: arg.min,
        max: arg.max,
        packName: arg.packName,
        page: arg.page,
      },
    });
  },
  createPack: (cardsPack: ArgCreatePackType) => {
    return instance.post<CreatePackResponseType>("cards/pack", { cardsPack });
  },
  removePack: (id: string) => {
    return instance.delete<RemovePackResponseType>(`cards/pack?id=${id}`);
  },
  updatePack: (cardsPack: PackType) => {
    return instance.put<UpdatePackResponseType>("cards/pack", { cardsPack });
  },
};

// Types
export type PackType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  cardsCount: number;
  type: string;
  rating: number;
  created: string;
  updated: string;
  more_id: string;
  __v: number;
};

export type FetchPacksResponseType = {
  cardPacks: PackType[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};

export type CreatePackResponseType = {
  newCardsPack: PackType;
  token: string;
  tokenDeathTime: number;
};

export type RemovePackResponseType = {
  deletedCardsPack: PackType;
  token: string;
  tokenDeathTime: number;
};

export type UpdatePackResponseType = {
  updatedCardsPack: PackType;
  token: string;
  tokenDeathTime: number;
};

export type ArgCreatePackType = {
  name?: string;
  deckCover?: string;
  private?: boolean;
};

export type FetchPackType = {
  packName: string;
  min: number;
  max: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string | undefined;
};
