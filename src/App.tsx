import DashBoard from './components/DashBoard/DashBoard';
import LineChart from './components/LineChart/LineChart';
import TPSLineChart from './components/TPSLineChart/TPSLineChart';
import DataProvider from './reducer/context';

export default function App() {
  return (
    <>
      <DataProvider>
        <DashBoard />
        <TPSLineChart>
          <LineChart />
        </TPSLineChart>
      </DataProvider>
    </>
  );
}
