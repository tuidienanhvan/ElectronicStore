import { createContext, useState } from 'react';

export const SearchContext = createContext({
    searchQuery: '',
    setSearchQuery: () => {},
    isSearching: false,
    setIsSearching: () => {}
});

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    return (
        <SearchContext.Provider value={{
            searchQuery,
            setSearchQuery,
            isSearching,
            setIsSearching
        }}>
            {children}
        </SearchContext.Provider>
    );
}; 