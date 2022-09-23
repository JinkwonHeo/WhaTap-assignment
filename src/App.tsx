import ApiTest from './components/ApiTest';
import DashBoard from './components/DashBoard/DashBoard';
import LineChart from './components/LineChart/LineChart';
import DataProvider from './reducer/context';

export default function App() {
  return (
    <>
      <DataProvider>
        <DashBoard />
        <LineChart />
      </DataProvider>
    </>
  );
}
