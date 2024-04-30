import { useState } from 'react';

const MainViewModel = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        alert('Search for: ' + searchQuery);
        // TODO:- 검색 처리 로직
    };

    return {
        searchQuery,
        setSearchQuery,
        handleSearch,
    };
};

export default MainViewModel;