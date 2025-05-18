import { Checkbox } from 'antd';

import StopsFilterStyles from './StopsFilter.module.css';

const StopsFilter = ({ selected, onChange }) => {
  const options = [
    { label: 'Все', value: 'all' },
    { label: 'Без пересадок', value: '0' },
    { label: '1 пересадка', value: '1' },
    { label: '2 пересадки', value: '2' },
    { label: '3 пересадки', value: '3' }
  ];

  return (
    <div className={StopsFilterStyles['stops-filter']}>
      <div className={StopsFilterStyles.stop}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
      <Checkbox.Group options={options} value={selected} onChange={onChange} />
    </div>
  );
};

export default StopsFilter;
