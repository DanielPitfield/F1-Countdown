import styles from "../styles/index.module.scss";

import { socialMediaMappings, type SocialMediaName } from "../data/SocialMedia";

interface SocialMediaButtonProps {
  name: SocialMediaName;
}

const SocialMediaButton = (props: SocialMediaButtonProps) => {
  const mapping = socialMediaMappings.find((x) => x.name === props.name);

  if (!mapping) {
    return null;
  }

  return (
    <li className={styles.item} data-name={mapping.name}>
      <a className={styles.link} data-name={mapping.name} href={mapping.link} target="_blank" rel="noreferrer">
        <mapping.icon className={styles.icon} data-name={mapping.name} />
        {mapping.text}
      </a>
    </li>
  );
};

export default SocialMediaButton;
