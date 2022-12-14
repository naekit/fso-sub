import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggle = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={ toggleVisibility }>{props.label}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={ toggleVisibility }>cancel</button>
      </div>
    </div>
  )
})

Toggle.propTypes = {
  label: PropTypes.string.isRequired
}

Toggle.displayName = 'Toggle'

export default Toggle