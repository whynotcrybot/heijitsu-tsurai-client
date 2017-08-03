import { CALL_API } from 'redux-api-middleware'

const FETCH_BLUEPRINTS_SUCCESS = 'FETCH_BLUEPRINTS_SUCCESS'

const COMPLETE_TASK = 'COMPLETE_TASK'
const COMPLETE_TASK_SUCCESS = 'COMPLETE_TASK_SUCCESS'
const COMPLETE_TASK_FAILURE = 'COMPLETE_TASK_FAILURE'

export const completeTask = (id) => ({
  [CALL_API]: {
    types: [
      COMPLETE_TASK,
      {
        type: COMPLETE_TASK_SUCCESS,
        payload: {id}
      },
      COMPLETE_TASK_FAILURE],
    endpoint: 'http://localhost:8090/blueprints/' + id + '/complete',
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  }
})

const INITIAL_STATE = {
  tasks: [],
  completed: [],
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
        tasks: action.payload.filter(bp => !wasCompletedToday(bp)),
        completed: action.payload.filter(bp => wasCompletedToday(bp))
      }

      case COMPLETE_TASK_SUCCESS:
        return {
          ...state,
          tasks: state.tasks.filter(task => task._id !== action.payload.id),
          completed: [
            state.tasks.find(task => task._id === action.payload.id),
            ...state.completed
          ],
          error: null,
          loading: false
        }

    default:
      return state
  }
}
