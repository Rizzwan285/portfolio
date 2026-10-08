import { Develop } from '../../components/ui/Develop.tsx';
import { beyond } from '../../content/beyond.ts';
import blockStyles from './Beyond.module.css';
import { BlockHead } from './BlockHead.tsx';
import styles from './Extracurricular.module.css';

/** Campus roles, set like the end credits of a film. */
export function Extracurricular() {
  return (
    <section className={blockStyles.block} aria-labelledby="beyond-extracurricular">
      <BlockHead
        id="beyond-extracurricular"
        title="Extracurriculars"
        note="Media, design, events and representation: the roles I've taken on around campus."
      />
      <div className={styles.credits}>
        {beyond.extracurricular.map((group, index) => (
          <Develop key={group.title} className={styles.group} delay={index * 80}>
            <h4 className={styles.groupTitle}>{group.title}</h4>
            <dl className={styles.list}>
              {group.roles.map((role) => (
                <div key={`${role.role}-${role.organization}`} className={styles.credit}>
                  <dt className={styles.role}>{role.role}</dt>
                  <dd className={styles.detail}>
                    <span className={styles.org}>{role.organization}</span>
                    <span className={styles.when}>{role.when}</span>
                    {role.note && <span className={styles.note}>{role.note}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </Develop>
        ))}
      </div>
    </section>
  );
}
