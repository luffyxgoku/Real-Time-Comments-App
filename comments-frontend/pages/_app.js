// import "../styles/globals.css";

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;

// pages/_app.js
import { SocketProvider } from "../context/SocketContext";
import "../styles/globals.css"; // Import global styles

function MyApp({ Component, pageProps }) {
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  );
}

export default MyApp;
