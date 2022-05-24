export const findImage = (imgName, page,imgArray, setError, setStatus, setImgArray) => {
    const API_KEY = '25728701-c83c0487db4f1d7b899af3be5';
  const API_GET = 'https://pixabay.com/api/?'; 
  const makeArr = (res) => {
   return res.hits.map(({ id, webformatURL, largeImageURL }) => ({ id, webformatURL, largeImageURL }))
  }
    fetch(
      `${API_GET}q=${imgName}&key=${API_KEY}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(`Ничего не найдено по запросу ${imgName}`)
        );
      })
      .then(res => {        
        if (res.hits.length === 0&&res.total===0) {
          return (setError(`Ничего не найдено по запросу ${imgName}`),
            setStatus('rejected'))
        };
        if (page!==1) {
          if (res.total && res.hits.length !== 0) {
            return (
              setImgArray([...imgArray, ...makeArr(res)]), setStatus("resolved")
            );
          };
          return setStatus('resolveWithoutButton');          
        };
        return (setImgArray(makeArr(res)), setStatus('resolved'));
      })
      .catch(err => {
        return (setError(err), setStatus('rejected'));
      });
  };