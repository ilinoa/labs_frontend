import {useEffect, useState} from 'react';

export default (asyncTask) => {
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState(null);

  const doAsyncTask = async () => {
    try {
      const taskResult = await asyncTask();
      handleResultFetched(taskResult);
    } catch (err) {
      handleErrorFetched(err);
    }
  };

  const handleResultFetched = (result) => {
    setResult(result);
    setProcessing(false);
  };

  const handleErrorFetched = (error) => {
    setError(error);
    setProcessing(false);
  };

  useEffect(() => {
    doAsyncTask();
  }, []);

  return {result, processing, error}
};