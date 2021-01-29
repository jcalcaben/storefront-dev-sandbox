import React from "react";
import data from "./socialLinksData";

const SocialLinks = (props) => {
  const { styles } = props;

  if (data.length < 1) {
    return null;
  }

  const socialLinks = data.map((socialLinkData) => {
    const { Icon, url } = socialLinkData;

    return (
      <li key={url} className={styles.list}>
        <a href={url} className={styles.link}>
          <Icon size={20} />
        </a>
      </li>
    );
  });

  return <ul className={styles.root}>{socialLinks}</ul>;
};

export default SocialLinks;
