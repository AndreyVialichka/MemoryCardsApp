import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import {
  ArgCreatePackType,
  FetchPacksResponseType,
  FetchPackType,
  packsApi,
  PackType,
} from "features/packs/packs.api";

const fetchPacks = createAppAsyncThunk<
  { packsPage: FetchPacksResponseType },
  FetchPackType
>("packs/fetchPacks", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    debugger
    const res = await packsApi.getPacks(arg);
    return { packsPage: res.data };
  });
});

const createPack = createAppAsyncThunk<{ pack: PackType }, ArgCreatePackType>(
  "packs/createPack",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.createPack(arg);
      return { pack: res.data.newCardsPack };
    });
  }
);

const removePack = createAppAsyncThunk<{ packId: string }, string>(
  "packs/removePack",
  async (id, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.removePack(id);
      return { packId: res.data.deletedCardsPack._id };
    });
  }
);

const updatePack = createAppAsyncThunk<{ pack: PackType }, PackType>(
  "packs/updatePack",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.updatePack(arg);
      return { pack: res.data.updatedCardsPack };
    });
  }
);

const slice = createSlice({
  name: "packs",
  initialState: {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 4,
    cardPacksTotalCount: 2000,
    minCardsCount: 1,
    maxCardsCount: 100,
    PacksSearch: '',
    AllPacksOrMyPacksOption: false
  },
  reducers: {
    PackSearch: (state,action: PayloadAction<string>) => {
      state.PacksSearch = action.payload
    },
    ChangeAllPacksOrMyPacksOption: (state,action: PayloadAction<boolean>) => {
      state.AllPacksOrMyPacksOption = action.payload
    },
    changeMinandMaxCardsCount: (state,action:PayloadAction<Array<number>>) => {
      state.maxCardsCount = action.payload[1]
      state.minCardsCount = action.payload[0]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPacks.fulfilled, (state, action) => {
        const packsPage = action.payload.packsPage;
        state.cardPacks = packsPage.cardPacks;
        state.page = packsPage.page;
        state.pageCount = packsPage.pageCount;
        state.cardPacksTotalCount = packsPage.cardPacksTotalCount;
      })
      .addCase(createPack.fulfilled, (state, action) => {
        state.cardPacks.unshift(action.payload.pack);
      })
      .addCase(removePack.fulfilled, (state, action) => {
        const index = state.cardPacks.findIndex(
          (pack) => pack._id === action.payload.packId
        );
        if (index !== -1) state.cardPacks.splice(index, 1);
      })
      .addCase(updatePack.fulfilled, (state, action) => {
        const index = state.cardPacks.findIndex(
          (pack) => pack._id === action.payload.pack._id
        );
        if (index !== -1) state.cardPacks[index] = action.payload.pack;
      });
  },
});

export const packsReducer = slice.reducer;
export const packsThunks = { fetchPacks, createPack, removePack, updatePack };
export const packsActions = slice.actions