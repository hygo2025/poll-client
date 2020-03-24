import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import ReactLoading from 'react-loading'
import Typography from '@material-ui/core/Typography'
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
  const { id } = useParams()
  const [answerId, setAnswer] = useState('')

  const classes = useStyles()

  const loading = useSelector(state => state.poll.loading)
  const items = useSelector(state => state.poll.items)
  const answer = useSelector(state => state.poll.answer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pollActions.getPoll(id))
  }, [])

  function handleChange(i, event) {
    setAnswer(event)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (answerId) {
      dispatch(pollActions.answerPoll(items.id, answerId))
    }
  }

  function clearAnswer() {
    dispatch(pollActions.clearAnswer())
  }

  function searchAnswerValue(answer) {
    const value = (
      items.pollOptions.filter(s => s.id === answer.optionId)[0] || {}
    ).value
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
              Your answer: {searchAnswerValue(answer)}
            </Typography>
          </FormControl>
          <div className="form-group">
            <button className="btn btn-primary" onClick={() => clearAnswer()}>
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
