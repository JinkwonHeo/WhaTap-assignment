import { useState } from 'react';
import DashBoard from './components/DashBoard/DashBoard';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ErrorUI from './components/ErrorBoundary/ErrorUI';
import DataProvider from './reducer/context';
import GlobalStyles from './style/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './style/theme';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <>
      <ErrorBoundary
        fallback={({ error, errorInfo }: { error: Error; errorInfo: string }) => (
          <ErrorUI error={error} errorInfo={errorInfo} />
        )}
      >
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <DataProvider>
            <DashBoard isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          </DataProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
}
