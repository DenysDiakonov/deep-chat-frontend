import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

import './RenderField.scss'

class RenderField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: props.type,
        }
    }

    changeType = () => {
        this.setState(({ type }) => ({
            type: type === 'password' ? 'text' : 'password',
        }))
    }

    render() {
        const {
            input,
            placeholder,
            label,
            autoFocus,
            symbol,
            disabled,
            placement = 'end',
            meta: { touched, error },
            className = '',
        } = this.props
        const { type } = this.state
        return (
            <TextField
                {...input}
                type={type}
                label={label}
                variant='outlined'
                disabled={disabled}
                error={touched && !!error}
                placeholder={placeholder}
                autoComplete='off'
                autoFocus={autoFocus}
                classes={{
                    root: `custom_input_wrapper${
                        className ? ` ${className}` : ''
                    }`,
                }}
                InputProps={{
                    startAdornment:
                        symbol !== undefined && placement === 'start' ? (
                            <InputAdornment position='start'>
                                <span>{symbol}</span>
                            </InputAdornment>
                        ) : (
                            ''
                        ),
                    endAdornment: (
                        <InputAdornment position='start'>
                            <span>{symbol}</span>
                            {touched && !!error && (
                                <span className='error_text'>{error}</span>
                            )}
                        </InputAdornment>
                    ),
                    classes: {
                        root: 'custom_input',
                        focused: 'custom_input_focused',
                        disabled: 'custom_input_disabled',
                        error: 'custom_input_error',
                        adornedEnd: 'custom_input_adorned_end',
                        adornedStart: 'custom_input_adorned_start',
                        notchedOutline: 'custom_input_outline',
                    },
                }}
                InputLabelProps={{
                    classes: {
                        root: 'custom_input_label',
                        focused: 'custom_input_label_focused',
                        shrink: 'custom_input_label_active',
                        error: 'custom_input_label_error',
                    },
                }}
            />
        )
    }
}

export default RenderField
