import styles from '../../page.module.scss';
import Head from "next/head";

export const Video = ({ web, mp4 }: { web: string; mp4: string }) => {
  return (
     <>
         <Head>
             <link rel="preload" as="video" href={web} type="video/webm" />
             <link rel="preload" as="video" href={mp4} type="video/mp4" />
         </Head>

         <video
             autoPlay
             loop
             muted
             preload="auto"
             className={styles['page__video']}
         >
             <source src={web} type="video/webm" />
             <source src={mp4} type="video/mp4" />
         </video>
     </>
  );
};
