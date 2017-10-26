import { PodcastModel } from 'app/models/podcasts.models';
import * as podcastActions from 'app/actions/podcast.actions';
import _ from 'lodash';

export interface State {
    loading: boolean;
    entities: { [id: number]: PodcastModel[] };
    results: PodcastModel[];
    selectedPodcast: PodcastModel;
}
export const initialState: State = {
    loading: false,
    entities: {},
    results: [],
    selectedPodcast: null
}
export function reducer(state = initialState, action: podcastActions.Actions): State {
    switch (action.type) {
        case podcastActions.LOAD_PODCASTS: {
            return {
                ...state,
                entities: {},
                results: [],
                loading: true,
                selectedPodcast: null
            }
        }
        case podcastActions.LOAD_PODCASTS_SUCCESS: {
            const ret = {
                loading: false,
                entities: _.keyBy(action.payload, 'id'),
                results: action.payload,
                selectedPodcast: _.first<PodcastModel>(action.payload)
            };
            return ret;
        }
        case podcastActions.LOAD_PODCASTS_FAIL: {
            return {
                ...state,
                loading: false,
            };
        }
        case podcastActions.GET_PODCAST_SUCCESS: {
            return {
                ...state,
                selectedPodcast: action.payload
            };
        }
        case podcastActions.SELECT: {
            const podcast = state.results.filter(function (item) {
                return item.slug === action.payload;
            })[0];
            return {
                ...state,
                selectedPodcast: podcast,
                loading: false,
            };
        }
        case podcastActions.DELETE_SUCCESS:
            const dsNewEntities = state.results.filter(function (item) {
                return item.id != action.payload;
            });
            return {
                ...state,
                entities: _.keyBy(dsNewEntities, 'id'),
                results: dsNewEntities,
                selectedPodcast: dsNewEntities[0],
                loading: false,
            };
        default: {
            return state;
        }
    }
}
