import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FilterAndSearchQuery } from "../types";


const initialState: FilterAndSearchQuery = {
    search: "",
    sortBy: "",
    page_limit: 5,
    page_number: 1
}


const filterAndSearchSlice = createSlice({
    name: "filterAndSearch",
    initialState,
    reducers: {
        setSearch: (state: FilterAndSearchQuery, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setFilter: (state: FilterAndSearchQuery, action: PayloadAction<string>) => {
            state.sortBy = action.payload
        },
        setPageLimit: (state: FilterAndSearchQuery, action: PayloadAction<number>) => {
            state.page_limit = action.payload
        },
        setPageNumber: (state: FilterAndSearchQuery, action: PayloadAction<{ type: "prev" | "next" }>) => {
            state.page_number = action.payload.type === "next" ? state.page_number + 1 : Math.max(1, Number(state.page_number) - 1);
        }
    }
})

export const { setFilter, setSearch, setPageLimit, setPageNumber } = filterAndSearchSlice.actions;
export default filterAndSearchSlice.reducer;