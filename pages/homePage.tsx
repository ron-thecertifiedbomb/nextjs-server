
import React from 'react';
import Head from 'next/head';
import useWindowWidth from '../utilities/useWindowWidth';
import getScreenSize from '../utilities/getScreenSize';
import styles from '../styles/Home.module.css'


const Home: React.FC = () => {

    const width = useWindowWidth();
    const screenSize = getScreenSize(width);
    
    const getH1Style = (): React.CSSProperties => {
        switch (screenSize) {
            case 'small':
                return { color: 'red' };
            case 'medium':
                return { color: 'blue' };
            case 'large':
                return { color: 'green' };
            default:
                return {};
        }
    };

    return (
        <>
            <Head>
                <title>Lizard Interactive Server</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
              <div className={styles.container}>
              <h1 style={getH1Style()}>Welcome to Lizard Interactive Server</h1>
                <p>Current screen size: {screenSize}</p>
                <p>Window width: {width}px</p>
              </div>
            
            </main>
        </>
    );
}

export default Home;
