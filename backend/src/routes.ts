import { celebrate, errors, Joi, Segments } from 'celebrate';
import express from 'express';
import { authMiddlware } from './middlewares/auth';
import { createCardController } from './modules/createCard';
import { createCardListController } from './modules/createCardList';
import { createPDFController } from './modules/createPDF';
import { createSessionController } from './modules/createSession';
import { createUserController } from './modules/createUser';
import { listCardListController } from './modules/listCardList';
import { listCardsController } from './modules/listCards';
import { getExistingCardController } from './modules/getExistingCard';

const routes = express.Router();

routes.post(
  '/users',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    }),
  }),
  (request, response) => {
    createUserController.handle(request, response);
  },
);

routes.post(
  '/session',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  (request, response) => {
    createSessionController.handle(request, response);
  },
);

// AUTH
routes.use(authMiddlware);

routes.post(
  '/cardlist',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      text: Joi.string().allow(null, ''),
      qrCode: Joi.boolean().required(),
      numberOfCards: Joi.number().required(),
    }),
  }),
  (request, response) => {
    createCardListController.handle(request, response);
  },
);

routes.get('/cardlist', (request, response) => {
  listCardListController.handle(request, response);
});

routes.get(
  '/cards',
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        listid: Joi.string().required(),
      })
      .unknown(),
  }),
  (request, response) => {
    listCardsController.handle(request, response);
  },
);

routes.post(
  '/cards',
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        listid: Joi.string().required(),
      })
      .unknown(),
  }),
  (request, response) => {
    createCardController.handle(request, response);
  },
);

routes.get(
  '/generate',
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        listid: Joi.string().required(),
      })
      .unknown(),
  }),
  async (req, res) => {
    createPDFController.handle(req, res);
  },
);

routes.get(
  '/cards_exists',
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        listid: Joi.string().required(),
      })
      .unknown(),
  }),
  async (req, res) => {
    getExistingCardController.handle(req, res);
  },
);

routes.use(errors());

export { routes };
