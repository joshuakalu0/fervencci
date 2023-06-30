import "../styles/globals.css";
import Navbar from "../components/utiles/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar type='user' />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
