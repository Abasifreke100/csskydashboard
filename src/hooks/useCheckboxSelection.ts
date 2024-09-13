import { useState } from 'react';

interface Item {
  id: string;
}

const useCheckboxSelection = (initialItems: Item[] = []) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(initialItems.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleItemSelection = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== id));
    }
  };

  return {
    selectedItems,
    selectAll,
    handleSelectAllChange,
    handleItemSelection,
  };
};

export default useCheckboxSelection;
