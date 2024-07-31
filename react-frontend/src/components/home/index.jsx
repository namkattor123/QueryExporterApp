import React, { useEffect, useState } from 'react'
import HomeService from '../../services/HomeService'
import BulkImportForm from './BulkImportForm'
import ColumnChart from './chart';

const HomeComponent = () => {
  const [state, setState] = useState({
    data: [],
    refresh: false
  });

  useEffect(() => {
    HomeService.homeView(localStorage.getItem('token')).then((res) => {
      setState({
        ...state,
        data: res.data
      });
    });
  }, [state.refresh])

  return (
    <div>
      {state.data.length > 0 &&
        <ColumnChart state={state} setState={setState}/>
      }
      <div>
        <BulkImportForm state={state} setState={setState}/>
      </div>
    </div>
  )
}

export default HomeComponent;
