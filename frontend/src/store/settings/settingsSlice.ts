import { createSlice } from "@reduxjs/toolkit";
import { LanguageType } from "../../types/languageTypes";

interface SettingsStateType{
    language: LanguageType;
}

const languages: LanguageType[] = ["en", "ru"];

const getInitialState = (): SettingsStateType => {
    let language = localStorage.getItem("language") as LanguageType;
    if (!languages.includes(language)){
        language = "ru"
    }
    return{
        language
    }
}

const settingsSlice = createSlice({
    name: "settings",
    initialState: getInitialState(),
    reducers:{
        toggleLanguage:(state) =>{
            state.language = state.language === "ru" ? "en" : "ru";
            localStorage.setItem("language", state.language)
        }
    }
})

export const settingsActions = {
    ...settingsSlice.actions,
}

const settingsReducer = settingsSlice.reducer;
export default settingsReducer;