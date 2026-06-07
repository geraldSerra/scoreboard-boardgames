import { Crown } from "lucide-react";
import getColor from "../../utils/getColor";

type StatsProps = {
  scorable: string;
  data: { color: string; percentage: number }[];
};

const Stats = ({ scorable, data }: StatsProps) => {
  const max = Math.max(0, ...data.map((d) => d.percentage));

  return (
    <div className="flex flex-col items-center gap-[15px] rounded-[20px] bg-lightgray p-5">
      <div className="w-full justify-start text-left text-[20px] font-bold capitalize">
        {scorable}
      </div>
      <div className="flex h-[15px] w-full overflow-hidden rounded-[10px]">
        {data.map((item: any) => (
          <div
            style={{
              width: `${item.percentage}%`,
              backgroundColor: getColor(item.color),
            }}
          ></div>
        ))}
      </div>
      <div className="flex w-full items-center justify-between text-black">
        {data.map((item: any) => (
          <div className="flex items-center gap-1 text-[11px] font-medium">
            {item.percentage === max && max > 0 && (
              <Crown width="12px" height="12px" color="#e8a73a" fill="#f7c566" />
            )}
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
