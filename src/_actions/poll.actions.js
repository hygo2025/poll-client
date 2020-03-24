import { alertActions } from '.'
import { history } from '../_helpers'
import { pollConstants } from '../_constants'
import { pollService } from '../_services'

const createPoll = (title, loginRequired = false, fields, id) => {
  return dispatch => {
    dispatch(request())

    pollService.createPoll(title, loginRequired, fields, id).then(
      poll => {
        dispatch(success(poll))
        dispatch(alertActions.success('poll created successfully'))
      },
      error => {
        dispatch(failure(error.toString()))
        dispatch(alertActions.error(error.toString()))
      },
    )
  }

  function request(poll) {
    return { type: pollConstants.CREATE_POLL_REQUEST, poll }
  }
  function success(poll) {
    return { type: pollConstants.CREATE_POLL_SUCCESS, poll }
  }
  function failure(error) {
    return { type: pollConstants.CREATE_POLL_FAILURE, error }
  }
}

const answerPoll = (pollId, answerId, actualAnswer) => {
  return dispatch => {
    dispatch(request())

    pollService.answerPoll(pollId, answerId, actualAnswer).then(
      answer => {
        dispatch(success(answer))
        dispatch(alertActions.success('answers created successfully'))
      },
      error => {
        dispatch(failure(error.toString()))
        dispatch(alertActions.error(error.toString()))
      },
    )
  }

  function request(answer) {
    return { type: pollConstants.ANSWER_POLL_REQUEST, answer }
  }
  function success(answer) {
    return { type: pollConstants.ANSWER_POLL_SUCCESS, answer }
  }
  function failure(answer) {
    return { type: pollConstants.ANSWER_POLL_FAILURE, answer }
  }
}

const associate = ids => {
  return dispatch => {
    dispatch(request())

    pollService.associate(ids).then(
      () => {
        location.reload(true)
        dispatch(alertActions.success('successfully associated'))
      },
      error => {
        dispatch(failure(error.toString()))
        dispatch(alertActions.error(error.toString()))
      },
    )
  }

  function request() {
    return { type: pollConstants.POLL_LOADING }
  }
}

const clearAnswer = () => {
  return dispatch => {
    dispatch({ type: pollConstants.CLEAR_ANSWER })
  }
}

const getPoll = id => {
  return dispatch => {
    dispatch(request())

    pollService.get(id).then(
      poll => {
        dispatch(success(poll))
      },
      error => {
        dispatch(failure(error.toString()))
        dispatch(alertActions.error(error.toString()))
      },
    )
  }

  function request(poll) {
    return { type: pollConstants.GET_POLL_REQUEST, poll }
  }
  function success(poll) {
    return { type: pollConstants.GET_POLL_SUCCESS, poll }
  }
  function failure(error) {
    return { type: pollConstants.GET_POLL_FAILURE, error }
  }
}

const getToAssociate = () => {
  return dispatch => {
    dispatch(request())

    pollService.getToAssociate().then(
      polls => {
        dispatch(success(polls))
      },
      error => {
        dispatch(failure(error.toString()))
        dispatch(alertActions.error(error.toString()))
      },
    )
  }

  function request(polls) {
    return { type: pollConstants.GET_ALL_ASSOCIATE_POLL_REQUEST, polls }
  }
  function success(polls) {
    return { type: pollConstants.GET_ALL_ASSOCIATE_POLL_SUCCESS, polls }
  }
  function failure(error) {
    return { type: pollConstants.GET_ALL_ASSOCIATE_POLL_FAILURE, error }
  }
}

const getAll = () => {
  return dispatch => {
    dispatch(request())

    pollService.getAll().then(
      polls => {
        dispatch(success(polls))
      },
      error => {
        dispatch(failure(error.toString()))
        dispatch(alertActions.error(error.toString()))
      },
    )
  }

  function request(polls) {
    return { type: pollConstants.GET_ALL_POLL_REQUEST, polls }
  }
  function success(polls) {
    return { type: pollConstants.GET_ALL_POLL_SUCCESS, polls }
  }
  function failure(error) {
    return { type: pollConstants.GET_ALL_POLL_FAILURE, error }
  }
}

const graph = () => {
  return dispatch => {
    dispatch(request())

    pollService.graph().then(
      polls => {
        dispatch(success(polls))
      },
      error => {
        dispatch(failure(error.toString()))
        dispatch(alertActions.error(error.toString()))
      },
    )
  }

  function request(polls) {
    return { type: pollConstants.GRAPH_REQUEST, polls }
  }
  function success(polls) {
    return { type: pollConstants.GRAPH_SUCCESS, polls }
  }
  function failure(error) {
    return { type: pollConstants.GRAPH_FAILURE, error }
  }
}

const getAnswer = (pollId, answerId) => {
  return dispatch => {
    dispatch(request())

    pollService.getAnswer(pollId, answerId).then(
      answer => {
        dispatch(success(answer))
      },
      error => {
        dispatch(failure(error.toString()))
        dispatch(alertActions.error(error.toString()))
      },
    )
  }

  function request(answer) {
    return { type: pollConstants.GET_ANSWER_REQUEST, answer }
  }
  function success(answer) {
    return { type: pollConstants.GET_ANSWER_SUCCESS, answer }
  }
  function failure(error) {
    return { type: pollConstants.GET_ANSWER_FAILURE, error }
  }
}

export const pollActions = {
  createPoll,
  getPoll,
  answerPoll,
  clearAnswer,
  getToAssociate,
  associate,
  getAll,
  graph,
  getAnswer,
}
