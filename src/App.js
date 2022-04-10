import './App.css';
import { useSelector, useDispatch, connect } from 'react-redux'
import { useEffect } from 'react'
import { customIdInput, decrementIdOne, incrementIdOne, fetchData, resetState } from './features/dataSlice'

// Note: map our objectId to props in order to run our useEffect code every time the objectId changes
const mapStateToProps = (state) => ({
  objectId: state.data.objectId
})

// Call on main App - Note had to add props into the App function so its tracked and can be used be the useEffect hook
function App(props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  const renderImg = () => {
    if(data.apiData) {
      return <img style={{'width': '100vw'}} src={data.apiData.primaryImage} alt ={data.apiData.title} />
    } else {
      return <p>Image Here</p>
    }
  }

  useEffect (() => {
    dispatch(fetchData())
  }, [props.objectId, dispatch])

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

export default connect(mapStateToProps)(App)
