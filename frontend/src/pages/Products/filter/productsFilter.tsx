import { useEffect, useState } from "react";
import Select from "../../../ui/select/select";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { productsActions } from "../../../store/products/productsSlice";
import TextField from "../../../ui/textField/textField";
import styles from "./productsFilter.module.sass";
import useDebounceValue from "../../../hooks/useDebounceValue";
import { ProductsFilterType } from "../../../types/productsTypes";

const ProductsFilter: React.FC = ()=> {
    const dispatch = useAppDispatch();
    const [sortField, setSortField] = useState("id");
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const [query, debounceQuery, setQuery] = useDebounceValue("", 500);

    const fetchData = (filter: Partial<ProductsFilterType> = {}) => {
        dispatch(
            productsActions.getProductsList({
                sortField,
                query: debounceQuery,
                limit: 6,
                page,
                ...filter,
            })
        );
    };

    const updatePageAndFetchData = (newPage: number) => {
        setPage(newPage);
        fetchData({ page: newPage });
    };


    const resetPageAndFetchData = () => {
        updatePageAndFetchData(1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            updatePageAndFetchData(page - 1);
        }
    };

    const handleNextPage = () => {
        updatePageAndFetchData(page + 1);
    };

    const onSortSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        resetPageAndFetchData();
    };

    useEffect(() => {
        resetPageAndFetchData();
    }, [debounceQuery]);

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
        <form onSubmit={onSortSubmit}>
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
                setValue={setQuery}
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