import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { counterActions, incremented } from './features/counter/counter-slice';
import { useFetchBreedsQuery } from './features/dogs/dogs-api-slice';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { FormEvent, useEffect, useState } from 'react';

function App() {

  const counterValue = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  const [numDogs, setNumDogs] = useState<number>(10);
  const { data = [], isFetching, error } = useFetchBreedsQuery(numDogs);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);


  useEffect(() => {
    if (error) {
      if ("status" in error) {
        const errMsg = "error" in error ? error.error : JSON.stringify(error.data);
        const errorCode = error.status;
        setErrorMessage(errMsg);
        console.log(error);
        
      }
      else {
        const errMsg = error.message;
        const errorCode = error.code;
        setErrorMessage(errMsg);
      }
    }

  }, [error]);

  const clickHandler = () => {
    // dispatch(increment());
    // dispatch(counterActions.incremented());
    dispatch(counterActions.amountAdded(3));
  }

  const numDogsHandler = (event: FormEvent<HTMLSelectElement>) => {
    setNumDogs(Number(event.currentTarget.value));
  }



  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={clickHandler}>
          count is {counterValue}
        </button>

        <div>
          {isFetching && <p>Loading...</p>}
          {errorMessage && !isFetching && <p>{errorMessage}</p>}
        </div>

        <div>
          <p>Dogs to fetch:</p>
          <select name="" id="" value={numDogs} onChange={numDogsHandler}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>

        <p>
          {/* {isError && <p>{error.status}</p>} */}
          <div>
            <p>Number of dogs fetched: {data.length}</p>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Picture</th>
                </tr>
              </thead>
              <tbody>
                {data.map((breed) => (
                  <tr key={breed.id}>
                    <td>{breed.name}</td>
                    <td><img src={breed.image.url} alt={breed.name} height={250} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
