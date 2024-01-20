import React, { useCallback } from 'react'
import { AUTHORIZED_STATUS } from 'App'
import { path } from 'ramda'
import * as Yup from 'yup'

import { AuthLayout } from '../../../layout'
import SignUpWindow from '../components/signup-window'
import { usePost } from '../../../hooks/usePost'
import { SignInResponse, signUpApi } from '../api/api'

interface SignInFormProps {
  readonly email: string
  readonly name: string
  readonly key: string
  readonly secret: string
}
interface Props {
  readonly setIsAuthorized: (value: AUTHORIZED_STATUS) => void
}

const initialValues = {
  email: '',
  name: '',
  key: '',
  secret: ''
}

function SignUpContainer ({ setIsAuthorized }: Props) {
  const signUpPost = usePost(signUpApi)

  const validationSchema = Yup.object({
    name:Yup.string().min(3).required('Name field is required!'),
    email:Yup.string().required('Email field is required!'),
    key:Yup.string().min(4, 'Too short please enter minimum 4 character!').required('Key field is required!'),
    secret:Yup.string().min(5, 'Too short please enter minimum 5 character!').required('Secret field is required!')
  })

  const handleSubmit = useCallback(
    (values: SignInFormProps) => {
      signUpPost.postData({ data: values }).then((response: SignInResponse) => {
        const key = path(['data', 'key'], response)
        const secret = path(['data', 'secret'], response)
        const accessToken = { key, secret }
        localStorage.setItem('book-token', JSON.stringify(accessToken))
        setIsAuthorized(AUTHORIZED_STATUS.YES)
      })
    },
    [setIsAuthorized]
  )

  return (
    <AuthLayout>
      <SignUpWindow
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  )
}

export default SignUpContainer
