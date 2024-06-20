import '../styles/globals.css'
import Layout from '../components/layout/Layout.tsx'
import ReduxProvider from "./ReduxProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider>
  <Layout>
    <Component {...pageProps} />
    </Layout>
    </ReduxProvider>
  )
  

}

export default MyApp
