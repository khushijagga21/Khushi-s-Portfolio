import { useEffect } from 'react'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ServicesPage } from './pages/ServicesPage'
import { useDocumentTitle } from './hooks/useUi'
import { scrollToHashOnLoad } from './utils/scroll'

/**
 * Single-page sequence:
 * Home → About → Services → Projects → Contact
 */
export default function App() {
  useDocumentTitle('Khushi — Software Developer & AI Creative')

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
