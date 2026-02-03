import './App.css'
import { ReadPage } from './components/ReadPage'
import { BottomNav } from './components/BottomNav'
import { HomePage } from './components/HomePage'
import { useState } from 'react';

export type ViewMode = "home" | "read";

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>("home");
  const handleViewChange = (view: ViewMode) => {
    setCurrentView(view);
  };

  return (
    <>
      {currentView === "home" && (<HomePage />)}
      {currentView === "read" && (<ReadPage />)}
      <BottomNav onClick={handleViewChange} />
    </>
  )
}

export default App
