import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ todo }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: todo.id,
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
                border: '1px solid lightgray',
                padding: '10px',
                margin: '5px 0',
                backgroundColor: 'lightblue',
                transform: CSS.Transform.toString(transform),
            }}
            >
            {todo.text}
        </div>
    );
};

export default Card
