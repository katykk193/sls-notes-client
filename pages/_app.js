import Head from 'next/head';
import { motion } from 'framer-motion';
import '../styles/globals.css';
import '../styles/app.css';

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing
    }
  }
};

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
