import { CALL_API } from 'redux-api-middleware'

const FETCH_BLUEPRINTS = 'FETCH_BLUEPRINTS'
const FETCH_BLUEPRINTS_SUCCESS = 'FETCH_BLUEPRINTS_SUCCESS'
const FETCH_BLUEPRINTS_FAILURE = 'FETCH_BLUEPRINTS_FAILURE'

export const fetchBlueprints = () => ({
  [CALL_API]: {
    types: [FETCH_BLUEPRINTS, FETCH_BLUEPRINTS_SUCCESS, FETCH_BLUEPRINTS_FAILURE],
    endpoint: 'http://localhost:8090/blueprints',
    method: 'GET'
  }
})

const INITIAL_STATE = {
  blueprints: [],
  error: null,
  loading: false
}

export default function blueprintsReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_BLUEPRINTS:
      return {
        ...state,
        blueprints: [],
        error: null,
        loading: true
      }
    case FETCH_BLUEPRINTS_SUCCESS:
      return {
        ...state,
        blueprints: action.payload,
        error: null,
        loading: false
      }
    case FETCH_BLUEPRINTS_FAILURE:
      return {
        ...state,
        blueprints: [],
        error: 'some error',
        loading: false
      }
    default:
      return state
  }
}
