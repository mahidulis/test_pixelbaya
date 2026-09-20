import { createBrowserRouter } from 'react-router'
import App from './App'
import WorksPage from './WorksPage'
import WePage from './WePage'
import AboutPage from './AboutPage'
import ServicesPage from './ServicesPage'
import PricingPage from './PricingPage'

export const router = createBrowserRouter([
  { path: '/',         Component: App },
  { path: '/works',    Component: WorksPage },
  { path: '/we',       Component: WePage },
  { path: '/about',    Component: AboutPage },
  { path: '/services', Component: ServicesPage },
  { path: '/pricing',  Component: PricingPage },
])
