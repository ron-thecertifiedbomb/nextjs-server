import '../styles/globals.css'
import ReduxProvider from "./ReduxProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider>
    <Component {...pageProps} />
    </ReduxProvider>
  )
  

}

export default MyApp
