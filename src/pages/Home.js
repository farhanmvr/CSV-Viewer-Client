import React, { useState } from 'react';
import { convert } from '../functions/file';

const Home = () => {
  const [file, setFile] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = () => {
    if (file === '') return;
    setData([]);
    if (!file.type.includes('csv')) {
      setError('Select only CSV file');
      return;
    }
    setLoading(true);
    setError('');
    let formData = new FormData();
    formData.append('file', file);
    convert(formData)
      .then((res) => setData(res.data.files.contents))
      .catch((err) => console.log(err.response))
      .finally(() => setLoading(false));
  };

  const showTable = () => (
    <table class="table table-bordered mt-5">
      <thead class="table-dark">
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th scope="col">{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((el) => (
          <tr>
            {Object.keys(el).map((key) => (
              <th scope="col">{el[key]}</th>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-6">
            <div className="input-group mt-4">
              <input
                disabled={loading}
                className="form-control"
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                id="formFile"
              />
              <button
                onClick={handleUpload}
                disabled={file === '' || loading}
                className="input-group-text btn btn-dark"
              >
                {loading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            {error !== '' && (
              <div class="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
      {data.length !== 0 && showTable()}
    </div>
  );
};

export default Home;
