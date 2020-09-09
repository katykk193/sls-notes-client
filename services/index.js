import axios from 'axios';

const options = {
  headers: {
    app_user_id: `test_user`,
    app_user_name: `test user`
  }
};

export const getCards = async () => {
  try {
    const response = await axios.get(`${process.env.API}/notes`, options);
    return response.data.Items;
  } catch (err) {
    console.log(err.response ? err.response.data.error : err.toString());
    return { errMsg: err.response ? err.response.data.error : err.toString() };
  }
};

export const getCard = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.API}/note/n/${id}`,
      options
    );
    return response.data;
  } catch (err) {
    console.log(err.response ? err.response.data.error : err.toString());
    return { errMsg: err.response ? err.response.data.error : err.toString() };
  }
};

export const addCard = async (question, answer) => {
  try {
    const response = await axios.post(
      `${process.env.API}/note`,
      {
        Item: {
          title: question,
          content: answer,
          cat: 'general'
        }
      },
      options
    );
    return response.data;
  } catch (err) {
    console.log(err.response ? err.response.data.error : err.toString());
    return { errMsg: err.response ? err.response.data.error : err.toString() };
  }
};

export const editCard = async (item) => {
  try {
    const response = await axios.patch(
      `${process.env.API}/note`,
      {
        Item: item
      },
      options
    );
    return response.data;
  } catch (err) {
    console.log(err.response ? err.response.data.error : err.toString());
    return { errMsg: err.response ? err.response.data.error : err.toString() };
  }
};

export const deleteCard = async (timestamp) => {
  try {
    const response = await axios.delete(
      `${process.env.API}/note/t/${timestamp}`,
      options
    );
    return response.data;
  } catch (err) {
    console.log(err.response ? err.response.data.error : err.toString());
    return { errMsg: err.response ? err.response.data.error : err.toString() };
  }
};
