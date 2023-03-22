import './App.css';

import { Top } from './components/Top';
import { Scoreboard } from './components/Scoreboard';

function App() {
	return (
		<div className='App'>
			<Top />
			<Scoreboard
				time='1200'
				mines='020'
				onReset={() => {}}
				levels={['beginner', 'intermediate', 'expert']}
			/>
		</div>
	);
}

export default App;
