import { useDispatch } from "react-redux";
import styles from "./draggable-constructor-element.module.css";
import { DELETE_INGREDIENT } from "../../../services/actions/cart";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import PropTypes from "prop-types"
import { ingredientPropType } from "../../../utils/prop-types";

export default function DraggableConstructorElement({ ingredient, index, moveElement }) {
  const dispatch = useDispatch();

  const deleteIngredient = (i) => {
    dispatch({ type: DELETE_INGREDIENT, index: i });
  }

  const ref = useRef(null);

  const [{ handlerId }, dropRef] = useDrop({
    accept: 'constructorElement',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveElement(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  })

  const [{ opacity }, dragRef] = useDrag({
    type: 'constructorElement',
    item: () => {
      return {
        index
      }
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? .3 : 1
    })
  });

  dragRef(dropRef(ref));

  return (
    <div className={styles.draggable_ingredient} ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        extraClass={styles.ingredient}
        handleClose={() => deleteIngredient(index)}
      />
    </div>
  )
}

DraggableConstructorElement.propTypes = {
  ingredient: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired,
  moveElement: PropTypes.func.isRequired
}