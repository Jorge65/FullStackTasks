const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  let tempState
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      tempState = { ...state, good: state.good + 1 }
      console.log('tempState good', tempState)
      return tempState
//      return { ...initialState, good: state.good + 1 }
    case 'OK':
      tempState = { ...state, ok: state.ok + 1 }
      console.log('tempState ok', tempState)
      return tempState
//      return { ...initialState, good: state.ok + 1 }
    case 'BAD':
      tempState = { ...state, bad: state.bad + 1 }
      console.log('tempState bad', tempState)
      return tempState
//      return { ...initialState, good: state.bad + 1 }
    case 'ZERO':
      tempState = { ...initialState }
      console.log('tempState zero', tempState)
      return tempState
//      return { initialState }
    default: 
      return state
  }
}

export default counterReducer
