import PropTypes from "prop-types";
import { ingredientsTypes } from "./constants";
import { ORDER_STATUSES } from "./order";

export const ingredientPropType = PropTypes.shape({
  "_id": PropTypes.string.isRequired,
  "name": PropTypes.string.isRequired,
  "type": PropTypes.oneOf(ingredientsTypes).isRequired,
  "proteins": PropTypes.number.isRequired,
  "fat": PropTypes.number.isRequired,
  "carbohydrates": PropTypes.number.isRequired,
  "calories": PropTypes.number.isRequired,
  "price": PropTypes.number.isRequired,
  "image": PropTypes.string.isRequired,
  "image_mobile": PropTypes.string.isRequired,
  "image_large": PropTypes.string.isRequired,
  "__v": PropTypes.number.isRequired
});

export const ingredientArrayPropType = PropTypes.arrayOf(ingredientPropType.isRequired);

const wsConnectInfo = PropTypes.shape({
  "url": PropTypes.string.isRequired,
  "isAuth": PropTypes.bool
});
export const wsConnectActionPropType = PropTypes.shape({
  "type": PropTypes.string.isRequired,
  "payload": wsConnectInfo.isRequired
});

export const orderPropType = PropTypes.shape({
  "_id": PropTypes.string.isRequired,
  "ingredients": PropTypes.arrayOf(PropTypes.string).isRequired,
  "status": PropTypes.oneOf(ORDER_STATUSES).isRequired,
  "number": PropTypes.number.isRequired,
  "createdAt": PropTypes.string.isRequired,
  "updatedAt": PropTypes.string.isRequired,
});