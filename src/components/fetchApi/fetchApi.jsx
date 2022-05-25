export const findImage = (imgName, page) => {
    const API_KEY = '25728701-c83c0487db4f1d7b899af3be5';
  const API_GET = 'https://pixabay.com/api/?';   
   return fetch(
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
  };