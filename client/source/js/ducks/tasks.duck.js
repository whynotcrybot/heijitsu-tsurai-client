import { CALL_API } from 'redux-api-middleware'

const FETCH_BLUEPRINTS_SUCCESS = 'FETCH_BLUEPRINTS_SUCCESS'

const COMPLETE_TASK = 'COMPLETE_TASK'
const COMPLETE_TASK_SUCCESS = 'COMPLETE_TASK_SUCCESS'
const COMPLETE_TASK_FAILURE = 'COMPLETE_TASK_FAILURE'

const UNCOMPLETE_TASK = 'UNCOMPLETE_TASK'
const UNCOMPLETE_TASK_SUCCESS = 'UNCOMPLETE_TASK_SUCCESS'
const UNCOMPLETE_TASK_FAILURE = 'UNCOMPLETE_TASK_FAILURE'

export const complete = (id) => ({
  [CALL_API]: {
    types: [
      COMPLETE_TASK,
      {
        type: COMPLETE_TASK_SUCCESS,
        payload: {id}
      },
      COMPLETE_TASK_FAILURE],
    endpoint: 'http://localhost:8090/blueprints/' + id + '/complete',
    method: 'POST'
  }
})

export const uncomplete = (id) => ({
  [CALL_API]: {
    types: [
      UNCOMPLETE_TASK,
      {
        type: UNCOMPLETE_TASK_SUCCESS,
        payload: {id}
      },
      UNCOMPLETE_TASK_FAILURE],
    endpoint: 'http://localhost:8090/blueprints/' + id + '/uncomplete',
    method: 'POST'
  }
})

const INITIAL_STATE = {
  tasks: [],
  error: null,
  loading: false
}

function wasCompletedToday (bp) {
  if (!bp.completed.length) return false

  const lastCompletedTask = bp.completed[bp.completed.length - 1]
  const lastCompletedAt = new Date(lastCompletedTask.completedAt).toDateString()
  const currentDate = new Date().toDateString()

  return (lastCompletedAt === currentDate)
}

export default function tasksReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_BLUEPRINTS_SUCCESS:
      return {
        ...state,
        tasks: action.payload.map(bp => {
          return {
            ...bp,
            completed: wasCompletedToday(bp)
          }
        }),
      }

    case COMPLETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.payload.id
            ? { ...task, completed: true }
            : task
        ),
        error: null,
        loading: false
      }

    case UNCOMPLETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.payload.id
          ? { ...task, completed: false }
          : task
        ),
        error: null,
        loading: false
      }
    default:
      return state
  }
}
