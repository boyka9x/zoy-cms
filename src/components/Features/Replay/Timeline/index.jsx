import styles from './Player.module.css';
import 'rrweb-player/dist/style.css';
export const RRWebPlayer = () => {
    return (
        <div className={styles.replay}>
            <div id='player' className={styles.player}>
                <div className='rrweb'></div>
            </div>
        </div>
    );
};
