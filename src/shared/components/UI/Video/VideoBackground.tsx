import styles from './VideoBackground.module.scss';

export const VideoBackground = () => {
  return (
    <div className={styles['fullscreen-video']}>
      <div className={styles['fullscreen-video__video-background']} />
      <video
        autoPlay
        loop
        muted
        className={styles['fullscreen-video__video-pc']}
      >
        <source
          src="https://shared.fastly.steamstatic.com/store_item_assets/steam/clusters/frontpage/72e1ed8c71ae31c58d15b7c2/webm_page_bg_russian.webm?t=1745252398"
          type="video/webm"
        />
        <source
          src="https://shared.fastly.steamstatic.com/store_item_assets/steam/clusters/frontpage/72e1ed8c71ae31c58d15b7c2/mp4_page_bg_russian.mp4?t=1745252398"
          type="video/mp4"
        />
      </video>

      <video
        autoPlay
        loop
        muted
        preload="none"
        className={styles['fullscreen-video__video-mobile']}
      >
        <source
          src="https://shared.fastly.steamstatic.com/store_item_assets/steam/clusters/frontpage/72e1ed8c71ae31c58d15b7c2/webm_page_bg_mobile_russian.webm?t=1745252398"
          type="video/webm"
        />
        <source
          src="https://shared.fastly.steamstatic.com/store_item_assets/steam/clusters/frontpage/72e1ed8c71ae31c58d15b7c2/mp4_page_bg_mobile_russian.mp4?t=1745252398"
          type="video/mp4"
        />
      </video>
    </div>
  );
};
