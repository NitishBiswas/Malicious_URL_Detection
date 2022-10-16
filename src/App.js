import React, { useState } from 'react';
import logo from './images/url.png';
import './App.css';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';

function App() {
  const [loading, setLoading] = useState(false);

  const detectMalicious = () => {
    const url = document.getElementById('url').value;
    const formData = new FormData();
    formData.append('url', url);

    if (url === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid URL!',
        showConfirmButton: true,
        timer: 10000
      });
    } else {
      setLoading(true);
      fetch('https://malicious-url-api.herokuapp.com/result', {
        method: 'POST',
        body: formData,
      }).then(res => res.json())
        .then(res => {
          setLoading(false);
          document.getElementById('url').value = "";
          if (res.prediction === '0') {
            // Normal URL
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Your URL is not a malicious URL!',
              showConfirmButton: false,
              timer: 5000
            });
          } else {
            // Malicious URL
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Your URL is a malicious URL!',
              showConfirmButton: true,
              timer: 5000
            });
          }
        })
        .catch(err => {
          setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
            showConfirmButton: true,
            timer: 10000
          });
        });
    }
  }

  return (
    <div className="App">
      <div className="container">
        <img src={logo} alt="Logo" />
        <input type="text" className="form-control mt-5 mb-5 shadow-lg w-50" id="url" name="url" placeholder="Enter a url link" required />
        <Button variant="primary" onClick={detectMalicious}>{loading === true ? "Please wait..." : "Detect Malicious URL"}</Button>
      </div>
    </div>
  );
}

export default App;
