import { useContext } from 'react';
import { DataContext } from '../../reducer/context';

export default function LineChart() {
  const state = useContext(DataContext);

  console.log(state);
  return (
    <>
      <div>Line Chart</div>
    </>
  );
}
