import Head from 'next/head';
import { motion } from 'framer-motion';
import '../styles/globals.css';
import '../styles/app.css';
import { fadeInUp } from '../animations';

const MyApp = ({ Component, pageProps, router }) => {
  return (
    <>
      <Head>
        <title>Flash Card</title>
        <link rel="icon" href="/favicon.ico" />
        <script
          src="https://kit.fontawesome.com/3972465aad.js"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <motion.div
        key={router.route}
        exit={{ opacity: 0 }}
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <Component {...pageProps} />
      </motion.div>
    </>
  );
};

export default MyApp;
