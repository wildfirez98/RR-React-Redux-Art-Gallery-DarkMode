import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { customIdInput, decrementIdOne, incrementIdOne, fetchData, resetState } from './features/dataSlice'

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  const renderImg = () => {
    if(data.apiData) {
      return <img style={{'width': '100vw'}} src={data.apiData.primaryImage} alt ={data.apiData.title} />
    } else {
      return <p>Image Here</p>
    }
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch(fetchData())}>Trigger Thunk</button>
        <button onClick={() => dispatch(resetState())}>Clear</button>
        <button onClick={() => dispatch(incrementIdOne())}>Next</button>
        <button onClick={() => dispatch(decrementIdOne())}>Back</button>
      </div>
      <input value={ data.objectId } onChange={(e) => { 
        console.log(e.target.value);
        dispatch(customIdInput(Number(e.target.value)))
      }} />
      <div>
        {data.objectId}
        {renderImg()}
      </div>
    </div>
  );
}

export default App;
