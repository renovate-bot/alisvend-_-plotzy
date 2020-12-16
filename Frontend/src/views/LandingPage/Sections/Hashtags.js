import { Select } from '@material-ui/core';
import React from 'react';
import apiClient from '../../../api';

const Hashtags = (props) => {
    const [hashtags, setHashtags] = React.useState([]);
    React.useEffect(() => {
        if (sessionStorage.getItem("loggedIn")) {
             apiClient.get('/api/hashtags')
                .then(response => {
                    setHashtags(response.data)
                })
                .catch(error => console.error(error))

        }
    }, []);
    const hashtagsList = hashtags.map((hashtag) =>
        <option value={hashtag.id} key={hashtag.id} >{hashtag.name}</option>

    );
    
        return (

            <Select className="custom-select" onChange={(e) => { props.onChangeHashtagID(e.target.value) }} >
                <option value={0}>Choose a Hashtag</option>{hashtagsList}
            </Select>
        );
  
   
};

export default Hashtags;