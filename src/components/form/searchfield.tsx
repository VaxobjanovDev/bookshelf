import React from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { useField } from 'formik'
import { styled } from '@mui/material/styles'
import { SearchIcon } from 'icons/search-icon'

import withForm from './with-form'
import TextField from './textfield'
interface CustomTextFieldProps {
  name: string
  variant?: 'outlined'
  placeholder: string
  fullWidth?: boolean
  form: any
}
const SearchTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    height: '48px',
    width: '350px',
    color: '#A5A5A5',
    padding: '12px 15px',
    background: 'transparent',
    border: 'none',
    transition: '0.3s',
    '& fieldset': {
      border: 'none',
      color: '#A5A5A5'
    },
    '&:hover': {
      borderColor: 'transparent',
      background: '#fff',
      outline: 'none',
      border: 'none'
    },
    '&.Mui-focused': {
      borderColor: 'transparent',
      background: '#fff',
      outline: 'none',
      border: 'none',
      color: '#000'
    },
    '&:hover button': {
      color: '#000'
    },
    '&.Mui-focused button': {
      color: '#000'
    }
  }
})

const SearchField: React.FC<CustomTextFieldProps> = ({ name, placeholder, fullWidth = true, form, ...props }) => {
  const [, , helpers] = useField(name || '')

  return (
    <SearchTextField
      name={name}
      type="search"
      placeholder={placeholder}
      fullWidth={true}
      {...props}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton edge="start" sx={{ color: '#fff' }}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
      sx={{ outline: 'none', borderColor: 'transparent' }}
    />
  )
}

export default withForm(SearchField)
