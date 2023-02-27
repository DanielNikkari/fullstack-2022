import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import '../styling/App.css'

export const ToggleVisibility = forwardRef((props, refs) => {
  const [visible, setVisibile] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibile(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return(
    <div>
      <div style={hideWhenVisible}>
        <button className='createblog-button' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className='cancel-button' onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

ToggleVisibility.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

ToggleVisibility.displayName = 'ToggleVisibility'