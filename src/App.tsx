import './App.css';
import { Legend } from './components/Top/Legend';
import { GameName } from './components/Top/GameName';

function App() {
	return (
		<div className='App'>
			<GameName>MineSweeper</GameName>
			<Legend />
		</div>
	);
}

export default App;
