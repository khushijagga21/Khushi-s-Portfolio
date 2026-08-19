import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ServicesPage } from './pages/ServicesPage'
import { useDocumentTitle } from './hooks/useUi'
import { scrollToHashOnLoad } from './utils/scroll'

function Portfolio() {
  useDocumentTitle('Khushi Jagga — software developer, content creator, freelancer')

  useEffect(() => {
    scrollToHashOnLoad()
  }, [])

  return (
    <Layout>
      <HomePage />
      <AboutPage />
      <ServicesPage />
      <ProjectsPage />
      <ContactPage />
    </Layout>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
    </Routes>
  )
}
