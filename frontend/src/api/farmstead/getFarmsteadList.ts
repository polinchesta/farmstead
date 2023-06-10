import axios from "axios";
import { FarmsteadsFilterType, FarmsteadsType } from "../../types/farmsteadsTypes";

const getFarmsteadsList = async (filter: FarmsteadsFilterType) => {
   await new Promise((resolve) => setTimeout(resolve, 1000));
    return axios<FarmsteadsType[]>({
        method: "GET",
        url: "http://localhost:3002/farmsteads",
        params: {
            _sort: filter.sortField,
            q: filter.query,
            _page: filter.page,
            _limit: filter.limit,
        },
    });
};

export default getFarmsteadsList;
