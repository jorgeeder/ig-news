import { NextApiRequest, NextApiResponse} from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {

    const users = [
        {id: 1, name: 'Jorge'},
        {id: 1, name: 'Eder'},
        {id: 1, name: 'Junior'},
    ]
    
    return response.json(users)
}