import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AddIcon from '@material-ui/icons/Add'
import Checkbox from '@material-ui/core/Checkbox'
import ClearIcon from '@material-ui/icons/Clear'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { pollActions } from '../../_actions'
import { useParams } from 'react-router'

const useStyles = makeStyles(theme => ({
  icon: {
    padding: 5,
  },
}))

const CreatePollPage = () => {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [loginRequired, setLoginRequired] = useState(false)
  const user = useSelector(state => state.authentication.user)
  const [editPoll, setEditPoll] = useState(false)
  const [copied, setCopy] = useState(false)
  const [fields, setFields] = useState([])

  const [submitted, setSubmitted] = useState(false)
  const classes = useStyles()

  const loading = useSelector(state => state.poll.loading)
  const items = useSelector(state => state.poll.items)
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) dispatch(pollActions.getPoll(id))
  }, [])

  if (items && !fields.length > 0) {
    setTitle(items.title)
    setEditPoll(true)
    setFields(
      (items.options || items.pollOptions).map(s => {
        return { value: s.value }
      }),
    )
  }

  function handleAdd() {
    const values = [...fields]
    values.push({ value: undefined })
    setFields(values)
  }

  function handleRemove(i) {
    const values = [...fields]
    values.splice(i, 1)
    setFields(values)
  }

  function handleChange(i, event) {
    const values = [...fields]
    values[i].value = event.target.value
    setFields(values)
  }

  function handleSubmit(e) {
    e.preventDefault()

    setEditPoll(false)
    setSubmitted(true)
    if (title && fields) {
      dispatch(
        pollActions.createPoll(title, loginRequired, fields, (items || {}).id),
      )
    }
  }

  return (
    <div className="col-lg-10 offset-lg-1">
      {items && !editPoll && (
        <>
          <FormControl component="fieldset">
            <Typography variant="h4" component="h2">
              Poll created with the title: {items.title}
            </Typography>
          </FormControl>
          <div className="form-group">
            <button
              className="btn btn-primary"
              style={{ marginRight: '5px' }}
              onClick={() => setEditPoll(true)}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Edit
            </button>

            <CopyToClipboard
              text={`http://localhost:8080/polls/${items.id}/answer`}
              onCopy={() => setCopy(true)}
            >
              <button
                className="btn btn-primary"
                style={{ marginRight: '5px' }}
              >
                Share
              </button>
            </CopyToClipboard>

            {!user && (
              <Link to="/register" className="btn btn-link">
                Register
              </Link>
            )}
          </div>
          {copied ? <span style={{ color: 'blue' }}>Copied.</span> : null}
        </>
      )}
      {(!items || editPoll) && (
        <>
          <Typography variant="h4" component="h2">
            Create Poll
          </Typography>
          <form name="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={
                  'form-control' + (submitted && !title ? ' is-invalid' : '')
                }
              />
              {submitted && !title && (
                <div className="invalid-feedback">title is required</div>
              )}
            </div>

            {fields.length === 0 && (
              <div className="form-group">
                <label>Add question</label>
                <IconButton
                  edge="end"
                  className={classes.icon}
                  color="inherit"
                  aria-label="addIcon"
                  onClick={() => handleAdd(0)}
                >
                  <AddIcon />
                </IconButton>
              </div>
            )}
            <>
              {fields.length !== 0 && <label>Add question</label>}

              {fields.map((field, idx) => {
                return (
                  <div className="row" key={`${field}-${idx}`}>
                    <div className="col-lg-10">
                      <div className="form-group">
                        <input
                          type="text"
                          name={`question${idx}`}
                          onChange={handleChange}
                          defaultValue={field.value}
                          className={
                            'form-control' +
                            (submitted && !`question${idx}`
                              ? ' is-invalid'
                              : '')
                          }
                          onChange={e => handleChange(idx, e)}
                        />
                        {submitted && !`question${idx}` && (
                          <div className="invalid-feedback">
                            Question is required
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <IconButton
                        edge="start"
                        className={classes.icon}
                        color="inherit"
                        aria-label="clearIcon"
                        onClick={() => handleRemove(idx)}
                      >
                        <ClearIcon />
                      </IconButton>

                      <IconButton
                        edge="end"
                        className={classes.icon}
                        color="inherit"
                        aria-label="addIcon"
                        onClick={() => handleAdd(idx)}
                      >
                        <AddIcon />
                      </IconButton>
                    </div>
                  </div>
                )
              })}
            </>

            <div className="form-group">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => setLoginRequired(!loginRequired)}
                    name="loginRequired"
                  />
                }
                label="Login required"
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary">
                {loading && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                {editPoll ? 'Edit' : 'Create'}
              </button>
              {!user && (
                <Link to="/register" className="btn btn-link">
                  Register
                </Link>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export { CreatePollPage }
