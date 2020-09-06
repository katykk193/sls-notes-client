import axios from 'axios';

const options = {
  headers: {
    app_user_id: `test_user`,
    app_user_name: `test user`
  }
};

export const loadCards = async () => {
  try {
    const response = await axios.get(`${process.env.API}/notes`, options);
    return response.data.Items;
  } catch (err) {
    console.log(err.response ? err.response.data.error : err.toString());
    return null;
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
    return null;
  }
};
