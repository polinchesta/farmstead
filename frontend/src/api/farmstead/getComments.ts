import axios from 'axios';
import { FarmsteadsType } from '../../types/farmsteadsTypes';

const getComments = (farmsteadId: number) =>
    axios<FarmsteadsType>({
        method: 'GET',
        url: `http://localhost:3002/comments?farmsteadId=${farmsteadId}`,
    });

export default getComments;
