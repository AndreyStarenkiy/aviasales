import { Button } from 'antd';

import SortFilterStyles from './SortFilter.module.css';

const SortFilter = ({ active, onChange }) => {
  const buttons = [
    {
      key: 'cheapest',
      label: 'Самый дешевый'
    },
    {
      key: 'fastest',
      label: 'Самый быстрый'
    },
    {
      key: 'optimal',
      label: 'Оптимальный'
    }
  ];
  return (
    <div style={{ width: '502px', height: '50px' }} className={SortFilterStyles['sort-filter']}>
      {buttons.map((btn) => (
        <Button
          style={{ width: '502px', height: '50px' }}
          key={btn.key}
          type={active === btn.key ? 'primary' : 'default'}
          onClick={() => onChange(btn.key)}
        >
          {btn.label}
        </Button>
      ))}
    </div>
  );
};

export default SortFilter;
