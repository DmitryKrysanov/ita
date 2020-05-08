import React from 'react';
import Filter from '../Filter/Filter';
import { FiltersWrapper } from './StyledFilters';

interface Props {
  showAllItems: () => void;
  showCompletedItems: () => void;
  showActiveItems: () => void;
}

const Filters: React.FC<Props> = ({
  showAllItems,
  showCompletedItems,
  showActiveItems
}) => {
  return (
    <FiltersWrapper>
      <Filter name='Show All' clickHandler={showAllItems} />
      <Filter name='Show Completed' clickHandler={showCompletedItems} />
      <Filter name='Show Active' clickHandler={showActiveItems} />
    </FiltersWrapper>
  );
};

export default Filters;
