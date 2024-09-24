import React from 'react';
import Routing from 'src/Routing';

import { usePokemonData } from './hooks';

function App() {
  usePokemonData();

  return (
    <div id="app-root" className={'relative h-full w-full overflow-hidden'}>
      <Routing />
    </div>
  );
}

export default App;
