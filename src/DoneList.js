import React from 'react'
import TodoItem from './ToDoApp'

class DoneList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <form>
                <ul className="text-left list-unstyled px-3">
                    {this.props.items.map(item => (
                        <TodoItem key={item.id} id={item.id} text={item.text} />
                    ))}
                </ul>
            </form>
        );
    }

}

export default DoneList;