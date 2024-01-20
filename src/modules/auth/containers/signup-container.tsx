import React, { useCallback } from 'react'
import { AUTHORIZED_STATUS } from 'App'
import { path } from 'ramda'

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
      <SignUpWindow initialValues={initialValues} onSubmit={handleSubmit} />
    </AuthLayout>
  )
}

export default SignUpContainer
