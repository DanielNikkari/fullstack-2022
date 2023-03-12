
const filterReducer = (state='ALL', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.payload
    case 'ALL':
      return state
    default:
      return state
  }
}

export const filterChange = (filter) => {
  return {
    type: 'FILTER',
    payload: filter
  }
}

export const filterRemove = () => {
  return {
    type: 'ALL',
  }
}

export default filterReducer