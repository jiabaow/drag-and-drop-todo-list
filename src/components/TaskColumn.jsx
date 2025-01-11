import Card from './Card';
import { useDroppable } from "@dnd-kit/core";

const TaskColumn = ({ title, todos }) => {
    const { isOver, setNodeRef } = useDroppable({ id: title });

    return (
        <div
            ref={setNodeRef}
            style={{
                border: '1px solid gray',
                padding: '0 10px 10px 10px',
                margin: '10px',
                minWidth: '300px',
                backgroundColor: isOver ? 'lavender' : 'transparent',
            }}
            >
            <h3>{title}</h3>
            <div>
                {todos.map((todo) => (
                    <Card key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    );
};

export default TaskColumn;
