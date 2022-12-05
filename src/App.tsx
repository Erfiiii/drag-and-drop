import React from 'react';
import { client } from './api/api';
import './App.css';
import { Rectangles } from './components/rectangles';
import { ClientContextProvider } from './contexts/client';

function App() {

  return (
    <div className='App'>
      <ClientContextProvider value={client}>
        <Rectangles/>
      </ClientContextProvider>
    </div>
  );
}

export default App;
