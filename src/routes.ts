import { Router } from 'express';
import Usercontroller from './controllers/Usercontroller';

const routes = Router();

routes.get('/user',Usercontroller.index);
routes.get('/user/:email',Usercontroller.show);
routes.post('/user/create',Usercontroller.create);
routes.patch('/user/:email/update', Usercontroller.update);
routes.delete('/user/:email',Usercontroller.delete);
routes.post('/user/login', Usercontroller.login);


export default routes;