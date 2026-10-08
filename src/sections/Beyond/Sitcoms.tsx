import { PosterArt } from '../../components/figures/SafelightArt.tsx';
import { DarkroomImage } from '../../components/ui/DarkroomImage.tsx';
import { Develop } from '../../components/ui/Develop.tsx';
import { beyond } from '../../content/beyond.ts';
import { cx } from '../../lib/cx.ts';
import blockStyles from './Beyond.module.css';
import { BlockHead } from './BlockHead.tsx';
import styles from './Sitcoms.module.css';

/** Favourite sitcoms as a row of posters — a cinema lobby wall. */
export function Sitcoms() {
  return (
    <section className={blockStyles.block} aria-labelledby="beyond-sitcoms">
      <BlockHead id="beyond-sitcoms" title="Sitcoms" note="Seven favourites, from Friends to Brooklyn Nine-Nine." />
      <Develop>
        <ul role="list" className={styles.wall} tabIndex={0} aria-label="Favourite sitcoms">
          {beyond.shows.map((show, index) => (
            <li key={show.id} className={cx(styles.poster, 'lights-scope')}>
              <DarkroomImage
                src={show.image}
                alt={show.imageAlt ?? show.title}
                fallback={<PosterArt variant={index} />}
                className={styles.cover}
              />
              <h4 className={styles.title}>{show.title}</h4>
              <p className={styles.meta}>
                {show.years}, {show.seasons} seasons
              </p>
            </li>
          ))}
        </ul>
      </Develop>
    </section>
  );
}
