import DashBoard from './components/DashBoard/DashBoard';
import DataProvider from './reducer/context';

export default function App() {
  return (
    <>
      <DataProvider>
        <DashBoard />
      </DataProvider>
    </>
  );
}
