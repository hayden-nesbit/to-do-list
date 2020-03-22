import React from 'react';
import Views from './buttons'

class ScratchPad extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    render() {
        return (
            <div>
                <h1 className="text-left">To-do</h1>
                <TodoList items={this.state.items} />
                <form className="mb-5" onSubmit={this.handleSubmit}>
                    <input
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <button className="rounded">
                        Add #{this.state.items.length + 1}
                    </button>
                </form>
                <Views />
            </div>
        );
    }

    componentDidMount() {
        this.setState({
            items: JSON.parse(window.localStorage.items)
        })
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.text.length === 0) {
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now(),
            status: 'to-do',
        };

        const newArr = this.state.items.concat(newItem)
        this.setState({
            items: newArr,
            text: '',
        });

        window.localStorage.setItem('items', JSON.stringify(newArr))
    }

    checkDone() {
        ///When this is clicked, update 'status' to 'done'
    }

    clearList() {
        ///When this is clicked, clear localStorage
    }
}

    

class TodoList extends React.Component {
    render() {
        return (
            <ul className="text-left">
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        );
    }

}

export default ScratchPad;

