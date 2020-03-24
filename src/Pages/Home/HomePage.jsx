import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import ReactLoading from 'react-loading'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { pollActions } from '../../_actions'

const useStyles = makeStyles(theme => ({
  icon: {
    padding: 5,
  },
  formControl: {
    margin: theme.spacing(3),
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
  divide: {
    borderBottom: '1px solid',
    marginBottom: '50px',
    borderColor: '#bfbfbf',
  },
}))

function HomePage() {
  const [associate, setAssociate] = useState([])

  const itemsToAssociate = useSelector(
    state => (state.poll || {}).itemsToAssociate,
  )

  const myPolls = useSelector(state => (state.poll || {}).myPolls)
  const loading = useSelector(state => state.poll.loading)
  const myGraph = useSelector(state => (state.poll || {}).myGraph)

  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pollActions.getToAssociate())
    dispatch(pollActions.getAll())
    dispatch(pollActions.graph())
  }, [])

  function handleChange(event) {
    let newArray = associate
    if (associate.includes(event.target.name)) {
      newArray = associate.filter(m => {
        return m !== event.target.name
      })
      setAssociate(newArray)
    } else {
      setAssociate([...associate, event.target.name])
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (associate) {
      dispatch(pollActions.associate(associate))
    }
  }

  return (
    <div className="col-lg-12">
      {loading && (
        <div className={classes.loading}>
          <ReactLoading type="spin" color="#3f50b5" />
        </div>
      )}

      <div className={classes.divide}>
        <Typography variant="h4" component="h2">
          Associate polls
        </Typography>

        {(!itemsToAssociate || itemsToAssociate.length == 0) && (
          <div>nothing around here</div>
        )}

        {itemsToAssociate && !!itemsToAssociate.length && (
          <form name="form" onSubmit={handleSubmit}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormGroup>
                {itemsToAssociate.map((field, idx) => {
                  return (
                    <FormControlLabel
                      key={`${field}-${idx}`}
                      control={
                        <Checkbox onChange={handleChange} name={field.id} />
                      }
                      label={field.title}
                    />
                  )
                })}
              </FormGroup>
            </FormControl>
            <div className="form-group">
              <button className="btn btn-primary">
                {loading && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Send
              </button>
            </div>
          </form>
        )}
      </div>

      <div className={classes.divide}>
        <Typography variant="h4" component="h2">
          My polls
        </Typography>

        {(!myPolls || myPolls.length == 0) && <div>nothing around here</div>}

        {myPolls && !!myPolls.length && (
          <ul>
            {myPolls.map((field, idx) => {
              return (
                <li key={field.id}>
                  Title: {field.title}
                  <ul>
                    {field.pollOptions.map(s => {
                      return <li key={s.id}>{s.value}</li>
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <div className={classes.divide}>
        <Typography variant="h4" component="h2">
          My graphs
        </Typography>

        {(!myGraph || myGraph.length == 0) && <div>nothing around here</div>}

        {myGraph && !!myGraph.length && (
          <>
            {myGraph.map((field, idx) => {
              return (
                <div key={field.id}>
                  Title: {field.title}
                  <BarChart
                    width={600}
                    height={300}
                    data={field.answer}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="value" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export { HomePage }
