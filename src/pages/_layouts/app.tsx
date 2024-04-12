import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { api } from '@/lib/axios'

import { Header } from '@/components/header'

export function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          /* ESSA É A FORMA CORRETA DE SE FAZER */
          // const status = error.response?.status
          // const code = error.response?.data.code

          // if (status === 401 && code === 'UNAUTHORIZED') {
          //   navigate('/sign-in', { replace: true })
          // }

          const message = error.response?.data.message
          const name = error.response?.data.name

          if (message === 'Unauthorized.' && name === 'Error') {
            navigate('/sign-in', { replace: true })
          }
        }
      },
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return (
    <div className='flex min-h-screen flex-col antialiased'>
      <Header />

      <div className='flex flex-1 flex-col gap-4 p-8 pt-6'>
        <Outlet />
      </div>
    </div>
  )
}
