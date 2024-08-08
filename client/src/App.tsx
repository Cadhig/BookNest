function App() {
  let headers = {
    "Content-Type": 'application/json',
    "Authorization": 'YOUR_REST_KEY'
  }
  fetch('https://api2.isbndb.com/book/9781934759486', { headers: headers })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.error('Error:', err)
    });

  return (
    <div>
      test
    </div>
  )

}

export default App
