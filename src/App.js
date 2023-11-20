import React, { useEffect, useState } from "react"
import List from './components/List';

const App = () => {
  const [bills, setBills] = useState([])

  const fetchUserData = () => {
    fetch('http://recruiting.api.bemmbo.com/invoices/pending')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setBills(data);
      })
      .catch(error => console.error('There has been a problem with your fetch operation:', error));
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <List items={bills}></List>
  );
}

export default App;