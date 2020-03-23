import React from 'react'
import TodoItem from './scratchpad'

class AllList extends React.Component {

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

export default AllList;