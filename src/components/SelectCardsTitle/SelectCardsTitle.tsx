import styles from "./SelectCardTitle.module.css";

type SelectCardTitleType = {
  children: string;
};

const SelectCardTitle = ({ children }: SelectCardTitleType) => {
  return <div className={styles.title}>{children}</div>;
};

export default SelectCardTitle;
