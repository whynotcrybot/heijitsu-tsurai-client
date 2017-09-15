import { CALL_API } from 'redux-api-middleware'

const FETCH_BLUEPRINTS = 'FETCH_BLUEPRINTS'
export const FETCH_BLUEPRINTS_SUCCESS = 'FETCH_BLUEPRINTS_SUCCESS'
const FETCH_BLUEPRINTS_FAILURE = 'FETCH_BLUEPRINTS_FAILURE'

const ADD_BLUEPRINT = 'ADD_BLUEPRINT'
export const ADD_BLUEPRINT_SUCCESS = 'ADD_BLUEPRINT_SUCCESS'
const ADD_BLUEPRINT_FAILURE = 'ADD_BLUEPRINT_FAILURE'

const DELETE_BLUEPRINT = 'DELETE_BLUEPRINT'
export const DELETE_BLUEPRINT_SUCCESS = 'DELETE_BLUEPRINT_SUCCESS'
const DELETE_BLUEPRINT_FAILURE = 'DELETE_BLUEPRINT_FAILURE'


export const fetchBlueprints = () => ({
  [CALL_API]: {
    types: [
      FETCH_BLUEPRINTS,
      FETCH_BLUEPRINTS_SUCCESS,
      FETCH_BLUEPRINTS_FAILURE
    ],
    endpoint: 'http://localhost:8090/blueprints',
    method: 'GET'
  }
})

export const addBlueprint = (data) => ({
  [CALL_API]: {
    types: [
      ADD_BLUEPRINT,
      ADD_BLUEPRINT_SUCCESS,
      ADD_BLUEPRINT_FAILURE
    ],
    endpoint: 'http://localhost:8090/blueprints',
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }
})

export const deleteBlueprint = (id) => ({
  [CALL_API]: {
    types: [
      DELETE_BLUEPRINT,
      {
        type: DELETE_BLUEPRINT_SUCCESS,
        payload: {id}
      },
      DELETE_BLUEPRINT_FAILURE
    ],
    endpoint: 'http://localhost:8090/blueprints/' + id,
    method: 'DELETE'
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

    case ADD_BLUEPRINT_SUCCESS:
      return {
        ...state,
        blueprints: [
          ...state.blueprints,
          action.payload
        ],
        error: null,
        loading: false
      }

    case DELETE_BLUEPRINT_SUCCESS:
      return {
        ...state,
        blueprints: state.blueprints.filter(bp => bp._id !== action.payload.id),
        error: null,
        loading: false
      }

    default:
      return state
  }
}
