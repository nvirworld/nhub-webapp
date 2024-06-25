import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

interface PublicRouteProps {
  isWallet: boolean
  redirection: {
    path: string[]
    to: string
  }
}

const NhubPublicRoute: React.FC<PublicRouteProps> = (props) => {
  const location = useLocation()

  if (props.isWallet && props.redirection.path.some((path) => path === location.pathname))
    return <Navigate to={props.redirection.to} replace />
  return <Outlet />
}

export default NhubPublicRoute
