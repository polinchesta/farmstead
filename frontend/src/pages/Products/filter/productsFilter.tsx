import { useEffect, useState } from "react";
import Select from "../../../ui/select/select";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { productsActions } from "../../../store/products/productsSlice";
import TextField from "@mui/material/TextField/TextField";
import styles from "./productsFilter.module.sass";
import useDebounceValue from "../../../hooks/useDebounceValue";

const ProductsFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const [sortField, setSortField] = useState("id");
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const [query, debounceQuery, setQuery] = useDebounceValue("", 500);

    const fetchData = () => {
        dispatch(
            productsActions.getProductsList({
                sortField,
                query: debounceQuery,
                limit: 6,
                page,
            })
        );
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
            setIsLastPage(false);
        }
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        fetchData();
    };

    const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        fetchData();
    }, [debounceQuery,page]);

    useEffect(() => {
        setIsLastPage(false);
    }, [query, sortField]);

    useEffect(() => {
        if (page === 2) {
            setIsLastPage(true);
        } else {
            setIsLastPage(false);
        }
    }, [page]);

    return (
        <form onSubmit={onSubmit}>
            <Select
                label="Sort field"
                value={sortField}
                setValue={setSortField}
                options={[{ value: "id", text: "Популярные" }]}
                style={{ margin: "10px" }}
            />
            <TextField
                label="🔎 В поиске чего?"
                value={query}
                onChange={onQueryChange}
                style={{ margin: "10px" }}
            />
            <button className={styles.button} type="submit">
                Поиск
            </button>
            <button
                className={styles.buttonPagination}
                type="button"
                onClick={handlePrevPage}
            >
                -
            </button>
            <div className={styles.pageText}>
                <p className="page">{page}</p>
            </div>
            <button
                className={`${styles.buttonPagination} ${isLastPage ? styles.disabled : ""
                    }`}
                type="button"
                onClick={handleNextPage}
                disabled={isLastPage}
            >
                +
            </button>
        </form>
    );
};

export default ProductsFilter;
