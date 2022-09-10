import {
    API_URL,
    BOOKS_BASE_URL,
    BOOK_BY_ID_BASE_URL,
    CATEGORIES_BASE_URL,
    CREATE_BOOK_URL
  } from './config';
  
  const defaultConfig = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      //'Content-Type': 'application/json',
      //'Accept': '*/*'
    }
  };
  
  const apiSettings = {
    fetchBooks: async (page, maxResults, searchTerm = "-term", category = "", isOrderAZ = true) => {
      searchTerm = searchTerm || "-term";
      category = category === 'Nothing' ? "" : category;

      //debugger;

      const endpoint =  `${API_URL + BOOKS_BASE_URL}?q=${searchTerm}&page=${page}&maxResults=${maxResults}&orderByAplpha=${isOrderAZ}&category=${category}`;
      return await (await fetch(endpoint, {headers:defaultConfig})).json();
    },
    fetchBook: async bookId => {
      console.log('dentro do fetch');
      const endpoint = `${API_URL + BOOKS_BASE_URL}${BOOK_BY_ID_BASE_URL}/${bookId}`;
      console.log('dentro da frase');
      return await (await fetch(endpoint, {headers:defaultConfig})).json();
    },
    fetchCategories: async () => {
      const endpoint = `${API_URL + CATEGORIES_BASE_URL}`;
      return await (await fetch(endpoint)).json();
    },
    createBook: async (requestBody) => {
      console.log("createBook");
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };
      const endpoint = `${API_URL + BOOKS_BASE_URL + CREATE_BOOK_URL}`;
      return await (await fetch(endpoint, requestOptions)).json();
    },
  };
  
  export default apiSettings;
  