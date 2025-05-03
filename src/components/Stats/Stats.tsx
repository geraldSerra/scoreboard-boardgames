import getColor from "../../utils/getColor";
import styles from "./Stats.module.css";

type StatsProps = {
  scorable: string;
  data: { color: string; percentage: number }[];
};

const Stats = ({ scorable, data }: StatsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.scorable}>{scorable}</div>
      <div className={styles.bar}>
        {data.map((item: any) => (
          <div
            style={{
              width: `${item.percentage}%`,
              backgroundColor: getColor(item.color),
            }}
          ></div>
        ))}
      </div>
      <div className={styles.percentageContainer}>
        {data.map((item: any) => (
          <div className={styles.percentage}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "8px",
                backgroundColor: getColor(item.color),
              }}
            ></div>
            <div>{Math.floor(item.percentage)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
