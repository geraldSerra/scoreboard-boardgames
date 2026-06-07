type SelectCardTitleType = {
  children: string;
};

const SelectCardTitle = ({ children }: SelectCardTitleType) => {
  return (
    <div className="mb-4 text-base font-medium text-graysoft">{children}</div>
  );
};

export default SelectCardTitle;
