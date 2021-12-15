import React from 'react'
import { useState } from 'react'
import s from './Searchbar.module.css'

export const Searchbar = ({onSubmit}) => {

    const [input, setInput] = useState('')

    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmit(input)
    }

    const onChangeHandler = e => {
        setInput(e.target.value)
    }

        return (
            <header className={s.Searchbar}>
                <form onSubmit={onSubmitHandler} className={s.SearchForm}>
                    <button type="submit" className={s.SearchFormButton}>            	
                        &#128269;
                    </button>

                    <input
                        onChange={onChangeHandler}
                        className={s.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
}
