import styles from '../../page.module.scss'

export const Video = ({web, mp4} : {web: string, mp4: string}) => {
    return (
        <video autoPlay loop muted className={styles['page__video']}>
            <source
                src={web}
                type="video/webm"/>
            <source
                src={mp4}
                type="video/mp4"/>
        </video>
    );
};