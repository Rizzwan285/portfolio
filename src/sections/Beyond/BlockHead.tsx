import { Develop } from '../../components/ui/Develop.tsx';
import styles from './Beyond.module.css';

interface BlockHeadProps {
  id: string;
  title: string;
  note?: string;
}

/** Heading for one part of the "Beyond academics" section. */
export function BlockHead({ id, title, note }: BlockHeadProps) {
  return (
    <Develop as="header" className={styles.blockHead}>
      <h3 id={id} className={styles.blockTitle}>
        {title}
      </h3>
      {note && <p className={styles.blockNote}>{note}</p>}
    </Develop>
  );
}
