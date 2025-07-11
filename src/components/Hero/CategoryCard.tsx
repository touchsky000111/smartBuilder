'use client';

import CardBackgroundImage from "../../../public/images/folder.png";

interface CategoryCardProps {
  item: {
    id: number;
    title: string;
    img1: string;
    img2: string;
  };
  onSelect: (id: number) => void;
  isSelected?: boolean;
}

const CategoryCard = ({ item, onSelect, isSelected = false }: CategoryCardProps) => {
  return (
    <div
      className={`flex flex-col justify-center items-start rounded-4xl shadow-lg p-1 border-2 hover:border-2 hover:border-[#137bc4] cursor-pointer ${isSelected ? 'border-[#137bc4]' : ''
        }`}
      onClick={() => onSelect(item.id)}
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
      }}
    >
      <div className="w-full flex justiy-start items-center px-2">
        <span className="py-2 px-6">{item.title}</span>
      </div>
      <div
        className="w-full h-[250px] pb-4 px-4 flex flex-col justify-end items-center bg-no-repeat bg-[length:100%_110%] rounded-4xl bg-center"
        style={{
          backgroundImage: `url(${CardBackgroundImage.src})`,
        }}
      >
        <div className="w-full h-[80%] flex flex-col">
          <div className="w-full h-1/2 flex">
            <img src={item.img1} alt="" width="100%" height="100px" className="justify-center items-center" />
          </div>
          <div className="w-full h-1/2 flex">
            <img src={item.img2} alt="" width="100%" height="100px" className="justify-center items-center" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard; 