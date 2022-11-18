import { useState, forwardRef, useImperativeHandle } from "react"

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)
    
    const hideWhenVisible = { display: visible ? 'none': ''}
    const showWhenVisible = { display: visible ? '': 'none'}

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
                <button className={props.type} onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button className={props.type} onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

export default Togglable