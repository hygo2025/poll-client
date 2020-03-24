import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import ReactLoading from 'react-loading'
import Typography from '@material-ui/core/Typography'
import { history } from '../../_helpers'
import { makeStyles } from '@material-ui/core/styles'
import { pollActions } from '../../_actions'

const useStyles = makeStyles(() => ({
  icon: {
    padding: 5,
  },
  loading: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    transform: '-webkit-translate(-50%, -50%)',
    transform: '-moz-translate(-50%, -50%)',
    transform: '-ms-translate(-50%, -50%)',
  },
}))

const AnswerPollPage = () => {
  const { id, answerId } = useParams()
  const [optionsId, setOption] = useState('')

  const classes = useStyles()

  const loading = useSelector(state => state.poll.loading)
  const items = useSelector(state => state.poll.items)
  const answer = useSelector(state => state.poll.answer)
  const actualAnswer = useSelector(state => state.poll.actualAnswer)
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) dispatch(pollActions.getPoll(id))
    if (id && answerId) dispatch(pollActions.getAnswer(id, answerId))
  }, [])

  function handleChange(i, event) {
    setOption(event)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (optionsId) {
      dispatch(
        pollActions.answerPoll(items.id, optionsId, (actualAnswer || {}).id),
      )
    }
  }

  function editAnswer() {
    dispatch(pollActions.clearAnswer())
    history.push(`/polls/${items.id}/answer/${answer.id}`)
  }

  function searchAnswerValue(answer) {
    const value =
      items.pollOptions.filter(s => s.id === answer.optionId)[0] || {}
    return value
  }

  return (
    <div className="col-lg-10 offset-lg-1">
      {!items && (
        <div className={classes.loading}>
          <ReactLoading type="spin" color="#3f50b5" />
        </div>
      )}

      {items && answer && (
        <>
          <FormControl component="fieldset">
            <Typography variant="h4" component="h2">
              Your answer: {searchAnswerValue(answer).value} - id: {answer.id}
            </Typography>
          </FormControl>
          <div className="form-group">
            <button className="btn btn-primary" onClick={() => editAnswer()}>
              {loading && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Edit
            </button>
            <Link to="/register" className="btn btn-link">
              Register
            </Link>
          </div>
        </>
      )}

      {items && !answer && (
        <>
          <form name="form" onSubmit={handleSubmit}>
            <FormControl component="fieldset">
              <Typography variant="h4" component="h2">
                {items.title}
              </Typography>

              <RadioGroup
                aria-label="gender"
                name="gender1"
                onChange={handleChange}
              >
                {items.pollOptions.map((field, idx) => {
                  return (
                    <div className="row" key={`${field}-${idx}`}>
                      <div className="col-lg-10">
                        <FormControlLabel
                          value={field.id}
                          defaultChecked={
                            field.id === (actualAnswer || {}).optionId
                          }
                          control={<Radio />}
                          label={field.value}
                        />
                      </div>
                    </div>
                  )
                })}
              </RadioGroup>
            </FormControl>
            <div className="form-group">
              <button className="btn btn-primary">
                {loading && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Send
              </button>
              <Link to="/register" className="btn btn-link">
                Register
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export { AnswerPollPage }
