import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { baseURL } from 'common/api/common.api';
import {
	AddCardResponseType,
	ArgCreateCardType, ArgDeleteCardType,
	ArgGetCardsType,
	ArgUpdateCardType,
	ArgUpdateGradeType,
	DeleteCardResponseType,
	TransformFetchCardsResponseType,
	UpdateCardResponseType,
	UpdateGradeResponseType
} from 'features/cards/service/cards.api.types';

export const cardsApi = createApi({
	reducerPath: 'cardsApi',
	baseQuery: retry(fetchBaseQuery({baseUrl: baseURL, credentials: 'include'}), {maxRetries: 3}),
	tagTypes: ['Card'],
	endpoints: (build) => {
		return {
			getCards: build.query<TransformFetchCardsResponseType, ArgGetCardsType>({
				query: ({packId, page, pageCount,cardQuestion}) => {
					return {
						method: 'GET',
						url: `cards/card`,
						params: {
							cardsPack_id: packId,
							page,
							pageCount,
							cardQuestion,
						},
					};
				},
				providesTags: (result) =>
					result ? [...result.cards.map((card) => ({type: 'Card' as const, id: card._id})), 'Card'] : ['Card']
			}),
			addCard: build.mutation<AddCardResponseType, ArgCreateCardType>({
				query: (card) => {
					return {
						method: 'POST',
						url: 'cards/card',
						body: {
							card
						}
					}
				},
				invalidatesTags: ['Card']
			}),
			deleteCard: build.mutation<DeleteCardResponseType,ArgDeleteCardType>({
				query: ({cardId}) => {
					debugger
					return {
						method: 'DELETE',
						url: 'cards/card',
						params: {
							id: cardId,
						},
					};
				},
				invalidatesTags: ['Card'],
				async onQueryStarted({packId, page, pageCount, cardId}, {dispatch, queryFulfilled}) {
					const patchResult = dispatch(
						cardsApi.util.updateQueryData('getCards', {packId, page, pageCount}, (draft) => {
							const index = draft.cards.findIndex(card => card._id === cardId)
							if (index !== -1) draft.cards.splice(index, 1)
						})
					)
					try {
						await queryFulfilled
					} catch {
						patchResult.undo()
					}
				}
			}),
			updateCard: build.mutation<UpdateCardResponseType, ArgUpdateCardType>({
				query: (card) => {
					return {
						method: 'PUT',
						url: 'cards/card',
						body: {
							card,
						},
					};
				},
				invalidatesTags: (result, error, card) => [{type: 'Card', id: card._id}],
			}),
			updateGrade: build.mutation<UpdateGradeResponseType, ArgUpdateGradeType>({
				query: (card) => {
					return {
						method: 'PUT',
						url: 'cards/grade',
						body: {
							grade: card.grade,
							card_id: card.card_id
						},
					};
				},
				invalidatesTags: (result, error, card) => [{type: 'Card', id: card.card_id, grade: card.grade}],
			}),
		};
	},
})

export const {useGetCardsQuery, useAddCardMutation, useDeleteCardMutation, useUpdateCardMutation, useUpdateGradeMutation} = cardsApi

