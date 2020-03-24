import { pollConstants } from '../_constants'

export function poll(state = {}, action) {
  switch (action.type) {
    case pollConstants.POLL_LOADING:
      return {
        ...state,
        loading: true,
      }
    case pollConstants.CREATE_POLL_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case pollConstants.CREATE_POLL_SUCCESS:
      return {
        ...state,
        items: action.poll,
        loading: false,
      }
    case pollConstants.CREATE_POLL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      }

    case pollConstants.GET_ALL_ASSOCIATE_POLL_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case pollConstants.GET_ALL_ASSOCIATE_POLL_SUCCESS:
      return {
        ...state,
        itemsToAssociate: action.polls,
        loading: false,
      }
    case pollConstants.GET_ALL_ASSOCIATE_POLL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      }

    case pollConstants.GET_ALL_POLL_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case pollConstants.GET_ALL_POLL_SUCCESS:
      debugger
      return {
        ...state,
        myPolls: action.polls,
        loading: false,
      }
    case pollConstants.GET_ALL_POLL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      }

    case pollConstants.GRAPH_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case pollConstants.GRAPH_SUCCESS:
      return {
        ...state,
        myGraph: action.polls,
        loading: false,
      }
    case pollConstants.GRAPH_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      }

    case pollConstants.GET_POLL_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case pollConstants.GET_POLL_SUCCESS:
      return {
        ...state,
        items: action.poll,
        loading: false,
      }
    case pollConstants.GET_POLL_FAILURE:
      //TODO REDIRECIONAR PARA UMA PAGINA 404
      return {
        ...state,
        error: action.error,
      }

    case pollConstants.ANSWER_POLL_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case pollConstants.ANSWER_POLL_SUCCESS:
      return {
        ...state,
        answer: action.answer,
        loading: false,
      }
    case pollConstants.ANSWER_POLL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case pollConstants.CLEAR_ANSWER:
      return {
        ...state,
        oldId: state.answer.id,
        answer: null,
        loading: false,
      }
    default:
      return state
  }
}
