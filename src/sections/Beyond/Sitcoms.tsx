import { PosterArt } from '../../components/figures/SafelightArt.tsx';
import { DarkroomImage } from '../../components/ui/DarkroomImage.tsx';
import { Develop } from '../../components/ui/Develop.tsx';
import { beyond } from '../../content/beyond.ts';
import { cx } from '../../lib/cx.ts';
import blockStyles from './Beyond.module.css';
import { BlockHead } from './BlockHead.tsx';
import styles from './Sitcoms.module.css';

/** Favourite sitcoms, as a wall of title cards. */
export function Sitcoms() {
  return (
    <section className={blockStyles.block} aria-labelledby="beyond-sitcoms">
      <BlockHead id="beyond-sitcoms" title="Sitcoms" note="Seven I keep going back to, no matter how many times I have seen them." />
      <ul role="list" className={styles.wall} aria-label="Favourite sitcoms">
        {beyond.shows.map((show, index) => (
          <Develop as="li" key={show.id} delay={index * 60} className={cx(styles.poster, 'lights-scope')}>
            <DarkroomImage
              src={show.image}
              alt={show.imageAlt ?? `${show.title} title card`}
              fallback={<PosterArt variant={index} />}
              tone="logo"
              className={styles.cover}
            />
            <h4 className={styles.title}>{show.title}</h4>
            <p className={styles.meta}>
              {show.years}, {show.seasons} seasons
            </p>
          </Develop>
        ))}
      </ul>
    </section>
  );
}
