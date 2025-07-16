'use client';

import { useState } from 'react';
import CategoryCard from './CategoryCard';
import { ArrowLeft, Home, RefreshCcwIcon } from 'lucide-react';
import FolderOpenImage from "../../../public/images/openfolder.png"
import Image from "next/image";

interface Work {
  id: number;
  title: string;
  img1: string;
  img2: string;
  workCategory: number;
  urlLink: string;
}

interface CategoryGridProps {
  categories: Array<{
    id: number;
    title: string;
    img1: string;
    img2: string;
  }>;
  works: Work[];
  onCategorySelect?: () => void;
  onBack?: () => void;
}

const CategoryGrid = ({ categories, works, onCategorySelect, onBack }: CategoryGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categoryTitle, setCategoryTitle] = useState<string>("");

  const handleWork = (id: number) => {
    const category = categories.find(cat => cat.id === id);

    if (category) {
      setCategoryTitle(category.title);
      const breadcrumb = document.getElementById('category-breadcrumb');

      if (breadcrumb) {
        breadcrumb.innerHTML = `${category.id}.${category.title}`;
      }

      setSelectedCategory(id);
      onCategorySelect?.();
    }
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setCategoryTitle("");
    const breadcrumb = document.getElementById('category-breadcrumb');
    if (breadcrumb) {
      breadcrumb.textContent = '3.Barndominiums';
    }
    onBack?.();
  };

  const filteredWorks = selectedCategory
    ? works.filter(work => work.workCategory === selectedCategory)
    : [];

  return (
    <div className="w-full flex flex-col gap-6 mt-6">
      {selectedCategory ? (
        <div className="w-full">
          <div className="w-full flex flex-col sm:flex-row justify-start items-start sm:items-center border-b gap-4 sm:gap-10 bg-[#f5f5f5] p-[12px]">
            <div className="flex gap-3">
              <button className="flex justify-center items-center bg-[#137bc4] p-1 rounded-sm cursor-pointer">
                <RefreshCcwIcon className="text-white w-4 h-4" />
              </button>
              <button onClick={handleBack} className="flex justify-center items-center bg-[#137bc4] cursor-pointer p-1 rounded-sm">
                <Home className="text-white w-4 h-4" />
              </button>
              <button onClick={handleBack} className="flex justify-center items-center bg-[#137bc4] cursor-pointer p-1 rounded-sm">
                <ArrowLeft className="text-white w-4 h-4" />
              </button>
            </div>
            <span id="category-breadcrumb" className="text-[#137bc4] font-bold font-base flex gap-1 text-sm sm:text-base">
              <Image src={FolderOpenImage} width={20} height={20} alt="" />
              {categoryTitle}
            </span>
            <button className="px-2 py-1 gap-3 flex justify-center items-center cursor-pointer bg-[#4caf60] text-white text-sm rounded-sm hover:opacity-80">
              Save Default
            </button>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
            {filteredWorks.map((work, index) => (
              <a href={work.urlLink} key={index}>
                <div
                  key={index}
                  className="flex flex-col justify-center items-start shadow-lg rounded-lg p-1 border-2 hover:border-2 hover:border-[#137bc4] cursor-pointer"
                  style={{
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
                  }}
                >
                  <div className="w-full flex justify-start items-center px-2">
                    <span className="text-sm sm:text-base">{work.title}</span>
                  </div>
                  <div className="w-full h-[200px] sm:h-[250px] flex flex-col justify-end items-center">
                    <div className="w-full h-[80%] flex flex-col">
                      <div className="w-full h-1/2 flex">
                        <img src={work.img1} alt="" width="100%" height="100px" />
                      </div>
                      <div className="w-full h-1/2 flex">
                        <img src={work.img2} alt="" width="100%" height="100px" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((item, index) => (
            <CategoryCard
              key={index}
              item={item}
              onSelect={handleWork}
              isSelected={selectedCategory === item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryGrid; 2.